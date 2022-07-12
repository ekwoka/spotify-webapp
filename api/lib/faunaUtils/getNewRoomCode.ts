import { makeRoomCode } from '../../utils';
import { fauna, query } from '../';

const { Match, Index, Exists } = query;

export const getNewRoomCode = async (): Promise<string> => {
  const code = makeRoomCode();
  const exists = await fauna.query(Exists(Match(Index('roomWithCode'), code)));
  if (exists) return getNewRoomCode();
  return code;
};
