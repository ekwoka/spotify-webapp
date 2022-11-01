import { formattedReturn, FormattedReturn } from '../utils/formattedReturn';
import { Handler } from '@netlify/functions';
import { Event } from '@netlify/functions/dist/function/event';
import { faunadb } from '../lib';
import { Exists, Index, Match } from 'faunadb';

export const handler: Handler = async (
  req: Event
): Promise<FormattedReturn> => {
  const roomCode = JSON.parse(req.body as string).code ?? '';
  try {
    if (!roomCode) throw 'No room code provided';
    const roomIsOpen = await faunadb.query(
      Exists(Match(Index('roomWithCode'), roomCode.toUpperCase()))
    );
    if (!roomIsOpen) throw 'Room does not exist';
    return formattedReturn(200, {});
  } catch (e) {
    console.error(e);
    return formattedReturn(418, { error: e });
  }
};
