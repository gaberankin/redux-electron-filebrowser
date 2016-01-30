import * as types from '../constants/ActionTypes';

export function addItem(name) {
	return {
		type: types.ADD_ITEM,
		name
	};
}

export function deleteItem(id) {
	return {
		type: types.DELETE_ITEM,
		id
	};
}

export function filterItems(filter) {
	return {
		type: types.FILTER_ITEMS,
		filter
	};
}

let filterItemsTimeout = null;
export function filterItemsAsync(filter) {
	return (dispatch) => {
		clearTimeout(filterItemsTimeout);
		filterItemsTimeout = setTimeout(() => {
			dispatch(filterItems(filter));
		}, 300);
	};
}
