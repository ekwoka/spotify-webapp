import { useSignal } from '@preact/signals';
import { useAsyncEffect } from './useAsyncEffect';

export const useAsyncMemo = <T>(
  fn: () => Promise<T>,
  fallback: T,
  deps: any[],
): T => {
  const state = useSignal<T>(fallback);
  useAsyncEffect(async () => {
    const result = await fn();
    if (!result) return;
    state.value = result;
  }, deps);
  return state.value;
};
