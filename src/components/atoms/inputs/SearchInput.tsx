import {
  StateUpdater,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';
import { debounce } from '../../../utils/debounce';
import { hotkeys } from '../../../utils/preact-hotkeys/hotkeys';

export const SearchInput = ({
  value,
  label,
  Icon,
  setter,
  ...config
}: SearchInput): JSXInternal.Element => {
  const [query, setQuery] = useState<string>(value);
  const focus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const action = (): void => {
      focus.current?.focus();
    };
    return hotkeys({
      'cmd+k': action,
      'ctrl+k': action,
    });
  }, []);

  const handleChange = useMemo(
    () =>
      config.debounce === false
        ? setter
        : debounce((value: string): void => {
            setter(value);
          }),
    [config.debounce, setter]
  );

  useEffect(() => {
    if (!config.setOnCommit) handleChange(query);
  }, [query, config.setOnCommit, handleChange]);

  return (
    <div>
      {label && (
        <label htmlFor="search" class="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div class="relative mt-1 flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          ref={focus}
          class="block w-full rounded-md border-gray-300 pr-12 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          value={query}
          onChange={({ target }): void =>
            setQuery((target as HTMLInputElement).value)
          }
          onBlur={(): void => {
            if (config.setOnCommit) handleChange(query);
          }}
        />
        <div class="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          {Icon && <Icon class="h-4 w-4 text-gray-500" />}
          <kbd class="inline-flex items-center rounded border border-gray-200 px-2 font-sans text-sm font-medium text-gray-400">
            ⌘K
          </kbd>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
type SearchInput = {
  value: string;
  label?: string;
  Icon?: (props: any) => JSXInternal.Element;
  setter: StateUpdater<string>;
  setOnCommit?: boolean;
  debounce?: boolean;
};
