import { useGlobalState } from '@ekwoka/preact-global-state/dist';
import {
  getTopItems,
  recentlyPlayedTracks,
  SpotifyApiClient,
} from '@ekwoka/spotify-api/dist';
import { cloneElement, VNode } from 'preact';
import { JSXInternal } from 'preact/src/jsx';
import { TrackObject, useAsyncMemo } from '../../hooks';

export const TrackList = ({
  type,
  children: Child,
  limit = 20,
}: TrackListProps): JSXInternal.Element => {
  const [client] = useGlobalState<SpotifyApiClient>('apiClient');
  const tracks = useAsyncMemo<TrackObject[]>(
    async () => {
      if (type === 'recentlyPlayed') {
        const response = await client(recentlyPlayedTracks({ limit }));
        return response.items.map((item) => item.track);
      }
      const results = (await client(getTopItems('tracks', { limit }))).items;
      return results;
    },
    [],
    []
  );

  return cloneElement(Child, { items: tracks });
};
type TrackListProps = {
  type: 'topTracks' | 'recentlyPlayed';
  children: VNode;
  limit: number;
};
