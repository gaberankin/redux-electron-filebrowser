import * as types from '../constants/ActionTypes';
import {remote} from 'electron';

const initialState = {
	path: (() => {
		return remote.app.getPath('home');
	})(),
	folders: [],
	fileSort: { by: 'name', dir: 'asc' },
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
		case types.SORT_FILES:
			if(typeof action.dir === 'undefined' || action.dir == 'toggle') {
				//default behavior is toggle.
				action.dir = state.fileSort.dir == 'asc' ? 'desc' : 'asc';
			} else {
				action.dir = action.dir == 'desc' ? 'desc' : 'asc';	// default should be ascending.
			}
			let comparisonFn = action.dir == 'asc' ? (a, b) => { return a > b ? 1 : -1; } : (a, b) => { return a > b ? -1 : 1; }
			state.files = state.files.sort(function(a, b){
				switch(action.by) {
					case 'mtime':
						return comparisonFn(a.info.mtime, b.info.mtime);
					case 'size':
						return comparisonFn(a.info.size, b.info.size);
					default:
						return comparisonFn(a.name, b.name);
				}
			});
			state.fileSort = {
				by: action.by,
				dir: action.dir
			};
			return {...state};
		default:
			return {...state};
	}
}
