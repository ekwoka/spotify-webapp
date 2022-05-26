import { useCallback } from 'preact/hooks';
import { useGlobalState } from './useGlobalState';

export const useStorage = <T>(
  key: string,
  initialValue: T,
  storage: Storage = localStorage
): [T, (value: T) => void] => {
  const [value, setValue] = useGlobalState<T>(
    key,
    storage.getItem(key)
      ? JSON.parse(storage.getItem(key) as string)
      : initialValue
  );

  const set = useCallback(
    (value: T) => {
      storage.setItem(key, JSON.stringify(value));
      setValue(value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key, storage]
  );

  return [value, set];
};
