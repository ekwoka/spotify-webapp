import autoAnimate, { AutoAnimateOptions } from '@formkit/auto-animate';
import { useEffect, useRef } from 'preact/hooks';

export const useAutoAnimate = <T extends HTMLElement>(
  options: Partial<AutoAnimateOptions> = {}
) => {
  const animate = useRef<T>(null);
  const hooked = useRef(false);
  useEffect(() => {
    if (hooked.current) return;
    if (!animate.current) return;
    autoAnimate(animate.current, { ...defaultAnimationOptions, ...options });
    hooked.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate.current]);
  return animate;
};

const defaultAnimationOptions: Partial<AutoAnimateOptions> = {
  duration: 400,
};
