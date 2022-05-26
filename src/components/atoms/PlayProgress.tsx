import { useEffect, useState } from 'preact/hooks';

export const PlayProgress = ({
  currentTime,
  duration,
  isPlaying,
}: {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
}) => {
  const [display, setDisplay] = useState<number>(currentTime);

  useEffect(() => {
    const start = Date.now();
    let cancelled = false;
    // eslint-disable-next-line no-undef
    const step: FrameRequestCallback = (time) => {
      if (cancelled || !isPlaying) return;
      setDisplay(Math.round(currentTime + (time - start)));
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    return () => {
      cancelled = true;
    };
  }, [currentTime, isPlaying]);

  return (
    <progress
      min="0"
      max={duration}
      value={display}
      class="player-progress h-1 w-full transition-all hover:h-3"
    />
  );
};
