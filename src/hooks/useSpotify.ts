import { useGlobalState } from '@ekwoka/preact-global-state';
import { useEffect } from 'preact/hooks';
import {
  setToken,
  spotifyApiClient,
  SpotifyApiClient,
} from '@ekwoka/spotify-api';

export const useSpotify = () => {
  const [token] = useGlobalState<string>('token');
  const [apiClient, setApiClient] =
    useGlobalState<SpotifyApiClient>('apiClient');

  useEffect(() => {
    if (!apiClient && !token) return;
    if (!apiClient) return setApiClient(() => spotifyApiClient(token));
    if (token) apiClient(setToken(token));
  }, [token, apiClient, setApiClient]);

  return apiClient;
};
