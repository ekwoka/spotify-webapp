import { useGlobalState } from '@ekwoka/preact-global-state';
import { JSXInternal } from 'preact/src/jsx';
import { SimpleListSong } from '../../components/atoms/SimpleListSong';
import { PlayerState } from '../../hooks';

export const Playing = (): JSXInternal.Element => {
  const [state] = useGlobalState<PlayerState | null>('playerstate', null);
  console.log(state);
  return (
    <section class="flex flex-col gap-8">
      <div class="flex flex-col gap-4">
        <h2 class="text-lg">Currently Playing</h2>
        <div class="flex flex-col gap-2">
          {state?.track_window.current_track && (
            <SimpleListSong {...state.track_window.current_track} />
          )}
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <h2 class="text-lg">Up Next</h2>
        <div class="flex flex-col gap-2">
          {state?.track_window.next_tracks.map((track) => (
            <SimpleListSong key={track.id} {...track} />
          ))}
        </div>
      </div>
    </section>
  );
};
