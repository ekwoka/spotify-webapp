import { Client } from 'faunadb';
export { query } from 'faunadb';
import { ENV } from '../utils';

export const fauna = new Client({
  secret: ENV.FAUNADB_SERVER_SECRET,
  http2SessionIdleTime: 10,
});
