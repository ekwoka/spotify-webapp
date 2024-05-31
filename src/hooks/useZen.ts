import { useAsyncMemo } from './useAsyncMemo';

export const useZen = (): string => {
  return useAsyncMemo(
    async () => {
      const response = await fetch('https://api.github.com/zen');
      return response.text();
    },
    'None',
    [],
  );
};
