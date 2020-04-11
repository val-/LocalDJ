import RNFetchBlob from 'rn-fetch-blob';
import { ExternalDirectoryPath } from 'react-native-fs';

import { ADD_TRACKS, REMOVE_TRACK } from './types';
import { hasInList } from '../utils';

export const addTracks = (tracks) => ({
    type: ADD_TRACKS,
    payload: { tracks }
});

export const rescanFiles = (cb) => (dispatch, getState) => {
    const { tracklist } = getState();
    RNFetchBlob.fs.ls(ExternalDirectoryPath).then((files) => {
        dispatch(addTracks(files.filter(fileName => !hasInList(tracklist, fileName))));
        cb();
    });
};

export const remove = (track, cb) => dispatch => {
    const presentTrackFilename = `${ExternalDirectoryPath}/${track}`;
    RNFetchBlob.fs.unlink(presentTrackFilename).then(() => {
        dispatch({
            type: REMOVE_TRACK,
            payload: { track }
        });
        cb();
    });
};
    