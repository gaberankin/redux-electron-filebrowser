import React from 'react';
import FolderListFolder from './FolderListFolder';

class FolderList extends React.Component {

	render () {

		let foldersReact = [];

		for(let x = 0, l = this.props.folders.length; x < l; x++) {
			foldersReact.push(<FolderListFolder actions={this.props.actions} folder={this.props.folders[x]} key={x}></FolderListFolder>);
		}
		return (
			<div className={'folder-list'}>
				{foldersReact}
			</div>
		);
	}

}

FolderList.propTypes = {
	folders: React.PropTypes.array.isRequired,
	actions: React.PropTypes.object.isRequired
};

export default FolderList;
