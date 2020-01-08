import * as React from 'react';
import Svg, {G, Path, Rect, LinearGradient, Stop, Mask} from 'react-native-svg';

export default function NextIcon() {
  return (
    <Svg height="50" width="50" viewBox="0 0 50 50">
      <Mask id="mask">
        <Path
            d="M17.1,14.8c1.1,0,2,0.9,2,2v4.5c0,1.3,1.4,1.8,2.3,1.3L34.4,15c1-0.6,2.3,0.1,2.3,1.3v17.3c0,1.2-1.3,1.9-2.3,1.3 l-13.1-7.5c-0.8-0.5-2.2,0-2.2,1.3v4.5c0,1.1-0.9,2-2,2s-2-0.9-2-2V16.8C15.1,15.7,16,14.8,17.1,14.8z"
            fill="white"
        />
      </Mask>
      <LinearGradient id="gradient" x1="100%" x2="0%" y1="0%" y2="100%">
        <Stop offset="-40%" stopColor="hsla(310, 50%, 30%, 1)" />
        <Stop offset="20%" stopColor="hsla(210, 96%, 30%, 1)" />
        <Stop offset="60%" stopColor="hsla(180, 96%, 20%, 1)" />
      </LinearGradient>
      <G mask="url(#mask)">
        <Rect width="100%" height="100%" fill="url(#gradient)" />
      </G>
    </Svg>
  );
}
