import { JSXInternal } from 'preact/src/jsx';
import { TrackObject } from '../../hooks';
import { SimpleFlexGrid } from '../../components/molecules/SimpleFlexGrid';
import { SimpleGridItem } from '../../components/atoms/SimpleGridItem';
import { TrackList } from '../../components/organisms/TrackList';

export const Home = (): JSXInternal.Element => {
  return (
    <div class="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2>Most Listened Tracks</h2>
        <TrackList type="getMyTopTracks" limit={10}>
          <SimpleFlexGrid
            as={(item) => <SimpleGridItem key={item.id} {...item} />}
            items={[] as TrackObject[]}
            minHeight={52}
          />
        </TrackList>
      </div>
      <div className="flex flex-col gap-4">
        <h2>Recently Played tracks</h2>
        <TrackList type="getMyRecentlyPlayedTracks" limit={10}>
          <SimpleFlexGrid
            as={(item) => <SimpleGridItem key={item.id} {...item} />}
            items={[] as TrackObject[]}
            minHeight={52}
          />
        </TrackList>
      </div>
    </div>
  );
};
