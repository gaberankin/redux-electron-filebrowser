import React from 'react';
import ListItem from './ListItem';

class List extends React.Component {

	render () {
		return (
			<div className={'items'}>
				<input type="text" placeholder="filter items here" onKeyUp={(e) => this.props.actions.filterItemsAsync(e.target.value)} />
				<ul className={'item'}>
					{
						this.props.items.map((item) => {
							return (<ListItem
								key={item.id}
								id={item.id}
								name={item.name}
								filterMatch={item.filterMatch}
								{...this.props.actions} />);
						})
					}
				</ul>
			</div>
		);
	}

}

List.propTypes = {
	items: React.PropTypes.array.isRequired,
	actions: React.PropTypes.object.isRequired
};

export default List;
