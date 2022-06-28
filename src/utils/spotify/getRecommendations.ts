import SpotifyWebApi from "spotify-web-api-node";
import { TrackObject } from "../../hooks/useSpotify"

export const getRecommendations = async(spotifyApi: SpotifyWebApi): Promise<TrackObject[]> => {
  const [recent, top] = await Promise.all([spotifyApi.getMyRecentlyPlayedTracks({ limit: 2 }), spotifyApi.getMyTopTracks({ limit: 2 })]);
  const ids = ([...recent.body.items,...top.body.items] as TrackObject[]).map((track: TrackObject) => track.id ?? track.track.id);

  const recommendations = await spotifyApi.getRecommendations({
    seed_tracks: ids,
    limit: 50,
    min_popularity: 50,
    min_energy: 0.5
  });

  return recommendations.body.tracks;
}
