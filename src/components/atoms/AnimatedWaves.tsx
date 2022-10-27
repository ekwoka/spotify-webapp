import { useSignal } from '@preact/signals';
import { useEffect, useMemo } from 'preact/hooks';
import { JSXInternal } from 'preact/src/jsx';

export const AnimatedWaves = ({
  layers,
}: {
  layers: number;
}): JSXInternal.Element => {
  const waves = useSignal<number>(layers);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    if (mediaQuery.matches) waves.value = 1;
    else waves.value = layers;
    const handleResize = ({ matches }: { matches: boolean }) =>
      (waves.value = matches ? 1 : layers);
    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, [layers, waves]);

  return useMemo(
    () => (
      <div class="absolute inset-0 flex flex-col justify-end">
        <svg>
          <defs>
            <filter id="glow">
              <feGaussianBlur
                class="blur"
                result="coloredBlur"
                stdDeviation="4"
              />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
        {Array.from({ length: waves.value }, (_, i): JSXInternal.Element => {
          const steps = Array.from(
            { length: 3 },
            () => waveStrings[Math.floor(Math.random() * waveStrings.length)]
          );
          steps.push(steps[0]);
          return (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              class="absolute bottom-0 stroke-green-200 text-green-600"
              style={{
                height: `${320 + (waves.value - i - 1) * 100}px`,
              }}
              key={i}>
              <path
                fill="currentColor"
                id={`wave-path-${i}`}
                style={{
                  filter: 'url(#glow)',
                  opacity: '0.5',
                }}>
                <animate
                  attributeName="d"
                  dur="60s"
                  repeatCount="indefinite"
                  values={steps.join(';')}
                />
              </path>
            </svg>
          );
        })}
      </div>
    ),
    [waves.value]
  );
};

const waveStrings: string[] = [
  'M0,96L26.7,96C53.3,96,107,96,160,96C213.3,96,267,96,320,90.7C373.3,85,427,75,480,80C533.3,85,587,107,640,138.7C693.3,171,747,213,800,224C853.3,235,907,213,960,170.7C1013.3,128,1067,64,1120,69.3C1173.3,75,1227,149,1280,181.3C1333.3,213,1387,203,1413,197.3L1440,192L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z',
  'M0,128L26.7,160C53.3,192,107,256,160,250.7C213.3,245,267,171,320,144C373.3,117,427,139,480,149.3C533.3,160,587,160,640,176C693.3,192,747,224,800,234.7C853.3,245,907,235,960,192C1013.3,149,1067,75,1120,80C1173.3,85,1227,171,1280,208C1333.3,245,1387,235,1413,229.3L1440,224L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z',
  'M0,64L26.7,85.3C53.3,107,107,149,160,144C213.3,139,267,85,320,58.7C373.3,32,427,32,480,58.7C533.3,85,587,139,640,165.3C693.3,192,747,192,800,202.7C853.3,213,907,235,960,234.7C1013.3,235,1067,213,1120,181.3C1173.3,149,1227,107,1280,112C1333.3,117,1387,171,1413,197.3L1440,224L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z',
  'M0,128L26.7,117.3C53.3,107,107,85,160,74.7C213.3,64,267,64,320,80C373.3,96,427,128,480,154.7C533.3,181,587,203,640,213.3C693.3,224,747,224,800,213.3C853.3,203,907,181,960,144C1013.3,107,1067,53,1120,32C1173.3,11,1227,21,1280,21.3C1333.3,21,1387,11,1413,5.3L1440,0L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z',
];
