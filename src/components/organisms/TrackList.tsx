import { cloneElement, VNode } from 'preact';
import { JSXInternal } from 'preact/src/jsx';
import { TrackObject, useAsyncMemo, useSpotify } from '../../hooks';

export const TrackList = ({
  type,
  children: Child,
  limit,
}: TrackListProps): JSXInternal.Element => {
  const SpotifyApi = useSpotify();
  const tracks = useAsyncMemo<TrackObject[]>(
    async () => {
      const results =
        /* @ts-ignore-next-line */
        (await SpotifyApi[type]({ limit: limit ?? 20 }))?.body?.items ?? [];
      return results[0]?.name
        ? results
        : results.map((item: { track: TrackObject }) => item.track);
    },
    [],
    []
  );

  return cloneElement(Child, { items: tracks });
};

type TrackListProps = {
  type: 'getMyTopTracks' | 'getMyRecentlyPlayedTracks';
  children: VNode;
  limit?: number;
};
