import {
  getTopItems,
  recentlyPlayedTracks,
  SpotifyApiClient,
  getRecommendations,
} from '@ekwoka/spotify-api/dist';

export const autoRecommend = async (spotifyApi: SpotifyApiClient) => {
  const [recent, top] = await Promise.all([
    spotifyApi(recentlyPlayedTracks({ limit: 2 })),
    spotifyApi(getTopItems('tracks', { limit: 2 })),
  ]);
  const ids = [
    ...recent.items.map(({ track }) => track.id),
    ...top.items.map((track) => track.id),
  ];

  const recommendations = await spotifyApi(
    getRecommendations({
      seed_tracks: ids,
      limit: 50,
      min_popularity: 50,
      min_energy: 0.5,
    })
  );

  return recommendations.tracks;
};
