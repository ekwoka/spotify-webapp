import 'dotenv/config';
import fetch from 'cross-fetch';

// @ts-ignore-next-line
if (!global.fetch) global.fetch = fetch;

// @ts-ignore-next-line
export const config: ENV = process.env as ENV;
// eslint-disable-next-line @typescript-eslint/no-redeclare -- intentionally naming the variable the same as the type
type ENV = {
  SPOTIFY_CLIENT: string;
  SPOTIFY_SECRET: string;
  REDIRECT: string;
  FAUNADB_SERVER_SECRET: string;
};
