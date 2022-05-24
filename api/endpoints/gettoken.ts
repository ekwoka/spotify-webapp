import { Handler } from '@netlify/functions';
import { ENV, formattedReturn } from '../utils';
import fetch from 'node-fetch';

export const handler: Handler = async (req) => {
  try {
    const { code } = JSON.parse(req.body as string);

    const response = await fetch(
      'https://accounts.spotify.com/api/token',
      fetchOptions(code)
    );
    if (!response.ok) throw 'Error fetching token';

    const data = await response.json();
    return formattedReturn(200, data);
  } catch (error) {
    return formattedReturn(418, { error });
  }
};

const fetchOptions = (code: string) => ({
  method: 'POST',
  headers: {
    Authorization: `Basic ${new Buffer(
      `${ENV.SPOTIFY_CLIENT}:${ENV.SPOTIFY_SECRET}`
    ).toString('base64')}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
  body: new URLSearchParams({
    code,
    redirect_uri: ENV.REDIRECT,
    grant_type: 'authorization_code',
  }),
});
