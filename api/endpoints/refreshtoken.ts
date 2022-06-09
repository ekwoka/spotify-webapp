import { Handler } from '@netlify/functions';
import { ENV, formattedReturn } from '../utils';
import fetch from 'cross-fetch';
import { parse } from 'cookie';

export const handler: Handler = async (req) => {
  try {
    if (!req.headers.cookie) throw 'No cookies';
    const { refresh_token: refreshToken } = parse(req.headers.cookie);

    const response = await fetch(
      'https://accounts.spotify.com/api/token',
      fetchOptions(refreshToken)
    );

    if (!response.ok) throw 'Error fetching token';
    const data = (await response.json()) as { refresh_token: string };
    return formattedReturn(200, data);
  } catch (e) {
    return formattedReturn(418, { error: e });
  }
};

const fetchOptions = (refreshToken: string) => ({
  method: 'POST',
  headers: {
    Authorization: `Basic ${new Buffer(
      `${ENV.SPOTIFY_CLIENT}:${ENV.SPOTIFY_SECRET}`
    ).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
  body: new URLSearchParams({
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  }),
});
