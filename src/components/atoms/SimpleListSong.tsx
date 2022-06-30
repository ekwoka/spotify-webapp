import { JSXInternal } from 'preact/src/jsx';
import { SpotifyWebPlaybackTrack } from 'spotify-web-playback';

export const SimpleListSong = (
  props: SpotifyWebPlaybackTrack
): JSXInternal.Element => {
  console.log(props);
  return (
    <div class="flex items-center gap-4 rounded-lg bg-transparent p-4 transition-colors hover:bg-neutral-800 hover:shadow">
      <img
        src={props.album.images[0]?.url ?? 'https://placekitten.com/300/300'}
        class="h-20 w-20 flex-none rounded object-cover shadow"
        loading="lazy"
        width="1"
        height="1"
      />
      <div class="flex grow basis-0 flex-col justify-center">
        <h3 class="text-lg text-lime-500">{props.name}</h3>
        <p class="text-neutral-300">{props.artists[0]?.name ?? ''}</p>
      </div>
      <p class="grow basis-0 text-neutral-300">{props.album?.name ?? ''}</p>
    </div>
  );
};
