import { formattedReturn } from './formattedReturn';

export const redirect = (path: string) => {
  return formattedReturn(302, undefined, { location: path });
};
