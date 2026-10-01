import Link from "next/link";
import StatCards from "@/components/learn/StatCards";
import ContrastColumns from "@/components/learn/ContrastColumns";
import {
  LADDER,
  CLEANUP_SERVICES,
  UPLIFT_RULE,
  CLEANUP_PRICE_FLOOR,
  CLEANUP_PRICE_CEILING,
} from "@/lib/offers";

const h2 = "font-display font-semibold text-navy text-2xl mt-10 mb-3";
const link = "text-navy underline";

const audit = LADDER.find((r) => r.id === "audit");
const cleanup = Object.fromEntries(CLEANUP_SERVICES.map((c) => [c.id, c]));

// The draft's one outbound link, HubSpot's own knowledge base article
// "Deduplicate records in HubSpot" (HTTP 200 when the draft checked it on
// 2026-09-29). A platform's own documentation, not a competitor.
const HUBSPOT_DEDUPE_URL =
  "https://knowledge.hubspot.com/records/deduplication-of-records";

// The two lists under "Two different purchases", verbatim. They render once as
// the page's own bullet lists and once in the comparison block below them, so
// the block can never say something the lists do not.
const CLEANSING_PASS = [
  "Duplicates merged",
  "Blank fields filled or flagged",
  "Formats standardized",
  "Dead contacts and stale deals removed",
];
const CLEANUP_THAT_HOLDS = [
  "A written list of required fields for every pipeline stage",
  "Duplicate rules written down before anyone merges anything",
  "A baseline completeness number, so the next drift shows up as a number",
  "Close dates repaired, and a rule for what happens when one passes",
  "One named person on your side who owns data quality from then on",
];

