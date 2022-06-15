import { Link } from 'preact-router';
import { JSXInternal } from 'preact/src/jsx';
import {
  MAIN_NAVIGATION,
  SECONDARY_NAVIGATION,
} from '../../../data/navigation';
import { SpotifyLogo } from '../../atoms/icons';

export const DeskTopSideBar = (): JSXInternal.Element => (
  <div class="z-10 hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
    <div class="flex flex-grow flex-col overflow-y-auto px-2 pt-8">
      <div class="flex flex-shrink-0 items-center px-4">
        <SpotifyLogo class="max-h-8 w-full text-neutral-200" />
      </div>
      <div class="mt-5 flex flex-1 flex-col justify-between pb-32">
        <nav class="space-y-2 px-2">
          {MAIN_NAVIGATION.map((navItem) => (
            <Link
              key={navItem.path}
              href={navItem.path}
              activeClassName="!text-lime-700 !hover:bg-transparent"
              class="group flex items-center rounded-md px-4 py-2 text-base font-medium text-neutral-200 transition-colors hover:bg-lime-700/40">
              {navItem.Icon && (
                <navItem.Icon class="mr-3 h-6 w-6 flex-shrink-0 text-lime-300" />
              )}
              {navItem.name}
            </Link>
          ))}
        </nav>
        <nav class="space-y-1 px-2">
          {SECONDARY_NAVIGATION.map((navItem) => (
            <Link
              key={navItem.path}
              href={navItem.path}
              class="group flex items-center rounded-md px-2 py-2 text-base font-medium text-neutral-200 hover:bg-lime-800">
              {navItem.Icon && (
                <navItem.Icon class="mr-3 h-6 w-6 flex-shrink-0 text-lime-300" />
              )}
              {navItem.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  </div>
);
