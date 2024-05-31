import {
  CogOutline,
  EllipsisHorizontalOutline,
  HeartOutline,
  HomeOutline,
  InformationCircleOutline,
  MapOutline,
  MagnifyingGlassOutline,
  SparklesOutline,
  UserOutline,
  HeroIcon,
} from 'preact-heroicons';

export const MAIN_NAVIGATION: NavigationItem[] = [
  {
    name: 'Home',
    path: '/',
    Icon: HomeOutline,
  },
  {
    name: 'Profile',
    path: '/profile',
    Icon: UserOutline,
  },
  {
    name: 'Library',
    path: '/library',
    Icon: HeartOutline,
  },
  {
    name: 'Discover',
    path: '/discover',
    Icon: MapOutline,
  },
  {
    name: 'Search',
    path: '/search',
    Icon: MagnifyingGlassOutline,
  },
  {
    name: 'Party Mode',
    path: '/party',
    Icon: SparklesOutline,
  },
];

export const SECONDARY_NAVIGATION: NavigationItem[] = [
  {
    name: 'Settings',
    path: '/#settings',
    Icon: CogOutline,
  },
  {
    name: 'About',
    path: '/#about',
    Icon: InformationCircleOutline,
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
    Icon: EllipsisHorizontalOutline,
  },
];

type NavigationItem = {
  name: string;
  path: string;
  Icon?: HeroIcon;
};

export const navigation = {
  MAIN_NAVIGATION,
  SECONDARY_NAVIGATION,
  TAB_NAV,
};
