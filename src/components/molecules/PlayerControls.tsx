import { ForwardSolid } from '@graywolfai/react-heroicons/dist/solid/forward-solid';
import { PauseSolid } from '@graywolfai/react-heroicons/dist/solid/pause-solid';
import { PlaySolid } from '@graywolfai/react-heroicons/dist/solid/play-solid';
import { JSXInternal } from 'preact/src/jsx';
import { usePlayer } from '../../hooks';

export const PlayerControls = (): JSXInternal.Element => {
  const [_, { play, pause, next, previous }, currentState] = usePlayer();

  return (
    <div class="flex flex-row items-center justify-center px-8 pb-2">
      <button
        onClick={() => previous()}
        class="block disabled:text-gray-400"
        disabled={!currentState?.track_window.current_track.id}>
        <ForwardSolid class="h-8 w-8 rotate-180" />
      </button>
      <button
        class="text-lime-500 disabled:text-gray-400"
        disabled={!currentState?.track_window.current_track.id}
        onClick={() => {
          if (!currentState?.track_window.current_track.id) return;
          if (currentState.paused) play();
          else pause();
        }}>
        {currentState?.paused ? (
          <>
            <span class="sr-only">Play Current Track</span>
            <PlaySolid class="h-12 w-12" />
          </>
        ) : (
          <>
            <span class="sr-only">Pause Current Track</span>
            <PauseSolid class="h-12 w-12" />
          </>
        )}
      </button>
      <button
        onClick={() => next()}
        class="block disabled:text-gray-400"
        disabled={!currentState?.track_window.current_track.id}>
        <ForwardSolid class="h-8 w-8" />
      </button>
    </div>
  );
};
