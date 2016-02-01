import * as types from '../constants/ActionTypes';
import * as helpers from '../helpers';
import fs from 'fs';
import PathUtils from 'path';
import {remote} from 'electron';

let applicationInitialized = false;

export function initApplication() {
	if(applicationInitialized) {	//do not re-initialize the application a second time.  this function should only be called once.
		return dispatch => {};
	}
	return dispatch => {
		remote.app.helpers.loadconfig().then(
			(conf) => {
				dispatch(gotoPath(conf.path));
			},
			(e) => {
				dispatch(alertError(e));
			}
		);
	};
}

export function updatePath(path) {
	remote.app.helpers.setconfigval('path', path);
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

export function sortFiles(by, dir = 'toggle') {
	return {
		type: types.SORT_FILES,
		by,
		dir
	};
}

export function gotoPath(path) {
	return dispatch => {
		helpers.readdir(path).then(function(info) {
			remote.app.helpers.setconfigval('path', info.path);
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
