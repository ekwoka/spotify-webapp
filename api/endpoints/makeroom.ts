import { formattedReturn, FormattedReturn } from '../utils/formattedReturn';
import { Handler } from '@netlify/functions';
import { fauna, query } from '../lib';

const { Create, Collection } = query;

export const handler: Handler = async (): Promise<FormattedReturn> => {
  try {
    const response = await fauna.query(
      Create(Collection('party_rooms'), { data: { created_at: Date.now() } })
    );

    return formattedReturn(200, response);
  } catch (e) {
    console.error(e);
    return formattedReturn(500, { error: e });
  }
};
