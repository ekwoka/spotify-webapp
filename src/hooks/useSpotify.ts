import { useGlobalState } from './useGlobalState';
import SpotifyWebApi from 'spotify-web-api-node';
import { useEffect } from 'preact/hooks';

const spotifyApi = new SpotifyWebApi();

export const useSpotify = () => {
  const [token] = useGlobalState<string>('token');

  useEffect(() => {
    if (token) spotifyApi.setAccessToken(token);
  }, [token]);

  return spotifyApi;
};

export type TrackObject = any;
