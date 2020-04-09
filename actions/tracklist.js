import RNFetchBlob from 'rn-fetch-blob';
import { ExternalDirectoryPath } from 'react-native-fs';

import { ADD_TRACKS } from './types';

export const addTracks = (tracks) => ({
    type: ADD_TRACKS,
    payload: tracks
});

export const rescanFiles = (cb) => dispatch => {
    RNFetchBlob.fs.ls(ExternalDirectoryPath).then((files) => {
        dispatch(addTracks(files));
        cb();
    });
};