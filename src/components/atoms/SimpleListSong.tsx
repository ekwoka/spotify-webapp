import { JSXInternal } from 'preact/src/jsx';

export const SimpleListSong = ({
  name,
  image,
  album,
  artist,
  click,
}: SimpleListSongProps): JSXInternal.Element => {
  return (
    <button
      type="button"
      class="flex items-center gap-4 rounded-lg bg-transparent p-4 transition-colors hover:bg-neutral-800 hover:shadow"
      onClick={click}>
      <img
        src={image ?? 'https://placekitten.com/300/300'}
        class="h-20 w-20 flex-none rounded object-cover shadow"
        loading="lazy"
        width="1"
        height="1"
      />
      <div class="flex grow basis-0 flex-col justify-center">
        <h3 class="text-lg text-lime-500">{name}</h3>
        <p class="text-neutral-300">{artist}</p>
      </div>
      <p class="grow basis-0 text-neutral-300">{album}</p>
    </button>
  );
};

type SimpleListSongProps = {
  name: string;
  image?: string;
  album: string;
  artist: string;
  click: () => void;
};
