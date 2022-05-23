import { Handler } from '@netlify/functions';
import { redirect } from '../utils/redirect';
import querystring from 'node:querystring';

export const handler: Handler = async () => {
  console.log('redirecting...');
  return redirect(`/${querystring.stringify({ test: true })}`);
};
