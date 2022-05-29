import { useGlobalState } from '@ekwoka/preact-global-state';
import Router, { route, Route } from 'preact-router';
import { StateUpdater } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import { useAsyncEffect } from '../../hooks';
import { SearchInput } from '../atoms/inputs/SearchInput';
import { PlayerBar } from '../organisms/PlayerBar';
import { Home } from '../routes/Home';
import { SearchResults } from '../routes/SearchResults';

export const MainSection = (): JSXInternal.Element => {
  const [search, setSearch] = useGlobalState<string>('searchString', '');

  useAsyncEffect(async () => {
    if (!search) return;
    route(`/search/${search}`);
  }, [search]);

  return (
    <div class="relative flex flex-1 flex-col gap-2 md:pl-64">
      <SearchInput value={search} setter={setSearch as StateUpdater<string>} />
      <main class="mb-36 px-4 py-4 text-white">
        <Router>
          <Route path="/search/:q" component={SearchResults} />
          <Route path="/" component={Home} />
        </Router>
      </main>
      <PlayerBar />
    </div>
  );
};
