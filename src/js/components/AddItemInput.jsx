import React from 'react';

class AddItemInput extends React.Component {

	render () {
		return (
			<input
				type="text"
				autoFocus="true"
				className={'form-control'}
				placeholder="Type the name of an item"
				value={this.state.name}
				onChange={this.handleChange.bind(this)}
				onKeyDown={this.handleSubmit.bind(this)} />
		);
	}

	constructor (props, context) {
		super(props, context);
		this.state = {
			name: this.props.name || '',
		};
	}

	handleChange (e) {
		this.setState({ name: e.target.value });
	}

	handleSubmit (e) {
		const name = e.target.value.trim();
		if (e.which === 13) {
			this.props.addItem(name);
			this.setState({ name: '' });
		}
	}

}

AddItemInput.propTypes = {
	addItem: React.PropTypes.func.isRequired
};

export default AddItemInput;
