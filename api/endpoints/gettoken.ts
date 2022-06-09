import { Handler } from '@netlify/functions';
import { Event } from '@netlify/functions/dist/function/event';
import { ENV, formattedReturn, refreshCookie } from '../utils';
import fetch from 'cross-fetch';
import { FormattedReturn } from '../utils/formattedReturn';

export const handler: Handler | MockedHandler = async (
  req: Event
): Promise<FormattedReturn> => {
  try {
    const { code } = JSON.parse(req.body as string);
    const response = await fetch(
      'https://accounts.spotify.com/api/token',
      fetchOptions(code)
    );
    if (!response.ok) throw 'Error fetching token';

    const data = (await response.json()) as { refresh_token: string };
    return formattedReturn(200, { ...data, refresh_token: undefined }, {
      'Set-Cookie': refreshCookie(data.refresh_token),
    });
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

type HandlerRequest = {
  body: string;
};

type MockedHandler = (req: HandlerRequest) => Promise<{
  statusCode: number;
  body: string;
  headers: { 'Set-Cookie': string };
}>;
