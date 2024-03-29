import { useGlobalState } from '@ekwoka/preact-global-state';
import Router, { route, Route } from 'preact-router';
import { JSXInternal } from 'preact/src/jsx';
import { PlayerBar } from '../../components/organisms/PlayerBar';
import { TopBar } from '../../components/organisms/navigation/TopBar';
import {
  LazyHome,
  LazyPlaying,
  LazyPlaylist,
  LazySearch,
  LazyParty,
} from './lazyRoutes';
import { useEffect } from 'preact/hooks';
import { useAutoAnimate } from '../../hooks';
import { Toast, ToastBar, Toaster } from 'react-hot-toast';

export const MainSection = (): JSXInternal.Element => {
  const [search] = useGlobalState<string>('searchString', '');
  const animate = useAutoAnimate();

  useEffect(() => {
    if (!search) return;
    route(`/search/${search}`);
  }, [search]);

  return (
    <div class="relative flex flex-1 flex-col gap-2 md:pl-64">
      <TopBar />
      <main class="mb-36 px-4 py-4 text-neutral-200" ref={animate}>
        <Router>
          <Route path="/" component={LazyHome} />
          <Route path="/search" component={LazySearch} />
          <Route path="/search/:q" component={LazySearch} />
          <Route path="/playlists" component={LazyPlaylist} />
          <Route path="/playing" component={LazyPlaying} />
          <Route path="/party" component={LazyParty} />
        </Router>
      </main>
      <PlayerBar />
      <Toaster>
        {(t: Toast) => (
          <ToastBar
            toast={t}
            style={{
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            }}
          />
        )}
      </Toaster>
    </div>
  );
};
