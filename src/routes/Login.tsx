import { JSXInternal } from 'preact/src/jsx';
import { MainButton } from '../components/atoms/inputs';

export const Login = (): JSXInternal.Element => (
  <main class="flex h-screen w-full items-center justify-center">
    <div class="flex max-w-screen-sm flex-col gap-8 rounded-lg bg-neutral-800 p-8 px-10 py-8 text-neutral-50 shadow-lg shadow-lime-500/40 sm:rounded-lg sm:p-20">
      <h1 class="bg-gradient-to-tr from-lime-600 to-lime-400 bg-clip-text text-center text-6xl font-bold tracking-widest text-transparent">
        Kwokify
      </h1>
      <p class="max-w-sm">
        A Redesigned alternative to the standard Spotify App.
      </p>
      <MainButton onClick={() => (window.location.href = `/api/login`)}>
        Login with Spotify
      </MainButton>
    </div>
  </main>
);
