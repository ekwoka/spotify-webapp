import { Handler } from '@netlify/functions';
import { formattedReturn } from '../utils';

export const handler: Handler = async () => {
  return formattedReturn(200, { test: true });
};
