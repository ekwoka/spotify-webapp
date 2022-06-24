import { ChevronRightIcon } from '@heroicons/react/outline';
import { JSXInternal } from 'preact/src/jsx';
import { classNames } from '../../utils';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const SimpleFlexGrid = <T extends unknown>({
  as,
  items,
  minHeight,
  wrap,
}: {
  as: (item: T) => JSXInternal.Element;
  items: T[];
  minHeight?: number;
  wrap?: boolean;
}): JSXInternal.Element => {
  return (
    <div class="relative">
      <ul
        role="list"
        class={classNames(
          'no-scrollbar flex w-full max-w-full flex-row gap-8 overflow-x-scroll',
          wrap ? 'flex-wrap' : 'flex-nowrap'
        )}
        style={{
          minHeight: `${(minHeight ?? 0) / 4}rem`,
          paddingRight: !wrap ? `${(minHeight ?? 0) / 8}rem` : '',
        }}>
        {items.map(as)}
      </ul>
      {!wrap && (
        <div class="pointer-events-none absolute inset-0 flex flex-row justify-end">
          <div class="flex h-full w-1/3 items-center justify-end bg-gradient-to-r from-transparent via-neutral-900/75 to-neutral-900">
            <ChevronRightIcon class="m-12 h-8 w-8 text-neutral-200/50" />
          </div>
        </div>
      )}
    </div>
  );
};
