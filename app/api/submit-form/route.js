import { NextResponse } from "next/server";
import {
  assertHubSpotConfigured,
  ensureCustomContactProperties,
  submitHubSpotForm,
  markContactForReview,
  findContactByEmailBatchRead,
  pickUtmProperties,
  hsHeaders,
  HUBSPOT_BASE,
  UTM_CUSTOM_PROPERTIES,
} from "@/lib/hubspot";

// Maps the /book form's display labels to internal HubSpot enumeration values.
const REVENUE_OPTIONS = {
  "Under $1M": "under_1m",
  "$1M–$3M": "1m_3m",
  "$3M–$5M": "3m_5m",
  "$5M–$15M": "5m_15m",
  "$15M–$50M": "15m_50m",
  "$50M+": "50m_plus",
  "$15M+": "15m_plus", // legacy band, retained for historical/in-flight submissions
};

const TEAM_SIZE_OPTIONS = {
  "1–5": "1_5",
  "6–15": "6_15",
  "16–30": "16_30",
  "30+": "30_plus",
};

// The qualifying properties the /book form collects. Ensured on cold start so a
// fresh environment has them before the enrichment PATCH below runs.
const QUALIFYING_PROPERTIES = [
  {
    name: "company_annual_revenue",
    label: "Company Annual Revenue",
    type: "enumeration",
    fieldType: "select",
    groupName: "contactinformation",
    options: Object.entries(REVENUE_OPTIONS).map(([label, value], i) => ({
      label,
      value,
      displayOrder: i,
    })),
  },
  {
    name: "sales_marketing_team_size",
    label: "Sales & Marketing Team Size",
    type: "enumeration",
    fieldType: "select",
    groupName: "contactinformation",
    options: Object.entries(TEAM_SIZE_OPTIONS).map(([label, value], i) => ({
      label,
      value,
      displayOrder: i,
    })),
  },
  {
    name: "growth_bottleneck",
    label: "Growth Bottleneck",
    type: "string",
    fieldType: "textarea",
    groupName: "contactinformation",
  },
  {
    name: "previous_consultant",
    label: "Previous Consultant",
    type: "enumeration",
    fieldType: "select",
    groupName: "contactinformation",
    options: [
      { label: "Yes", value: "yes", displayOrder: 0 },
      { label: "No", value: "no", displayOrder: 1 },
    ],
  },
  {
    name: "previous_consultant_details",
    label: "Previous Consultant Details",
    type: "string",
    fieldType: "textarea",
    groupName: "contactinformation",
  },
];

let propertiesEnsured = false;

// The form submission creates the contact asynchronously, so a first-time
// visitor may not exist for a few seconds after HubSpot accepts the form.
// batch/read skips the search index (which lags 8 to 9 seconds), and the retry
// covers the form's own processing time. Without a contact ID the qualifying
// answers, phone and review flag are lost for good, so the wait is generous:
// about 8 seconds at worst, and only a contact that has not appeared yet pays it.
async function waitForContactId(email, attempts = 12, delayMs = 750) {
  for (let attempt = 0; attempt < attempts; attempt++) {
    const id = await findContactByEmailBatchRead(email);
    if (id) return id;
    if (attempt < attempts - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  return null;
}

// Write the qualifying answers (and phone) onto the contact the form created.
// These are NOT submitted through the form: phone and the qualifying fields are
// not on the shared lead form, and keeping the form lean avoids touching its
// field set. A PATCH does not re-stamp Original Source, so the form's
// attribution survives.
async function writeQualifyingProperties(contactId, formData) {
  const properties = {
    company_annual_revenue:
      REVENUE_OPTIONS[formData.revenue] || formData.revenue || "",
    sales_marketing_team_size:
      TEAM_SIZE_OPTIONS[formData.teamSize] || formData.teamSize || "",
    growth_bottleneck: formData.bottleneck || "",
    previous_consultant: formData.previousConsultant || "",
    previous_consultant_details: formData.previousConsultantDetails || "",
  };
  if (formData.phone) properties.phone = formData.phone;

  const res = await fetch(
    `${HUBSPOT_BASE}/crm/v3/objects/contacts/${contactId}`,
    {
      method: "PATCH",
      headers: hsHeaders(),
      body: JSON.stringify({ properties }),
    }
  );
  if (!res.ok) {
    console.error(
      "[submit-form] qualifying property write failed:",
      await res.text()
    );
    return false;
  }
  return true;
}

export async function POST(request) {
  try {
    assertHubSpotConfigured();

    const formData = await request.json();

    if (!formData.email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    if (!propertiesEnsured) {
      await ensureCustomContactProperties([
        ...QUALIFYING_PROPERTIES,
        ...UTM_CUSTOM_PROPERTIES,
      ]);
      propertiesEnsured = true;
    }

    // 1. Submit identity + UTMs through the shared HubSpot form so the hutk
    //    cookie attributes Original Source (FORM instead of INTEGRATION),
    //    consistent with the scorecard. The /book Meetings booking adds
    //    its own engagements_last_meeting_booked_* on top. No deal is created.
    const submission = await submitHubSpotForm({
      properties: {
        email: formData.email,
        firstname: formData.firstName || "",
        lastname: formData.lastName || "",
        ...pickUtmProperties(formData.utms),
      },
      context: {
        hutk: formData.hutk,
        pageUri: formData.pageUri,
        pageName: formData.pageName,
      },
    });

    if (!submission.ok) {
      return NextResponse.json(
        { error: "Failed to save contact data" },
        { status: 502 }
      );
    }

    // 2. Enrich the contact the form created with the qualifying answers and
    //    flag it for the manual qualification queue. If the contact never
    //    appears, the visitor still reaches the calendar, and the miss is logged
    //    because the answers cannot be recovered later.
    const contactId = await waitForContactId(formData.email);

    if (contactId) {
      await writeQualifyingProperties(contactId, formData);
      await markContactForReview(contactId);
    } else {
      console.error(
        "[submit-form] contact never appeared; qualifying data not written"
      );
    }

    return NextResponse.json({ success: true, contactId });
  } catch (error) {
    console.error("HubSpot submit error:", error);
    return NextResponse.json(
      { error: "Failed to save contact data" },
      { status: 500 }
    );
  }
}
