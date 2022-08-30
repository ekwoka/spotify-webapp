import { Handler } from '@netlify/functions';
import { redirect } from '../utils/redirect';

export const handler: Handler = async () => {
  console.log('redirecting...');
  return redirect(`/${new URLSearchParams({ hello: 'world' }).toString()}`);
};
