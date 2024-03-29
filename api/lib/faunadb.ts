import { Client, Expr } from 'faunadb';
import { config } from '../utils';

const getClient = () =>
  new Client({
    secret: config.FAUNADB_SERVER_SECRET,
    http2SessionIdleTime: 10,
  });

const query = async (expr: Expr) => {
  const client = getClient();
  const data = await client.query(expr);
  client.close();
  return data as FaunaData;
};

const openQuery: Fauna['openQuery'] = async (fn): Promise<any> => {
  const client = getClient();
  const data = await fn(client);
  client.close();
  return data;
};

export const faunadb: Fauna = {
  query,
  openQuery,
  getClient,
};

type Fauna = {
  query: (query: Expr) => Promise<FaunaData>;
  openQuery: <T>(fn: (client: Client) => Promise<T>) => Promise<T>;
  getClient: () => Client;
};

type FaunaData = {
  ref: any;
  data: {
    [key: string]: any;
  };
};
