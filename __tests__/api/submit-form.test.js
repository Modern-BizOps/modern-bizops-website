import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const hubspotMock = {
  assertHubSpotConfigured: vi.fn(),
  ensureCustomContactProperties: vi.fn(async () => {}),
  submitHubSpotForm: vi.fn(async () => ({ ok: true })),
  markContactForReview: vi.fn(async () => true),
  findContactByEmailBatchRead: vi.fn(async () => 'contact-1'),
  pickUtmProperties: vi.fn((u) => u || {}),
  hsHeaders: vi.fn(() => ({ 'Content-Type': 'application/json' })),
  HUBSPOT_BASE: 'https://api.hubapi.com',
  UTM_CUSTOM_PROPERTIES: [],
};

vi.mock('@/lib/hubspot', () => hubspotMock);

let contactPatchUrl = null;
let contactPatchBody = null;
let dealCalled = false;

beforeEach(() => {
  // Reset the module registry so the route's `propertiesEnsured` cold-start flag
  // starts false in every test (the vi.mock for @/lib/hubspot persists the reset).
  vi.resetModules();
  for (const fn of Object.values(hubspotMock)) {
    if (typeof fn === 'function' && fn.mockClear) fn.mockClear();
  }
  hubspotMock.submitHubSpotForm.mockResolvedValue({ ok: true });
  hubspotMock.findContactByEmailBatchRead.mockReset();
  hubspotMock.findContactByEmailBatchRead.mockResolvedValue('contact-1');
  contactPatchUrl = null;
  contactPatchBody = null;
  dealCalled = false;
  global.fetch = vi.fn(async (url, opts) => {
    if (typeof url === 'string' && url.includes('/crm/v3/objects/deals')) {
      dealCalled = true;
      return { ok: true, json: async () => ({ id: 'deal-x' }) };
    }
    if (typeof url === 'string' && url.includes('/crm/v3/objects/contacts/')) {
      contactPatchUrl = url;
      contactPatchBody = JSON.parse(opts.body);
      return { ok: true, json: async () => ({}) };
    }
    return { ok: true, json: async () => ({}) };
  });
});

async function callRoute(body) {
  const { POST } = await import('@/app/api/submit-form/route');
  const req = new Request('http://test.local/api/submit-form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return POST(req);
}

function fixtureBody() {
  return {
    firstName: 'Dana',
    lastName: 'Lopez',
    email: 'dana@company.com',
    phone: '555-0100',
    revenue: '$5M–$15M',
    teamSize: '6–15',
    bottleneck: 'Leads stall in handoff.',
    previousConsultant: 'no',
    previousConsultantDetails: '',
    utms: { utm_source: 'linkedin' },
    hutk: 'cookie-9',
    pageUri: 'https://modernbizops.com/book',
    pageName: 'Book a Free Discovery Call',
  };
}

describe('POST /api/submit-form (/book path)', () => {
  it('submits identity+utm through the form with hutk, enriches qualifying props via PATCH, marks for review, no deal', async () => {
    const res = await callRoute(fixtureBody());
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.contactId).toBe('contact-1');
    expect(json.dealId).toBeUndefined();

    // The form submission carries identity + utm + hutk for Original Source
    // attribution, and NOT the qualifying props or phone (those go via PATCH).
    expect(hubspotMock.submitHubSpotForm).toHaveBeenCalledWith(
      expect.objectContaining({
        properties: expect.objectContaining({
          email: 'dana@company.com',
          firstname: 'Dana',
          lastname: 'Lopez',
          utm_source: 'linkedin',
        }),
        context: expect.objectContaining({
          hutk: 'cookie-9',
          pageUri: 'https://modernbizops.com/book',
        }),
      })
    );
    const formProps = hubspotMock.submitHubSpotForm.mock.calls[0][0].properties;
    expect(formProps.company_annual_revenue).toBeUndefined();
    expect(formProps.phone).toBeUndefined();

    // The qualifying answers are written to the contact via a PATCH.
    expect(contactPatchUrl).toContain('/crm/v3/objects/contacts/contact-1');
    expect(contactPatchBody.properties).toEqual(
      expect.objectContaining({
        company_annual_revenue: '5m_15m',
        sales_marketing_team_size: '6_15',
        growth_bottleneck: 'Leads stall in handoff.',
        previous_consultant: 'no',
        phone: '555-0100',
      })
    );

    expect(hubspotMock.markContactForReview).toHaveBeenCalledWith('contact-1');
    expect(dealCalled).toBe(false);
  });

  it('returns 502 when the form submission fails', async () => {
    hubspotMock.submitHubSpotForm.mockResolvedValue({ ok: false });
    const res = await callRoute(fixtureBody());
    expect(res.status).toBe(502);
    expect(hubspotMock.findContactByEmailBatchRead).not.toHaveBeenCalled();
  });

  describe('when the new contact is slow to appear', () => {
    let delays;

    beforeEach(() => {
      delays = [];
      vi.spyOn(global, 'setTimeout').mockImplementation((fn, ms) => {
        delays.push(ms);
        fn();
        return 0;
      });
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('keeps reading until the contact appears, then writes the answers and the review flag', async () => {
      // The old lookup gave up after 4 attempts. A contact on attempt 9 must still land.
      for (let i = 0; i < 8; i++) {
        hubspotMock.findContactByEmailBatchRead.mockResolvedValueOnce(null);
      }
      const res = await callRoute(fixtureBody());
      const json = await res.json();

      expect(json.contactId).toBe('contact-1');
      expect(hubspotMock.findContactByEmailBatchRead).toHaveBeenCalledTimes(9);
      expect(hubspotMock.findContactByEmailBatchRead).toHaveBeenCalledWith('dana@company.com');
      expect(delays).toEqual(Array(8).fill(750));
      expect(contactPatchBody.properties.company_annual_revenue).toBe('5m_15m');
      expect(hubspotMock.markContactForReview).toHaveBeenCalledWith('contact-1');
    });

    it('stops after 12 attempts, still succeeds for the visitor, and logs the miss without the email', async () => {
      hubspotMock.findContactByEmailBatchRead.mockResolvedValue(null);
      const errorLog = vi.spyOn(console, 'error').mockImplementation(() => {});

      const res = await callRoute(fixtureBody());
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json).toEqual({ success: true, contactId: null });
      expect(hubspotMock.findContactByEmailBatchRead).toHaveBeenCalledTimes(12);
      expect(delays).toEqual(Array(11).fill(750));
      expect(contactPatchBody).toBeNull();
      expect(hubspotMock.markContactForReview).not.toHaveBeenCalled();
      expect(errorLog).toHaveBeenCalledTimes(1);
      expect(JSON.stringify(errorLog.mock.calls)).toContain('[submit-form]');
      expect(JSON.stringify(errorLog.mock.calls)).not.toContain('dana@company.com');
    });
  });

  it('rejects missing email', async () => {
    const body = fixtureBody();
    delete body.email;
    const res = await callRoute(body);
    expect(res.status).toBe(400);
    expect(hubspotMock.submitHubSpotForm).not.toHaveBeenCalled();
  });

  it('returns 500 when HubSpot is not configured', async () => {
    hubspotMock.assertHubSpotConfigured.mockImplementationOnce(() => {
      throw new Error('HUBSPOT_API_KEY environment variable is not set');
    });
    const res = await callRoute(fixtureBody());
    expect(res.status).toBe(500);
  });
});
