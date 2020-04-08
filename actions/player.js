import Sound from 'react-native-sound';
import { ExternalDirectoryPath } from 'react-native-fs';

import {PLAY, PAUSE} from './types';

let currentSound;

export const play = () => (dispatch, getState) => {

  const { tracklist, player } = getState();
  const track = player.track || generateNextTrack(tracklist);
  if (player.track) {
    playCurrentTrack();
  } else {
    playNewTrack(track);
  }
  dispatch({
    type: PLAY,
    payload: { track },
  });

};

const playNewTrack = (track) => {
  currentSound = new Sound(track, '', playCurrentTrack);
};

const playCurrentTrack = () => {
  currentSound.play(() => {
    currentSound.release();
  });
}

export const pause = () => dispatch => {
  currentSound.pause();
  dispatch({
    type: PAUSE,
  });
};

const generateNextTrack = (tracklist) => {
  return `${ExternalDirectoryPath}/${tracklist[1]}`;
};