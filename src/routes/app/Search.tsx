import { JSXInternal } from 'preact/src/jsx';
import { SimpleGridItem } from '../../components/atoms';
import { SimpleFlexGrid } from '../../components/molecules';
import { SearchInput } from '../../components/atoms/inputs';
import { route } from 'preact-router';
import { autoRecommend } from '../../utils/spotify/autoRecommend';
import { useGlobalState } from '@ekwoka/preact-global-state/dist';
import { SpotifyApiClient, search } from '@ekwoka/spotify-api';
import { useSignal, useSignalEffect } from '@preact/signals';
import { TrackStub } from '@ekwoka/spotify-api/dist/endpoints';
import { useQuery } from '@tanstack/react-query';

export const Search = ({ q: query }: { q: string }): JSXInternal.Element => {
  const searchQuery = useSignal<string>(query ?? '');
  const [client] = useGlobalState<SpotifyApiClient>('apiClient');
  useSignalEffect(() => {
    route(`/search/${searchQuery.value}`);
  });
  const { data: results } = useQuery<TrackStub[]>(
    ['search', searchQuery.value],
    async () => {
      if (!searchQuery.value) return await autoRecommend(client);

      const tracks = await client(search(searchQuery.value, 'track'));
      return tracks.tracks.items;
    },
    {
      keepPreviousData: true,
      initialData: [],
      staleTime: 1000 * 60 * 15,
      initialDataUpdatedAt: 0,
    }
  );

  return (
    <div class="flex w-full flex-col gap-8">
      <SearchInput value={searchQuery} />
      <SimpleFlexGrid
        as={(item) => <SimpleGridItem key={item.id} {...item} />}
        items={results}
        minHeight={52}
        wrap={true}
      />
    </div>
  );
};
