import {
  CogIcon,
  DotsHorizontalIcon,
  HeartIcon,
  HomeIcon,
  InformationCircleIcon,
  MapIcon,
  SearchIcon,
  SparklesIcon,
  UserIcon,
} from '@heroicons/react/outline';
import { JSXInternal } from 'preact/src/jsx';

export const MAIN_NAVIGATION: NavigationItem[] = [
  {
    name: 'Home',
    path: '/',
    Icon: HomeIcon,
  },
  {
    name: 'Profile',
    path: '/profile',
    Icon: UserIcon,
  },
  {
    name: 'Library',
    path: '/library',
    Icon: HeartIcon,
  },
  {
    name: 'Discover',
    path: '/discover',
    Icon: MapIcon,
  },
  {
    name: 'Search',
    path: '/search',
    Icon: SearchIcon,
  },
  {
    name: 'Party Mode',
    path: '/party',
    Icon: SparklesIcon,
  },
];

export const SECONDARY_NAVIGATION: NavigationItem[] = [
  {
    name: 'Settings',
    path: '/',
    Icon: CogIcon,
  },
  {
    name: 'About',
    path: '/',
    Icon: InformationCircleIcon,
  },
];

export const TAB_NAV: NavigationItem[] = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Playlists',
    path: '/playlists',
  },
  {
    name: 'Artists',
    path: '/artists',
  },
  {
    name: 'Albums',
    path: '/albums',
  },
  {
    name: '',
    path: '/more',
    Icon: DotsHorizontalIcon,
  },
];

type NavigationItem = {
  name: string;
  path: string;
  Icon?: (...props: any[]) => JSXInternal.Element;
};
