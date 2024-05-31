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
        className ?? '',
      )}
      {...rest}>
      <h3 class="shrink-1 line-clamp-1 max-w-[20ch] truncate whitespace-pre-wrap font-medium text-neutral-50">
        {name}
      </h3>
      <ChevronRightSolid class="block h-3 w-3 shrink-0" />
      <span class="line-clamp-1 max-w-[16ch] shrink-0 truncate whitespace-pre-wrap text-neutral-200">
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
