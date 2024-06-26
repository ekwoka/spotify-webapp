import { useGlobalState } from '@ekwoka/preact-global-state/dist';
import {
  getTopItems,
  recentlyPlayedTracks,
  SpotifyApiClient,
} from '@ekwoka/spotify-api';
import { Track } from '@ekwoka/spotify-api/dist/endpoints/tracks';
import { useQuery } from '@tanstack/react-query';
import { cloneElement, VNode } from 'preact';
import { JSXInternal } from 'preact/src/jsx';

export const TrackList = ({
  type,
  children: Child,
  limit = 20,
}: TrackListProps): JSXInternal.Element => {
  const [client] = useGlobalState<SpotifyApiClient>('apiClient');
  const { data: tracks } = useQuery<Track[]>(
    [type, limit],
    async () => {
      if (type === 'recentlyPlayed') {
        const response = await client(recentlyPlayedTracks({ limit }));
        return response.items.map((item) => item.track);
      }
      const results = (await client(getTopItems('tracks', { limit }))).items;
      return results;
    },
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 15,
    },
  );

  return cloneElement(Child, { items: tracks ?? [] });
};
type TrackListProps = {
  type: 'topTracks' | 'recentlyPlayed';
  children: VNode;
  limit: number;
};
