import { makeRoomCode } from '../../utils';
import { fauna, query } from '../';
import { Client } from 'faunadb';

const { Match, Index, Exists } = query;

export const getNewRoomCode = (): Promise<string> => {

  const roomLoop = async (client: Client): Promise<string> => {
    const code = makeRoomCode();
    const exists = await client.query(Exists(Match(Index('roomWithCode'), code)));
    if (exists) return roomLoop(client);
    return code;
  }

  return fauna.openQuery<string>(roomLoop);
}
