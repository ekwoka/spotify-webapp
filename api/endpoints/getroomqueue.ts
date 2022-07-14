import { formattedReturn, FormattedReturn } from '../utils/formattedReturn';
import { Handler } from '@netlify/functions';
import { Get, Index, Match } from 'faunadb';
import { fauna } from '../lib';

export const handler: Handler = async (req): Promise<FormattedReturn> => {
  try {
    const { code } = req.queryStringParameters as { code: string };
    const response = await fauna.query(Get(Match(Index('roomWithCode'), code)));
    console.log(response.data);
    if (!response.data.queue) throw 'No queue found';
    return formattedReturn(200, { ...response.data });
  } catch (e) {
    console.error(e);
    return formattedReturn(500, { error: e });
  }
};
