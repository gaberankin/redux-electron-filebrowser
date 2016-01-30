import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ListActions from '../actions/ListActions';
import { List, AddItemInput } from '../components';

class ListApp extends React.Component {
	render () {
		const { items: { items }, dispatch } = this.props;
		const actions = bindActionCreators(ListActions, dispatch);

		return (
			<div>
				<h1>List</h1>
				<AddItemInput addItem={actions.addItem} />
				<List items={items} actions={actions} />
			</div>
		);
	}
}
ListApp.propTypes = {
	items: React.PropTypes.object.isRequired
};

const select = function(state) {
	return { items: state.items };
};

export default connect(select)(ListApp);
