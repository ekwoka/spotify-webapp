import { serialize } from 'cookie';

export const refreshCookie = (refreshToken: string) => {
  return serialize('refresh_token', refreshToken, {
    secure: true,
    httpOnly: true,
    path: '/',
    maxAge: TWOWEEKS,
  });
};

const HOUR = 3600000;
const TWOWEEKS = 14 * 24 * HOUR;
