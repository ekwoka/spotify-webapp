import { useGlobalState } from '@ekwoka/preact-global-state';
import Router, { route, Route } from 'preact-router';
import { JSXInternal } from 'preact/src/jsx';
import { PlayerBar } from '../../components/organisms/PlayerBar';
import { TopBar } from '../../components/organisms/navigation/TopBar';
import { LazyHome, LazyPlaying, LazyPlaylist, LazySearch } from './lazyRoutes';
import { useEffect } from 'preact/hooks';
import { Party } from './Party';

export const MainSection = (): JSXInternal.Element => {
  const [search] = useGlobalState<string>('searchString', '');

  useEffect(() => {
    if (!search) return;
    route(`/search/${search}`);
  }, [search]);

  return (
    <div class="relative flex flex-1 flex-col gap-2 md:pl-64">
      <TopBar />
      <main class="mb-36 px-4 py-4 text-neutral-200">
        <Router>
          <Route path="/" component={LazyHome} />
          <Route path="/search" component={LazySearch} />
          <Route path="/search/:q" component={LazySearch} />
          <Route path="/playlists" component={LazyPlaylist} />
          <Route path="/playing" component={LazyPlaying} />
          <Route path="/party" component={Party} />
        </Router>
      </main>
      <PlayerBar />
    </div>
  );
};
