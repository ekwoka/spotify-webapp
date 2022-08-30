import Router, { Route } from 'preact-router';
import { lazyLoad } from '../components/organisms';
import { Splash } from '../components/templates';
import { useAuth, useSpotify } from '../hooks';

const LazyLogin = lazyLoad(() => import('./Login').then((mod) => mod.Login));
const LazyMain = lazyLoad(() => import('./AppMain').then((mod) => mod.Main));

export const Root = () => {
  const [ready, status] = useAuth();
  useSpotify();

  if (!ready) return <Splash />;

  if (status === 'logged out') return <LazyLogin />;

  return (
    <Router>
      <Route path="/login" component={LazyLogin} />
      <Route path="/:rest*" component={LazyMain} />
    </Router>
  );
};
