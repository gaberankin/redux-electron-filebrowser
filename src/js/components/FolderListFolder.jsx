import React from 'react';

class FolderListFolder extends React.Component {

	render () {
		let classNames = ['folder'];
		let clickHandler = e => this.props.actions.gotoPath(this.props.folder.path);
		if(!this.props.folder.readable) {
			classNames.push('unreadable');
			clickHandler = e => this.props.actions.alertError(`${this.props.folder.path} is not accessible`);
		}
		return (
			<a href="#" className={classNames.join(' ')} onClick={clickHandler}>
				<i className="fa fa-folder"></i> <span className={'folder-name'}>{this.props.folder.name}</span>
			</a>
		);
	}

}

FolderListFolder.propTypes = {
	folder: React.PropTypes.object.isRequired,
	actions: React.PropTypes.object.isRequired
};

export default FolderListFolder;
