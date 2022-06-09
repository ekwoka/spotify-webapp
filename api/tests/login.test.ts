import { describe, expect, it } from '@jest/globals';
import { Event } from '@netlify/functions/dist/function/event';
import { handler } from '../endpoints/login';

describe('Login Endpoint', () => {
  it('redirects to Spotify', async () => {
    const response = await handler({} as Event, {} as any);
    expect(response?.statusCode).toBe(302);
    expect(
      (response?.headers?.location as string).includes(
        'https://accounts.spotify.com/authorize'
      )
    ).toBeTruthy();
  });
});
