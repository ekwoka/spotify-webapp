import { Link } from 'preact-router';
import { JSXInternal } from 'preact/src/jsx';
import { MAIN_NAVIGATION } from '../../../data/navigation';
import { SpotifyLogo } from '../../atoms/icons';

export const DeskTopSideBar = (): JSXInternal.Element => (
  <div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
    <div class="flex flex-grow flex-col overflow-y-auto bg-emerald-700 pt-5">
      <div class="flex flex-shrink-0 items-center px-4">
        <SpotifyLogo class="max-h-8 w-full text-white" />
      </div>
      <div class="mt-5 flex flex-1 flex-col">
        <nav class="flex-1 space-y-1 px-2 pb-4">
          {MAIN_NAVIGATION.map((navItem) => (
            <Link
              key={navItem.path}
              href={navItem.path}
              class="group flex items-center rounded-md bg-emerald-800 px-2 py-2 text-base font-medium text-white">
              {navItem.Icon && (
                <navItem.Icon class="mr-3 h-6 w-6 flex-shrink-0 text-emerald-300" />
              )}
              {navItem.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  </div>
);
