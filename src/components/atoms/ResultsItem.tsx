import { PlayIcon, ViewGridAddIcon } from '@heroicons/react/solid';
import { JSXInternal } from 'preact/src/jsx';
import { usePlayer } from '../../hooks';
import { TrackObject } from '../../hooks/useSpotify';

export const ResultsItem = ({
  id,
  name,
  artists,
  album,
  uri,
  ...rest
}: TrackObject): JSXInternal.Element => {
  const { play } = usePlayer()[1];
  return (
    <li
      key={id}
      class="col-span-1 divide-y divide-gray-200/40 rounded-lg border border-gray-200/40 bg-gradient-to-tr from-gray-200/10 to-gray-50/10 shadow backdrop-blur-md">
      <div class="flex w-full items-center justify-between space-x-6 p-6">
        <div class="flex-1 truncate">
          <div class="flex items-center space-x-3">
            <h3 class="truncate whitespace-pre-wrap text-sm font-medium text-gray-50 line-clamp-3">
              {name}
            </h3>
          </div>
          <p class="mt-1 truncate text-sm text-gray-200">{artists[0].name}</p>
          {rest.explicit && (
            <span class="mt-1 inline-block flex-shrink-0 truncate rounded-full bg-red-800 px-2 py-0.5 text-xs font-medium text-red-100">
              explicit
            </span>
          )}
        </div>
        <img
          class="h-full max-h-24 w-auto flex-shrink-0 rounded-md bg-gray-300 object-cover"
          src={album.images[0].url}
          width={album.images[0].width}
          height={album.images[0].height}
          alt={album.name}
        />
      </div>
      <div>
        <div class="-mt-px flex divide-x divide-gray-200">
          <div class="flex w-0 flex-1">
            <button
              type="button"
              class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-200 hover:bg-gray-50/40 hover:text-gray-100"
              onClick={() => play(uri)}>
              <PlayIcon class="h-5 w-5 text-gray-200" aria-hidden="true" />
              <span class="ml-3">Play Now</span>
            </button>
          </div>
          <div class="-ml-px flex w-0 flex-1">
            <button
              type="button"
              class="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-200 hover:bg-gray-50/40 hover:text-gray-100">
              <ViewGridAddIcon
                class="h-5 w-5 text-gray-200"
                aria-hidden="true"
              />
              <span class="ml-3">Add to...</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
