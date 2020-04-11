import * as React from 'react';
import Svg, {
  G,
  Path,
  Rect,
  Line,
  LinearGradient,
  Stop,
  Mask,
} from 'react-native-svg';

export default function TrashIcon(props) {
  return (
    <Svg height="50" width="50" viewBox="0 0 100 100">

      <Mask id="trash">
        <G>
	        <Path stroke="white" strokeWidth="3" d="M63,95H37c-6.6,0-12-5.4-12-12V25h50l0,0v58C75,89.6,69.6,95,63,95z"/>
	        <Line stroke="white" strokeWidth="3" x1="50" y1="35" x2="50" y2="85"/>
	        <Line stroke="white" strokeWidth="3" x1="36" y1="35" x2="36" y2="85"/>
	        <Line stroke="white" strokeWidth="3" x1="64" y1="35" x2="64" y2="85"/>
        </G>
        <G>
          <Path stroke="white" strokeWidth="3" d="M78,25H22c-1.1,0-2-0.9-2-2v-1c0-1.1,0.9-2,2-2h56c1.1,0,2,0.9,2,2v1C80,24.1,79.1,25,78,25z"/>
          <Path stroke="white" strokeWidth="3" d="M42.5,19v-1c0-1.1,0.9-2,2-2h11c1.1,0,2,0.9,2,2v1"/>
        </G>
      </Mask>

      <LinearGradient id="gradient" x1="100%" x2="0%" y1="0%" y2="100%">
        <Stop offset="0%" stopColor="hsla(310, 50%, 30%, 1)" />
        <Stop offset="60%" stopColor="hsla(210, 96%, 30%, 1)" />
        <Stop offset="100%" stopColor="hsla(180, 96%, 20%, 1)" />
      </LinearGradient>

      <G mask="url(#trash)">
        <Rect width="100%" height="100%" fill="url(#gradient)" />
      </G>
    </Svg>
  );
}
