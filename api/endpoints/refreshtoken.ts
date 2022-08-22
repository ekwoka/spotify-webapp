import 'dotenv/config';
import { Handler } from '@netlify/functions';
import { Event } from '@netlify/functions/dist/function/event';
import { formattedReturn } from '../utils';
import fetch from 'cross-fetch';
import { parse } from 'cookie';
import { refreshToken as getRefreshToken } from '@ekwoka/spotify-api';

global.fetch = fetch;

export const handler: Handler | MockedHandler = async (req: Event) => {
  try {
    if (!req.headers.cookie) throw 'No cookies';
    const { refresh_token: refreshToken } = parse(req.headers.cookie);
    if (!refreshToken) throw 'No refresh token';
    const tokens = await getRefreshToken(refreshToken);
    return formattedReturn(200, tokens);
  } catch (error) {
    return formattedReturn(418, { error });
  }
};

type HandlerRequest = {
  headers: {
    cookie: {
      refresh_token: string;
    };
  };
};

type MockedHandler = (req: HandlerRequest) => Promise<{
  statusCode: number;
  body: string;
}>;
