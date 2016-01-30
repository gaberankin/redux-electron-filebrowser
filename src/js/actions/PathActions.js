import * as types from '../constants/ActionTypes';
import * as helpers from '../helpers';
import fs from 'fs';
import PathUtils from 'path';

export function updatePath(path) {
	return {
		type: types.UPDATE_PATH,
		path
	};
}

export function updateFiles(files) {
	return {
		type: types.UPDATE_FILES,
		files
	};

}

export function updateFolders(folders) {
	return {
		type: types.UPDATE_FOLDERS,
		folders
	};
}

export function alertError(text) {
	return {
		type: types.ALERT_ERROR,
		text
	};
}

export function gotoPath(path) {
	return dispatch => {
		helpers.readdir(path).then(function(info) {
			dispatch({
				type: types.GOTO_PATH,
				...info
			});
		}, (error) => dispatch(alertError(error)));
	};
}

export function openFile(filepath) {
	return {
		type: types.OPEN_FILE,
		filepath
	};
}
