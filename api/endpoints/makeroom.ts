import { formattedReturn, FormattedReturn } from '../utils/formattedReturn';
import { Handler } from '@netlify/functions';
import { getNewRoomCode } from '../lib/faunaUtils/getNewRoomCode';
import { fauna } from '../lib';
import { Collection, Create } from 'faunadb';

export const handler: Handler = async (): Promise<FormattedReturn> => {
  try {
    const code = await getNewRoomCode();

    const response = await fauna.query(
      Create(Collection('party_rooms'), {
        data: { code, created_at: Date.now(), songs: [] },
      })
    );
    return formattedReturn(200, { code, response });
  } catch (e) {
    console.error(e);
    return formattedReturn(418, { error: e });
  }
};
