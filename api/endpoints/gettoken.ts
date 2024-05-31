import '../utils/config';
import { Handler } from '@netlify/functions';
import { Event } from '@netlify/functions/dist/function/event';
import { formattedReturn, refreshCookie } from '../utils';
import { FormattedReturn } from '../utils/formattedReturn';
import { tokensFromCode } from '@ekwoka/spotify-api';

export const handler: Handler | MockedHandler = async (
  req: Event,
): Promise<FormattedReturn> => {
  try {
    const { code } = JSON.parse(req.body as string);
    const tokens = await tokensFromCode(code);
    return formattedReturn(
      200,
      { ...tokens, refresh_token: undefined },
      {
        'Set-Cookie': refreshCookie(tokens.refresh_token),
      },
    );
  } catch (error) {
    return formattedReturn(418, { error });
  }
};

type HandlerRequest = {
  body: string;
};

type MockedHandler = (req: HandlerRequest) => Promise<{
  statusCode: number;
  body: string;
  headers: { 'Set-Cookie': string };
}>;
