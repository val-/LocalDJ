import Sound from 'react-native-sound';
import { ExternalDirectoryPath } from 'react-native-fs';

import {PLAY, PAUSE} from './types';

let currentSound;

export const play = () => (dispatch, getState) => {

  const { tracklist } = getState();
  const track = `${ExternalDirectoryPath}/${tracklist[0]}`;

  if (currentSound) {
    currentSound.play();
  } else {
    currentSound = new Sound(track, '', () => {
      currentSound.play(() => {
        currentSound.release();
      });
    });
  }

  dispatch({
    type: PLAY,
  });
};

export const pause = () => dispatch => {
  currentSound.pause();
  dispatch({
    type: PAUSE,
  });
};
