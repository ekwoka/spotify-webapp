import SpotifyWebApi from 'spotify-web-api-node';
import { arrayWrap } from '../arrayWrap';
import { getRecommendations } from './getRecommendations';

let running = false;
export const radioPlay = async (
  spotifyApi: SpotifyWebApi,
  context?: string | string[]
): Promise<string[] | null> => {
  if (running) return null;
  running = true;
  if (!context)
    return (await getRecommendations(spotifyApi)).map(({ uri }) => uri);
  const {
    body: { tracks },
  } = await spotifyApi.getRecommendations({
    seed_tracks: arrayWrap(context),
    limit: 10,
    min_popularity: 50,
  });

  running = false;
  return tracks.map(({ uri }) => uri);
};
