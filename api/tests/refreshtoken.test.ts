import { describe, expect, it, jest } from '@jest/globals';
import { handler } from '../endpoints/refreshtoken';
import { FormattedReturn } from '../utils/formattedReturn';

import fetch from 'cross-fetch';
jest.mock('cross-fetch', () => jest.fn());

describe('RefreshToken Endpoint', () => {
  it('should return an access token', async () => {
    /* @ts-ignore */
    fetch.mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ access_token: 100 }),
        ok: true,
      } as Response)
    );
    const response = (await handler(
      {
        headers: {
          cookie: 'refresh_token=valid',
        },
      } as any,
      {} as any
    )) as FormattedReturn;

    expect(response.statusCode).toBe(200);
    const { access_token } = JSON.parse(response.body);
    expect(access_token).toBeDefined();
    expect(access_token).toBe(100);
  });
  it('should return 418 when token is bad', async () => {
    /* @ts-ignore */
    fetch.mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ access_token: 100 }),
        ok: false,
      } as Response)
    );
    const response = (await handler(
      {
        headers: {
          cookie: 'refresh_token=invalid',
        },
      } as any,
      {} as any
    )) as FormattedReturn;

    expect(response.statusCode).toBe(418);
    expect(JSON.parse(response.body).error).toBe('Error fetching token');
  });
  it('should return 418 when refresh token is missing', async () => {
    const response = (await handler(
      {
        headers: {
          cookie: 'access_token=wrong',
        },
      } as any,
      {} as any
    )) as FormattedReturn;
    expect(response.statusCode).toBe(418);
    expect(JSON.parse(response.body).error).toBe('No refresh token');
  });
});
