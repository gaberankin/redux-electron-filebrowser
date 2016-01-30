import React from 'react';

class ListItem extends React.Component {

	render () {
		return (
			<li className={this.props.filterMatch === false ? 'no-match-filter' : ''}>
				<div><span>{this.props.name}</span></div>
				<div>
					<button className={'btn btn-default'} onClick={() => this.props.deleteItem(this.props.id)}>
						{'delete'}
					</button>
				</div>
			</li>
		);
	}

}

ListItem.propTypes = {
	id: React.PropTypes.number.isRequired,
	name: React.PropTypes.string.isRequired,
	filterMatch: React.PropTypes.bool
	// onTrashClick: React.PropTypes.func.isRequired
};

export default ListItem;
