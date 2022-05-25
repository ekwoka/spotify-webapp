import { JSXInternal } from 'preact/src/jsx';
import { PlayerBar } from '../organisms/PlayerBar';

export const MainSection = (): JSXInternal.Element => (
  <div class="relative flex flex-1 flex-col md:pl-64">
    <main class="px-4 py-4 text-white">
      <h1>Hello World</h1>
    </main>
    <PlayerBar />
  </div>
);
