import * as React from 'react';
import Svg, {
  G,
  Path,
  Rect,
  Circle,
  LinearGradient,
  Stop,
  Mask,
} from 'react-native-svg';

export default function PlaybackIcon(props) {
  return (
    <Svg height="150" width="150" viewBox="0 0 150 150">
      <Mask id="play">
        <Circle cx="75" cy="75" r="70" stroke="white" strokeWidth="3" />
        <Path
          d="M120.8,70.7l-65-37.5c-3.3-1.9-7.5,0.5-7.5,4.3v75.1c0,3.8,4.2,6.3,7.5,4.3l65-37.5C124.2,77.4,124.2,72.6,120.8,70.7z"
          stroke="white"
          strokeWidth="3"
        />
      </Mask>

      <Mask id="pause">
        <Circle cx="75" cy="75" r="70" stroke="white" strokeWidth="3" />
        <Path
          d="M63,110H53c-2.8,0-5-2.3-5-5V45c0-2.8,2.2-5,5-5h10c2.8,0,5,2.3,5,5v60C68,107.8,65.8,110,63,110z"
          stroke="white"
          strokeWidth="3"
        />
        <Path
          d="M97,110H87c-2.8,0-5-2.3-5-5V45c0-2.8,2.2-5,5-5h10c2.8,0,5,2.3,5,5v60C102,107.8,99.8,110,97,110z"
          stroke="white"
          strokeWidth="3"
        />
      </Mask>

      <LinearGradient id="gradient" x1="100%" x2="0%" y1="0%" y2="100%">
        <Stop offset="0%" stopColor="hsla(310, 50%, 30%, 1)" />
        <Stop offset="60%" stopColor="hsla(210, 96%, 30%, 1)" />
        <Stop offset="100%" stopColor="hsla(180, 96%, 20%, 1)" />
      </LinearGradient>

      <G mask={props.isActive ? 'url(#pause)' : 'url(#play)'}>
        <Rect width="100%" height="100%" fill="url(#gradient)" />
      </G>
    </Svg>
  );
}
