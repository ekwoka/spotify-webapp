import 'dotenv/config';
import { Handler } from '@netlify/functions';
import { redirect } from '../utils';
import { makeAuthURL } from '@ekwoka/spotify-api/dist';
import { scope } from '@ekwoka/spotify-api/dist/auth/makeAuthURL';

export const handler: Handler | MockedHandler = async () => {
  return redirect(makeAuthURL(scopes));
};

const scopes: scope[] = [
  'user-modify-playback-state',
  'user-follow-read',
  'user-read-recently-played',
  'user-read-playback-state',
  'user-read-email',
  'streaming',
  'user-top-read',
  'user-library-modify',
  'user-follow-read',
  'user-read-currently-playing',
  'user-library-modify',
  'user-library-read',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
];

type MockedHandler = (req: any) => Promise<{
  statusCode: number;
  body: string;
  headers: {
    location: string;
  };
}>;
