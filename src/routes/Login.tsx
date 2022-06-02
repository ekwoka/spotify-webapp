import { JSXInternal } from 'preact/src/jsx';

export const Login = (): JSXInternal.Element => (
  <button onClick={() => (window.location.href = `/api/login`)}>
    Login with spotify
  </button>
);
