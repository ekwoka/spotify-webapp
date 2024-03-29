import {
  AdjustmentsVerticalSolid,
  RectangleStackSolid,
  MicrophoneSolid,
  PlusOutline,
  SpeakerWaveSolid,
} from 'preact-heroicons';
import { Link } from 'preact-router/match';
import { JSXInternal } from 'preact/src/jsx';
import { SpotifyWebPlaybackTrack } from 'spotify-web-playback';
import { HeartSong } from '../atoms/HeartSong';

export const PlayerOptions = ({
  song,
}: {
  song: SpotifyWebPlaybackTrack;
}): JSXInternal.Element => {
  return (
    <div class="flex flex-1 flex-row items-center justify-center gap-x-2 overflow-hidden px-8 pb-2">
      <Link href="/playing" activeClassName="text-lime-500">
        <RectangleStackSolid class="h-6 w-6 flex-none" />
      </Link>
      <PlusOutline class="h-6 w-6 flex-none" />
      <HeartSong id={song.id} />
      <MicrophoneSolid class="h-6 w-6 flex-none" />
      <AdjustmentsVerticalSolid class="h-6 w-6 flex-none" />
      <SpeakerWaveSolid class="h-6 w-6 flex-none" />
    </div>
  );
};
