import { hotkeys } from '@ekwoka/hotkeys';
import { Signal, useSignal } from '@preact/signals';
import { useRouter } from 'preact-router';
import { useEffect, useMemo, useRef } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import { debounce } from '../../../utils/debounce';

export const SearchInput = ({
  value,
  label,
  Icon,
  ...config
}: SearchInput): JSXInternal.Element => {
  const query = useSignal<string>(value.value);
  const focus = useRef<HTMLInputElement>(null);
  const matches = useRouter()[0].matches;

  useEffect(() => {
    if (matches?.rest?.includes('search'))
      query.value = matches.rest.split('/')[1];
  }, [matches, query]);

  useEffect(() => {
    const action = () => focus.current?.focus();
    return hotkeys({
      'cmd+k': action,
      'ctrl+k': action,
    });
  }, []);

  const handleChange = useMemo(
    () =>
      config.debounce === false
        ? (val: string) => (value.value = val)
        : debounce((val: string) => (value.value = val)),
    [config.debounce, value],
  );

  useEffect(() => {
    if (!config.setOnCommit) handleChange(query.value);
  }, [query.value, config.setOnCommit, handleChange]);

  return (
    <div class="px-4 py-2">
      {label && (
        <label
          htmlFor="search"
          class="block text-sm font-medium text-neutral-700">
          {label}
        </label>
      )}
      <div class="relative mt-1 flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          ref={focus}
          class="block w-full rounded-md border-neutral-300 pr-12 text-black shadow-sm focus:border-lime-500 focus:ring-lime-500 sm:text-sm"
          value={query.value}
          onInput={(e) => (query.value = (e.target as HTMLInputElement).value)}
          onBlur={() => config.setOnCommit && handleChange(query.value)}
        />
        <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          {Icon && <Icon class="h-4 w-4 text-neutral-500" />}
          <kbd class="inline-flex items-center rounded border border-neutral-200 px-2 font-sans text-sm font-medium text-neutral-400">
            ⌘K
          </kbd>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
type SearchInput = {
  value: Signal<string>;
  label?: string;
  Icon?: (props: any) => JSXInternal.Element;
  setOnCommit?: boolean;
  debounce?: boolean;
};