// Verbatim transcription of the approved SEO loop cycle 5 asset 10 source copy
// (Marketing Systems/SEO Pilot/pending-approval/aeo-10-crm-data-cleansing-
// services.md, drafted 2026-09-29, de-slopped 2026-10-01, approved by Bradley
// and published 2026-10-01, ASK-140). Dollar amounts for our own items
// interpolate from lib/offers.js, and each one renders exactly the string the
// draft wrote. The clocks stay in the draft's words ("one to two weeks"), and
// the audit credit sentence stays as drafted ("100% ... your first build,
// cleanup or Partner month"), because doc 26 D4 extends the credit to cleanup
// and AUDIT_TERMS.creditTarget predates that. This body carries the author's
// first person (the Contactually story, "I will tell you"), so it sits in
// AUTHORED_SPEAKS_AS_I.
export default function CrmDataCleansingServicesBody() {
  return (
    <>
      <p>
        CRM data cleansing services fix the records in your CRM so the numbers
        they produce can be trusted. The usual list is merging duplicates,
        filling or flagging missing fields, standardizing formats like job
        titles and states, repairing close dates that drifted into the past, and
        removing contacts who left their company years ago.
      </p>
      <p>
        None of that asks why the data got dirty. The answer decides whether you
        pay for this again next year.
      </p>
      <p>
        Most of what you will find when you shop for this is priced per record
        or per hour. Some of it is a virtual assistant working through a
        spreadsheet. Cleaning the records without changing how they get entered
        means the same duplicates and blanks come back.
      </p>

      <h2 className={h2}>Two different purchases</h2>
      <p>
        <strong>A cleansing pass</strong> fixes the records you have today:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        {CLEANSING_PASS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>
        <strong>A cleanup that holds</strong> does all of that, and also fixes
        the rules that let the records decay:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        {CLEANUP_THAT_HOLDS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p>
        Without the second list, your CRM drifts back to where it started,
        because reps are still skipping the same fields and creating the same
        duplicates. In the Modern BizOps GTM Maturity Framework, a method I
        built for measuring the go-to-market competencies in a business, the
        first list is level 2: someone cleans the CRM when it gets bad enough,
        and the same problems come back. Level 3 starts when required fields are
        enforced and one person is accountable. You can read the full rubric on
        the{" "}
        <Link href="/learn/data-quality-management" className={link}>
          data quality management
        </Link>{" "}
        page.
      </p>

      {/* The draft note's comparison graphic: a cleansing pass vs a cleanup
          that holds. Both columns are the two lists directly above, word for
          word, under the two bolded lead-ins. The right column is the one the
          page argues for, which is what ContrastColumns highlights. */}
      <ContrastColumns
        label="Two different purchases"
        title="A cleansing pass, and a cleanup that holds"
        leftTitle="A cleansing pass"
        leftItems={CLEANSING_PASS}
        rightTitle="A cleanup that holds"
        rightItems={CLEANUP_THAT_HOLDS}
      />

      <h2 className={h2}>What dirty CRM data does to AI automation</h2>
      <p>
        A messy CRM used to cost you an argument at the start of the pipeline
        meeting. Now it is also the data your automations read. An automation
        that routes leads, scores them, drafts follow-ups or writes your forecast
        works from the records you have. If a third of your contacts are missing
        a source, the scoring is guessing. If duplicates split one customer
        across two records, the follow-up goes out twice.
      </p>
      <p>
        At Contactually, a CRM company selling to realtors, I ran customer
        onboarding for about 100 new small-business accounts a month. We rebuilt
        onboarding so every new account came in with clean data and one person
        on their side who owned it. First-90-day churn dropped by half, and that
        saved roughly $1M in revenue over six quarters.
      </p>
      <p>
        If you are weighing AI for your sales or marketing process and are not
        sure your CRM can carry it,{" "}
        <Link href="/book" className={link}>
          book a call
        </Link>{" "}
        and I will tell you if the answer is to clean first.
      </p>

      <h2 className={h2}>What it costs</h2>
      <p>You will see this priced three ways.</p>
      <p>
        <strong>Per-record or hourly cleansing.</strong> Data-entry and
        list-hygiene providers price by the record or by the hour. Nobody can
        tell you the total up front, and it fixes today&rsquo;s records only.
      </p>
      <p>
        <strong>A fixed-price CRM cleanup project.</strong> A named scope, a
        clock and a written definition of done. The published rate cards I found
        in August 2026 for this kind of project ran from about $1,500 to $4,500.
      </p>
      <p>
        <strong>A cleanup inside a bigger engagement.</strong> Some providers
        fold it into an implementation or a retainer. Ask for it as a line item.
        A blended number hides whether the cleanup is in there at all.
      </p>

      <h2 className={h2}>Five questions to ask any provider</h2>
      <ol className="list-decimal pl-6 space-y-3">
        <li>
          <strong>What exists when you are done?</strong> Listen for a
          required-field list, written duplicate rules and a completeness
          number. If all you get back is a spreadsheet, you have nothing to hold
          the provider to.
        </li>
        <li>
          <strong>Who on my side owns this afterwards?</strong> If nobody on
          your side owns it, expect to pay for another cleanse.
        </li>
        <li>
          <strong>
            Do you merge before or after the duplicate rules are written?
          </strong>{" "}
          Merging first is how records get lost. HubSpot&rsquo;s own guide to{" "}
          <a
            href={HUBSPOT_DEDUPE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            deduplicating records in HubSpot
          </a>{" "}
          shows the rules it already applies on its own: contacts match on email
          address, companies on domain name. Anything those rules miss is a
          decision someone has to write down.
        </li>
        <li>
          <strong>How will we know it held?</strong> A baseline number, measured
          again in ninety days.
        </li>
        <li>
          <strong>Is it a fixed price?</strong> Per-record pricing puts the risk
          on you.
        </li>
      </ol>

      <h2 className={h2}>The Modern BizOps price, published</h2>
      <p>
        At Modern BizOps this is {cleanup["crm-cleanup"].name}, the first item
        on the Cleanup Services menu.
      </p>
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <strong>
            {`${cleanup["crm-cleanup"].name}: ${cleanup["crm-cleanup"].price}, one to two weeks.`}
          </strong>{" "}
          Required-field list written per stage, duplicate rules written and the
          dedupe run, a baseline completeness number computed with a target set,
          close dates repaired, per-user permissions configured, and a
          governance owner named on your side.
        </li>
        <li>
          <strong>
            {`${cleanup["field-standardization"].name}: ${cleanup["field-standardization"].price}, one to two weeks.`}
          </strong>{" "}
          For when the problem is definitions: free-text fields, unenforced
          picklists and reports that disagree about what a number means.
        </li>
        <li>
          <strong>
            {`${cleanup["integration-repair"].name}: ${cleanup["integration-repair"].price} base, one to two weeks.`}
          </strong>{" "}
          For when your forms, billing, calendar and CRM disagree with each
          other.{" "}
          {`Each additional system of record adds ${UPLIFT_RULE.addition}, capped at ${UPLIFT_RULE.cap}.`}
        </li>
        <li>
          <strong>{`${audit.name}: ${audit.price}.`}</strong> Reads your actual
          stack and tells you which of these you need, if any. 100% of the fee
          credits toward your first build, cleanup or Partner month within 90
          days.
        </li>
      </ul>
      <p>
        {`Cleanup Services run ${CLEANUP_PRICE_FLOOR} to ${CLEANUP_PRICE_CEILING} per item, fixed.`}{" "}
        They come before any automation goes on top. When you are ready for the
        automation,{" "}
        <Link href="/learn/ai-implementation-services" className={link}>
          how AI implementation services are priced
        </Link>{" "}
        covers the rest, and{" "}
        <Link href="/learn/crm-architecture-and-governance" className={link}>
          CRM architecture and governance
        </Link>{" "}
        covers what a CRM built to stay clean looks like.
      </p>

      {/* The draft note's benchmark stat cards: the CRM Cleanup and
          Architecture price with its clock, and the audit, credited forward.
          Both descriptions are the price-list bullets directly above, word
          for word, and both prices interpolate from lib/offers.js. */}
      <StatCards
        label="The Modern BizOps price, published"
        title="The cleanup first, at a fixed price"
        stats={[
          {
            big: cleanup["crm-cleanup"].price,
            desc: `for ${cleanup["crm-cleanup"].name}, one to two weeks. Required-field list written per stage, duplicate rules written and the dedupe run, a baseline completeness number computed with a target set, close dates repaired, per-user permissions configured, and a governance owner named on your side.`,
            source: `${cleanup["crm-cleanup"].name}, published price`,
          },
          {
            big: audit.price,
            desc: `for the ${audit.name}. Reads your actual stack and tells you which of these you need, if any. 100% of the fee credits toward your first build, cleanup or Partner month within 90 days.`,
            source: `${audit.name}, published price`,
          },
        ]}
      />
    </>
  );
}
