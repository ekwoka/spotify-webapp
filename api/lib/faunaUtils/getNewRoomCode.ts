import { makeRoomCode } from '../../utils';
import { fauna } from '../';
import { Client, Exists, Index, Match } from 'faunadb';

export const getNewRoomCode = (): Promise<string> => {
  const roomLoop = async (client: Client): Promise<string> => {
    const code = makeRoomCode();
    const exists = await client.query(
      Exists(Match(Index('roomWithCode'), code))
    );
    if (exists) return roomLoop(client);
    return code;
  };

  return fauna.openQuery<string>(roomLoop);
};
