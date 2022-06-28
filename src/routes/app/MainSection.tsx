import { useGlobalState } from '@ekwoka/preact-global-state';
import Router, { route, Route } from 'preact-router';
import { JSXInternal } from 'preact/src/jsx';
import { useAsyncEffect } from '../../hooks';
import { lazyLoad } from '../../components/organisms';
import { PlayerBar } from '../../components/organisms/PlayerBar';
import { TopBar } from '../../components/organisms/navigation/TopBar';

const LazyHome = lazyLoad(() => import('./Home').then((mod) => mod.Home));
const LazySearch = lazyLoad(
  () =>
    import('./Search').then((mod) => mod.Search) as Promise<
      () => JSXInternal.Element
    >
);
const LazyPlaylist = lazyLoad(() =>
  import('./Playlists').then((mod) => mod.Playlists)
);

export const MainSection = (): JSXInternal.Element => {
  const [search] = useGlobalState<string>('searchString', '');

  useAsyncEffect(async () => {
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
        </Router>
      </main>
      <PlayerBar />
    </div>
  );
};
