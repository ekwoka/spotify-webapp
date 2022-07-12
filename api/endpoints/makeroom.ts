import { formattedReturn, FormattedReturn } from '../utils/formattedReturn';
import { Handler } from '@netlify/functions';
import { getNewRoomCode } from '../lib/faunaUtils/getNewRoomCode';
import { fauna, query } from '../lib';

const { Create, Collection } = query;
export const handler: Handler = async (): Promise<FormattedReturn> => {
  try {
    const code = await getNewRoomCode();

    const response = await fauna.query(
      Create(Collection('party_rooms'), { data: { code, created_at: Date.now(), songs: [] } })
    );
    return formattedReturn(200, { code, response });
  } catch (e) {
    console.error(e);
    return formattedReturn(500, { error: e });
  }
};
