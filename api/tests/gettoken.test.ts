import { describe, expect, it, jest } from '@jest/globals';
import { handler } from '../endpoints/gettoken';
import { FormattedReturn } from '../utils/formattedReturn';

import fetch from 'cross-fetch';
jest.mock('cross-fetch', () => jest.fn());

describe('GetToken Endpoint', () => {
  it('should return an Access Token', async () => {
    /* @ts-ignore */
    fetch.mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ access_token: 100, refresh_token: 200 }),
        ok: true,
      } as Response)
    );
    const response = (await handler(
      { body: JSON.stringify({ code: 'valid' }) } as any,
      {} as any
    )) as FormattedReturn;

    expect(response.statusCode).toBe(200);
    const { access_token, refresh_token } = JSON.parse(response.body);
    expect(access_token).toBeDefined();
    expect(access_token).toBe(100);
    expect(response.headers['Set-Cookie']).toContain('refresh_token=200');
  });
});

/* {"access_token":"BQDHkMk7glOhFSDd35_bMXH42-kd1yOViq2N6FikNeIZ_M8rDUJOgjtyTZdAgL--5N33r2Gc2kOo4j53fy7NEM1QkxuLybdmeOjEE-5AW692el_4Ay9i4RvbHCCHrV7hP8c0lJiqAFVmZvYMS_nOMj9GtwpZWwdPCRg3OAWPu3r7ufHUD1cf3nwyBMh78LIdxtOiFYREEJqYIGVl8KMD-3GVrFZoJiH7rFt9znCq","token_type":"Bearer","expires_in":3600,"refresh_token":"AQB8RwrxTmtdHkIiVNF9A0rKnUsyfwMZ4iK062cp-etfOftFTXsWbQ4yR0efHSxPnJnHUwGnefC8RSEV9Sed01Leavp-KGPoXLaqe8hm5pnAO3UV53sabOGy1dkTDJvTYjA","scope":"streaming user-modify-playback-state user-follow-modify user-library-read user-library-modify user-follow-read user-read-playback-state user-read-currently-playing user-read-recently-played user-read-email user-top-read user-read-private"} */
