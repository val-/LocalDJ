import RNFetchBlob from 'rn-fetch-blob';
import { ExternalDirectoryPath } from 'react-native-fs';

import { ADD_TRACKS, REMOVE_TRACK } from './types';

export const addTracks = (tracks) => ({
    type: ADD_TRACKS,
    payload: { tracks }
});

export const rescanFiles = (cb) => dispatch => {    
    RNFetchBlob.fs.ls(ExternalDirectoryPath).then((files) => {
        dispatch(addTracks(files));
        cb();
    });
};

export const remove = (cb) => (dispatch, getState) => {    
    const { player } = getState();
    const presentTrackFilename = `${ExternalDirectoryPath}/${player.track.present}`;
    RNFetchBlob.fs.unlink(presentTrackFilename).then(() => {
        dispatch({
            type: REMOVE_TRACK,
            payload: { track: player.track.present }
        });
        cb();
    });
};
    