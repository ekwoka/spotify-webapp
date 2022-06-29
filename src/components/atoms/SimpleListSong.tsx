import { JSXInternal } from 'preact/src/jsx';
import { SpotifyWebPlaybackTrack } from 'spotify-web-playback';

export const SimpleListSong = (
  props: SpotifyWebPlaybackTrack
): JSXInternal.Element => <h3>{props.name}</h3>;
