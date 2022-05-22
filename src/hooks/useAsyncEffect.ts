import { useEffect } from 'preact/hooks';

export const useAsyncEffect = (effect: () => Promise<void>, deps: any[]) => {
  useEffect(() => {
    effect();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};
