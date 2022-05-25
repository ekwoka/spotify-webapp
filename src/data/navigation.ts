import { HomeIcon } from '@heroicons/react/outline';
import { JSXInternal } from 'preact/src/jsx';

export const MAIN_NAVIGATION: NavigationItem[] = [
  {
    name: 'Home',
    path: '/',
    Icon: HomeIcon,
  },
];

type NavigationItem = {
  name: string;
  path: string;
  Icon?: (...props: any[]) => JSXInternal.Element;
};
