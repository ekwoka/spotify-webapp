import { useEffect, useState } from "preact/hooks";

export const PlayProgress = ({ currentTime, duration, isPlaying }: { currentTime: number; duration: number; isPlaying: boolean }) => {
  const [display, setDisplay] = useState<number>(currentTime);

  useEffect(() => {
    const start = Date.now();
    let cancelled = false;
    const step: FrameRequestCallback = (time) => {
      if (cancelled || !isPlaying) return;
      setDisplay(Math.round(currentTime + (Date.now() - start)));
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
    return () => {
      cancelled = true;
    }
  }, [currentTime, isPlaying]);

  return (<progress min="0" max={duration} value={display} class="w-full h-1 hover:h-3 transition-all player-progress" />)
}
