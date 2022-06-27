import { Handler } from '@netlify/functions';
import { ENV, redirect } from '../utils';
import querystring from 'node:querystring';

export const handler: Handler | MockedHandler = async () => {
  const scope = scopes.join(' ');

  return redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: 'code',
      client_id: ENV.SPOTIFY_CLIENT,
      scope,
      redirect_uri: ENV.REDIRECT,
    })}`
  );
};

const scopes: string[] = [
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
