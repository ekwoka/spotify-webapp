import { useEffect } from 'preact/hooks';

export const useAsyncEffect = (effect: () => Promise<void|(()=>void)>, deps: any[]) => {
  useEffect(() => {
    const cleanup = effect();
    return async () => {
      const cleanupFn = await cleanup;
      if (typeof cleanupFn === 'function') cleanupFn();
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
};
