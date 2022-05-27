import { useState } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import { useAsyncEffect } from '../../hooks';
import { TrackObject, useSpotify } from '../../hooks/useSpotify';
import { SearchInput } from '../atoms/inputs/SearchInput';
import { ResultsItem } from '../atoms/ResultsItem';
import { ResultsGrid } from '../modules/ResultsGrid';
import { PlayerBar } from '../organisms/PlayerBar';

export const MainSection = (): JSXInternal.Element => {
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<TrackObject[]>([]);
  const doSearch = useSpotify();

  useAsyncEffect(async () => {
    if (!search) return;
    const response = await doSearch(search);
    setResults((prev) => response?.body?.tracks?.items || prev);
  }, [search]);
  return (
    <div class="relative flex flex-1 flex-col md:pl-64">
      <main class="mb-36 px-4 py-4 text-white">
        <SearchInput value={search} setter={setSearch} />
        <p>Outside search: {search}</p>
        <ResultsGrid as={(item) => <ResultsItem {...item} />} data={results} />
      </main>
      <PlayerBar />
    </div>
  );
};
