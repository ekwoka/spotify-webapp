import { Client, Expr } from 'faunadb';
import { ENV } from '../utils';

const getClient = () =>
  new Client({
    secret: ENV.FAUNADB_SERVER_SECRET,
    http2SessionIdleTime: 10,
  });

const query = async (expr: Expr) => {
  const client = getClient();
  const data = await client.query(expr);
  client.close();
  return data;
};

const openQuery: Fauna['openQuery'] = async (fn): Promise<any> => {
  const client = getClient();
  const data = await fn(client);
  client.close();
  return data;
};

export const fauna: Fauna = {
  query,
  openQuery,
  getClient,
};

type Fauna = {
  query: (query: Expr) => Promise<object>;
  openQuery: <T>(fn: (client: Client) => Promise<T>) => Promise<T>;
  getClient: () => Client;
};
