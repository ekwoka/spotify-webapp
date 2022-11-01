import { formattedReturn, FormattedReturn } from '../utils/formattedReturn';
import { Handler } from '@netlify/functions';
import { faunadb } from '../lib';
import { Get, Match, Index, Update } from 'faunadb';

export const handler: Handler = async (req): Promise<FormattedReturn> => {
  try {
    const { uri, code } = JSON.parse(req.body as string) as {
      uri: string[];
      code: string;
    };

    if (!uri || !code) throw 'No uri or code provided';
    const {
      ref,
      data: { queue },
    } = await faunadb.query(Get(Match(Index('roomWithCode'), code)));
    if (!queue) throw 'No queue found';
    uri.forEach((uri: string) => queue.push(uri));
    await faunadb.query(
      Update(ref, {
        data: { queue },
      })
    );
    return formattedReturn(200, {});
  } catch (e) {
    console.error(e);
    return formattedReturn(500, { error: e });
  }
};
