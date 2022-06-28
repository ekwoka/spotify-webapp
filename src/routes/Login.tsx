import { JSXInternal } from 'preact/src/jsx';

export const Login = (): JSXInternal.Element => (
  <main class="flex h-screen w-full items-center justify-center">
    <div class="py-8 px-10 sm:rounded-lg sm:p-20 rounded-lg bg-neutral-800 p-8 shadow-lg shadow-lime-500/40 text-neutral-50 max-w-screen-sm flex flex-col gap-8">
      <h1 class="text-6xl text-transparent bg-gradient-to-tr from-lime-600 to-lime-400 bg-clip-text font-bold tracking-widest text-center">Kwokify</h1>
      <p class="max-w-sm">A Redesigned alternative to the standard Spotify App.</p>
      <button class="flex w-full justify-center rounded-md border border-transparent bg-lime-500 py-2 px-4 font-medium text-neutral-900 shadow-sm hover:bg-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2" onClick={() => (window.location.href = `/api/login`)}>
        Login with Spotify
      </button>
    </div>
  </main>
);
