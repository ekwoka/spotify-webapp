import { JSXInternal } from 'preact/src/jsx';
import { useZen } from '../../hooks';

export const Zen = (): JSXInternal.Element => {
  const zen = useZen();
  return <div class="pb-2">{zen}</div>;
};
