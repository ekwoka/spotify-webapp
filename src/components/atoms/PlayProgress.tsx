import { useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';

export const PlayProgress = ({
  currentTime,
  duration,
  isPlaying,
}: {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
}) => {
  const display = useSignal<number>(currentTime);

  useEffect(() => {
    let start: number | null = null;
    let cancelled = false;
    // eslint-disable-next-line no-undef
    const step: FrameRequestCallback = (time) => {
      if (!start) start = time;
      if (cancelled || !isPlaying) return;
      display.value = Math.round(currentTime + (time - start));
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    return () => {
      cancelled = true;
    };
  }, [currentTime, isPlaying, display]);

  return (
    <progress
      min="0"
      max={duration}
      value={display}
      class="player-progress h-1 w-full transition-all hover:h-3"
    />
  );
};
