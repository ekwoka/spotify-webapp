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

  const set = (value: T) => {
    storage.setItem(key, JSON.stringify(value));
    setValue(value);
  };

  return [value, set];
};
