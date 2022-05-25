import { useMemo, useState } from 'preact/hooks';
import { usePlayer } from '../../hooks';
import { BlurredBackground } from '../atoms/BlurredBackground';
import { MainSection } from '../layout/MainSection';
import { DeskTopSideBar, MobileSideBar } from '../organisms/navigation';

export const Main = () => {
  const [sideBarIsOpen, setSideBarIsOpen] = useState<boolean>(false);
  const [_, __, playerState] = usePlayer();

  const bgImage = useMemo(() => {
    if (!playerState?.track_window?.current_track?.album?.images[0])
      return null;
    const images = playerState.track_window.current_track.album.images;
    return images.reduce((largest, image) =>
      image.width > largest.width ? image : largest
    );
  }, [playerState]);

  return (
    <div>
      <BlurredBackground src={bgImage?.url} />
      <MobileSideBar isOpen={sideBarIsOpen} setIsOpen={setSideBarIsOpen} />
      <DeskTopSideBar />
      <MainSection />
    </div>
  );
};
