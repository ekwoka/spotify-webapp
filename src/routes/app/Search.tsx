import { JSXInternal } from 'preact/src/jsx';
import { useAsyncEffect } from '../../hooks';
import { SimpleGridItem } from '../../components/atoms';
import { SimpleFlexGrid } from '../../components/molecules';
import { SearchInput } from '../../components/atoms/inputs';
import { route } from 'preact-router';
import { autoRecommend } from '../../utils/spotify/autoRecommend';
import { useGlobalState } from '@ekwoka/preact-global-state/dist';
import { SpotifyApiClient, search } from '@ekwoka/spotify-api';
import { useSignal } from '@preact/signals';
import { TrackStub } from '@ekwoka/spotify-api/dist/endpoints';

export const Search = ({ q: query }: { q: string }): JSXInternal.Element => {
  const results = useSignal<TrackStub[]>([]);
  const searchQuery = useSignal<string>(query ?? '');
  const [client] = useGlobalState<SpotifyApiClient>('apiClient');

  useAsyncEffect(async () => {
    route(`/search/${searchQuery.value}`);
    if (!searchQuery.value) {
      results.value = await autoRecommend(client);
      return;
    }
    const tracks = await client(search(searchQuery.value, 'track'));
    results.value = tracks.tracks.items;
  }, [searchQuery.value]);

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
