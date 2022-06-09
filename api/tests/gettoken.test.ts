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
    const { access_token } = JSON.parse(response.body);
    expect(access_token).toBeDefined();
    expect(access_token).toBe(100);
    expect(response.headers['Set-Cookie']).toContain('refresh_token=200');
  });
  it('should not return the refresh token in body', async () => {
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
    const { refresh_token } = JSON.parse(response.body);
    expect(refresh_token).toBeUndefined();
  });

  it('should return a secure HTTP cookie containing the refresh token', async () => {
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
    expect(response.headers['Set-Cookie']).toContain('refresh_token=200');
    expect(response.headers['Set-Cookie']).toContain('HttpOnly');
    expect(response.headers['Set-Cookie']).toContain('Secure');
  });
  it('should return 418 when code is bad', async () => {
    /* @ts-ignore */
    fetch.mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
        ok: false,
      } as Response)
    );
    const response = (await handler(
      { body: JSON.stringify({ code: 'invalid' }) } as any,
      {} as any
    )) as FormattedReturn;

    expect(response.statusCode).toBe(418);
    expect(JSON.parse(response.body).error).toBe('Error fetching token');
  });
});
