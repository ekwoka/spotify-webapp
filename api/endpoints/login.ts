import { Handler } from '@netlify/functions';
import { ENV, redirect } from '../utils';
import querystring from 'node:querystring';

export const handler: Handler = async () => {
  const scope = scopes.join(' ');

  console.log(ENV.REDIRECT);

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
  'user-follow-modify',
  'user-read-recently-played',
  'user-read-playback-state',
  'user-read-email',
  'streaming',
  'user-top-read',
  'user-library-modify',
  'user-follow-read',
  'user-read-currently-playing',
  'user-library-read',
  'user-read-private',
];
