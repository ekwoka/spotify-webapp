import { JSXInternal } from 'preact/src/jsx';
import { Track } from '@ekwoka/spotify-api/dist/endpoints/tracks';
import { SimpleFlexGrid } from '../../components/molecules/SimpleFlexGrid';
import { SimpleGridItem } from '../../components/atoms/SimpleGridItem';
import { TrackList } from '../../components/organisms/TrackList';

export const Home = (): JSXInternal.Element => {
  return (
    <div class="flex flex-col gap-8">
      <div class="flex flex-col gap-4">
        <h2>Most Listened Tracks</h2>
        <TrackList type="topTracks" limit={10}>
          <SimpleFlexGrid
            as={(item) => (
              <SimpleGridItem key={item.id} {...item} class="w-52" />
            )}
            items={[] as Track[]}
            minHeight={52}
          />
        </TrackList>
      </div>
      <div class="flex flex-col gap-4">
        <h2>Recently Played tracks</h2>
        <TrackList type="recentlyPlayed" limit={10}>
          <SimpleFlexGrid
            as={(item) => (
              <SimpleGridItem key={item.id} {...item} class="w-52" />
            )}
            items={[] as Track[]}
            minHeight={52}
          />
        </TrackList>
      </div>
    </div>
  );
};
