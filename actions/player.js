import Sound from 'react-native-sound';
import { ExternalDirectoryPath } from 'react-native-fs';

import { PLAY, PAUSE, SET_TRACK } from './types';

let currentSound;

export const play = () => (dispatch, getState) => {
  const { player } = getState();
  if (currentSound && currentSound._filename !== player.track) {
    currentSound.release();
    currentSound = false;
  }
  if (!currentSound) {
    currentSound = new Sound(`${ExternalDirectoryPath}/${player.track}`, '', playCurrentSound);
  } else {    
    playCurrentSound();
  }
  currentSound.play(() => {
    currentSound.release();
  });
  dispatch({
    type: PLAY,
  });
}

export const pause = () => dispatch => {
  currentSound.pause();
  dispatch({
    type: PAUSE,
  });
};

export const setTrackNext = () => (dispatch, getState) => {
  const { tracklist } = getState();
  dispatch(setTrack(generateNextTrack(tracklist)));
}

const setTrack = (track) => ({
  type: SET_TRACK,
  payload: { track },
});

const generateNextTrack = (tracklist) => tracklist[random(tracklist.length - 1)];

const random = (max) => Math.floor((max) * Math.random());

const playCurrentSound = () => {
  currentSound.play(() => {
    currentSound.release();
  });
}
