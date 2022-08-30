import { CogOutline } from '@graywolfai/react-heroicons/dist/outline/cog-outline';
import { EllipsisHorizontalOutline } from '@graywolfai/react-heroicons/dist/outline/ellipsis-horizontal-outline';
import { HeartOutline } from '@graywolfai/react-heroicons/dist/outline/heart-outline';
import { HomeOutline } from '@graywolfai/react-heroicons/dist/outline/home-outline';
import { InformationCircleOutline } from '@graywolfai/react-heroicons/dist/outline/information-circle-outline';
import { MapOutline } from '@graywolfai/react-heroicons/dist/outline/map-outline';
import { MagnifyingGlassOutline } from '@graywolfai/react-heroicons/dist/outline/magnifying-glass-outline';
import { SparklesOutline } from '@graywolfai/react-heroicons/dist/outline/sparkles-outline';
import { UserOutline } from '@graywolfai/react-heroicons/dist/outline/user-outline';

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
    path: '/',
    Icon: CogOutline,
  },
  {
    name: 'About',
    path: '/',
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
  Icon?: typeof HomeOutline;
};
