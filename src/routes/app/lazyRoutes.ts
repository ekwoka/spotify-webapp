/* eslint-disable filename-export/match-named-export */
import { JSXInternal } from 'preact/src/jsx';
import { lazyLoad } from '../../components/organisms';

export const LazyHome = lazyLoad(() =>
  import('./Home').then((mod) => mod.Home),
);
export const LazySearch = lazyLoad(
  () =>
    import('./Search').then((mod) => mod.Search) as Promise<
      () => JSXInternal.Element
    >,
);
export const LazyPlaylist = lazyLoad(() =>
  import('./Playlists').then((mod) => mod.Playlists),
);
export const LazyPlaying = lazyLoad(() =>
  import('./Playing').then((mod) => mod.Playing),
);
export const LazyParty = lazyLoad(() =>
  import('./Party').then((mod) => mod.Party),
);
