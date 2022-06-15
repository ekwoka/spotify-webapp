import { useState } from 'preact/hooks';
import { useAsyncEffect } from './useAsyncEffect';

export const useAsyncMemo = <T>(
  fn: () => Promise<T>,
  fallback: T,
  deps: any[]
): T => {
  const [state, setState] = useState<T>(fallback);
  useAsyncEffect(async () => {
    const result = await fn();
    setState(result);
  }, deps);
  return state;
};
