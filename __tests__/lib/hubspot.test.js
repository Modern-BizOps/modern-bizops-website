import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('submitHubSpotForm', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env.HUBSPOT_PORTAL_ID = '111';
    process.env.HUBSPOT_LEAD_FORM_GUID = 'guid-abc';
    process.env.HUBSPOT_API_KEY = 'test-token';
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('posts non-empty fields and context to the hsforms integration endpoint', async () => {
    let calledUrl = null;
    let calledBody = null;
    global.fetch = vi.fn(async (url, opts) => {
      calledUrl = url;
      calledBody = JSON.parse(opts.body);
      return { ok: true, json: async () => ({}) };
    });
    const { submitHubSpotForm } = await import('@/lib/hubspot');
    const res = await submitHubSpotForm({
      properties: { email: 'a@b.com', firstname: 'Jane', company: '', lead_magnet: 'scorecard' },
      context: { hutk: 'cookie-1', pageUri: 'https://x/scorecard', pageName: 'Scorecard' },
    });

    expect(res.ok).toBe(true);
    expect(calledUrl).toBe(
      'https://api.hsforms.com/submissions/v3/integration/submit/111/guid-abc'
    );
    // empty `company` is dropped
    expect(calledBody.fields).toEqual([
      { name: 'email', value: 'a@b.com' },
      { name: 'firstname', value: 'Jane' },
      { name: 'lead_magnet', value: 'scorecard' },
    ]);
    expect(calledBody.context).toEqual({
      hutk: 'cookie-1',
      pageUri: 'https://x/scorecard',
      pageName: 'Scorecard',
    });
  });

  it('omits hutk from context when not provided', async () => {
    let calledBody = null;
    global.fetch = vi.fn(async (url, opts) => {
      calledBody = JSON.parse(opts.body);
      return { ok: true, json: async () => ({}) };
    });
    const { submitHubSpotForm } = await import('@/lib/hubspot');
    await submitHubSpotForm({
      properties: { email: 'a@b.com' },
      context: { pageUri: 'https://x', pageName: 'X' },
    });
    expect(calledBody.context.hutk).toBeUndefined();
    expect(calledBody.context.pageUri).toBe('https://x');
  });

  it('returns ok:false and logs when the endpoint errors', async () => {
    global.fetch = vi.fn(async () => ({ ok: false, text: async () => 'bad form' }));
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const { submitHubSpotForm } = await import('@/lib/hubspot');
    const res = await submitHubSpotForm({ properties: { email: 'a@b.com' }, context: {} });
    expect(res.ok).toBe(false);
  });
});

describe('markContactForReview', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env.HUBSPOT_API_KEY = 'test-token';
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('PATCHes lifecyclestage lead and hs_lead_status NEW', async () => {
    let calledUrl = null;
    let calledBody = null;
    global.fetch = vi.fn(async (url, opts) => {
      calledUrl = url;
      calledBody = JSON.parse(opts.body);
      return { ok: true, json: async () => ({}) };
    });
    const { markContactForReview } = await import('@/lib/hubspot');
    const ok = await markContactForReview('contact-9');
    expect(ok).toBe(true);
    expect(calledUrl).toBe('https://api.hubapi.com/crm/v3/objects/contacts/contact-9');
    expect(calledBody.properties).toEqual({ lifecyclestage: 'lead', hs_lead_status: 'NEW' });
  });

  it('returns false for a missing contactId without calling fetch', async () => {
    global.fetch = vi.fn();
    const { markContactForReview } = await import('@/lib/hubspot');
    const ok = await markContactForReview(null);
    expect(ok).toBe(false);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('returns false and logs when the PATCH fails', async () => {
    global.fetch = vi.fn(async () => ({ ok: false, text: async () => 'boom' }));
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const { markContactForReview } = await import('@/lib/hubspot');
    expect(await markContactForReview('contact-9')).toBe(false);
  });
});

describe('findContactByEmailBatchRead', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env.HUBSPOT_API_KEY = 'test-token';
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('reads by idProperty=email through batch/read, never the search index', async () => {
    let calledUrl = null;
    let calledBody = null;
    global.fetch = vi.fn(async (url, opts) => {
      calledUrl = url;
      calledBody = JSON.parse(opts.body);
      return { ok: true, status: 200, json: async () => ({ results: [{ id: '42' }] }) };
    });
    const { findContactByEmailBatchRead } = await import('@/lib/hubspot');

    await expect(findContactByEmailBatchRead('a@b.com')).resolves.toBe('42');
    expect(calledUrl).toBe('https://api.hubapi.com/crm/v3/objects/contacts/batch/read');
    expect(calledBody.idProperty).toBe('email');
    expect(calledBody.inputs).toEqual([{ id: 'a@b.com' }]);
  });

  it('returns null on the 207 HubSpot sends for an email with no contact yet', async () => {
    global.fetch = vi.fn(async () => ({
      ok: true,
      status: 207,
      json: async () => ({ results: [], errors: [{ category: 'OBJECT_NOT_FOUND' }], numErrors: 1 }),
    }));
    const { findContactByEmailBatchRead } = await import('@/lib/hubspot');
    await expect(findContactByEmailBatchRead('new@b.com')).resolves.toBeNull();
  });

  it('returns null on an API error so the caller can retry', async () => {
    global.fetch = vi.fn(async () => ({ ok: false, status: 429, json: async () => ({}) }));
    const { findContactByEmailBatchRead } = await import('@/lib/hubspot');
    await expect(findContactByEmailBatchRead('a@b.com')).resolves.toBeNull();
  });

  it('returns null when the network call throws so the caller can retry', async () => {
    global.fetch = vi.fn(async () => {
      throw new Error('socket hang up');
    });
    const { findContactByEmailBatchRead } = await import('@/lib/hubspot');
    await expect(findContactByEmailBatchRead('a@b.com')).resolves.toBeNull();
  });
});
