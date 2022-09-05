import { ChevronRightSolid } from 'preact-heroicons';
import { classNames } from '../../utils';

export const SongLabel = ({
  name,
  artist,
  class: className,
  ...rest
}: SongLabel) => {
  return (
    <div
      class={classNames(
        'flex flex-1 flex-row items-center truncate',
        className ?? ''
      )}
      {...rest}>
      <h3 class="shrink-1 max-w-[20ch] truncate whitespace-pre-wrap font-medium text-neutral-50 line-clamp-1">
        {name}
      </h3>
      <ChevronRightSolid class="block h-3 w-3 shrink-0" />
      <span class="max-w-[16ch] shrink-0 truncate whitespace-pre-wrap text-neutral-200 line-clamp-1">
        {artist}
      </span>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
type SongLabel = {
  name: string;
  artist: string;
  class?: string;
  [key: string]: any;
};
