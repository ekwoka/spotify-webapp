import { useGlobalState } from '@ekwoka/preact-global-state';
import Router, { route, Route } from 'preact-router';
import { JSXInternal } from 'preact/src/jsx';
import { useAsyncEffect } from '../../hooks';
import { lazyLoad } from '../../components/organisms';
import { PlayerBar } from '../../components/organisms/PlayerBar';
import { TopBar } from '../../components/organisms/navigation/TopBar';

const LazyResults = lazyLoad(
  () =>
    import('./SearchResults').then((mod) => mod.SearchResults) as Promise<
      () => JSXInternal.Element
    >
);
const LazyHome = lazyLoad(() => import('./Home').then((mod) => mod.Home));

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
          <Route path="/search/:q" component={LazyResults} />
        </Router>
      </main>
      <PlayerBar />
    </div>
  );
};
