import Sound from 'react-native-sound';
import { ExternalDirectoryPath } from 'react-native-fs';

import {
  PLAY,
  PAUSE,
  SET_TRACK,
  ROLLBACK_TRACK,
  ROLLFORWARD_TRACK
} from './types';

let currentSound;

export const play = () => (dispatch, getState) => {
  const { player } = getState();
  const presentTrackFilename = `${ExternalDirectoryPath}/${player.track.present}`;
  if (currentSound && currentSound._filename !== presentTrackFilename) {
    currentSound.release();
    currentSound = false;
  }
  if (!currentSound) {
    currentSound = new Sound(presentTrackFilename, '', playCurrentSound);
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
  const { player, tracklist } = getState();
  if (player.track.future.length) {
    dispatch({
      type: ROLLFORWARD_TRACK
    });
  } else {
    dispatch(setTrack(generateNextTrack(tracklist)));
  }
}

export const setTrackPrev = () => (dispatch, getState) => {
  // TODO handle goto start track
  dispatch({
    type: ROLLBACK_TRACK,  
  });
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
