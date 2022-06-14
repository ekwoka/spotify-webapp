import {
  CogIcon,
  DotsHorizontalIcon,
  HeartIcon,
  HomeIcon,
  InformationCircleIcon,
  MapIcon,
  SearchIcon,
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
    path: '/',
    Icon: UserIcon,
  },
  {
    name: 'Library',
    path: '/',
    Icon: HeartIcon,
  },
  {
    name: 'Discover',
    path: '/',
    Icon: MapIcon,
  },
  {
    name: 'Search',
    path: '/',
    Icon: SearchIcon,
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
    path: '/',
  },
  {
    name: 'Artists',
    path: '/',
  },
  {
    name: 'Albums',
    path: '/',
  },
  {
    name: '',
    path: '/',
    Icon: DotsHorizontalIcon,
  },
];

type NavigationItem = {
  name: string;
  path: string;
  Icon?: (...props: any[]) => JSXInternal.Element;
};
