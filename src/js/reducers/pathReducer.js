import * as types from '../constants/ActionTypes';
import {remote} from 'electron';

const initialState = {
	path: (() => {
		return remote.app.getPath('home');
	})(),
	folders: [],
	files: []
};


export default function pathReducer(state, action) {
	if(!state) {
		state = {...initialState};
	}
	switch (action.type) {
		case types.GOTO_PATH:
			state.path = action.path;
			state.files = action.files;
			state.folders = action.folders;
			return {...state};
		case types.UPDATE_PATH:
			state.path = action.path;
			return {...state};
		case types.UPDATE_FILES:
			state.files = action.files;
			return {...state};
		case types.UPDATE_FOLDERS:
			state.folders = action.folders;
			return {...state};
		case types.OPEN_FILE:
			return state;	//just return current state, as nothing has really changed.
		default:
			return {...state};
	}
}
