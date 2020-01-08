import Sound from 'react-native-sound';

import {PLAY, PAUSE} from './types';

let currentSound;

export const play = () => dispatch => {
  if (currentSound) {
    currentSound.play();
  } else {
    currentSound = new Sound(require('../test.mp3'), (error, sound) => {
      currentSound.play(() => {
        sound.release();
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
