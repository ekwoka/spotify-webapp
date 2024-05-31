import { SpotifyApiClient, getRecommendations } from '@ekwoka/spotify-api';
import { arrayWrap } from '../arrayWrap';
import { autoRecommend } from './autoRecommend';

let running = false;
export const radioPlay = async (
  spotifyApi: SpotifyApiClient,
  context?: string | string[],
): Promise<string[] | null> => {
  if (running) return null;
  running = true;
  if (!context) return (await autoRecommend(spotifyApi)).map(({ uri }) => uri);
  const { tracks } = await spotifyApi(
    getRecommendations({
      seed_tracks: arrayWrap(context),
      limit: 10,
      min_popularity: 50,
    }),
  );

  running = false;
  return tracks.map(({ uri }) => uri);
};
