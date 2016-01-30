import React, { Component } from 'react';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import FileBrowserApp from './FileBrowserApp';
import * as reducers from '../reducers';

const createStoreWithMiddleWare = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleWare(reducer);

export default class App extends Component {
	render() {
		return (
			<div>
				<Provider store={store}>
					<FileBrowserApp />
				</Provider>
			</div>
		);
	}
}
