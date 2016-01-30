import React from 'react';
import FileListFile from './FileListFile';

class FileList extends React.Component {

	render () {

		let filesReact = [];

		for(let x = 0, l = this.props.files.length; x < l; x++) {
			filesReact.push(<FileListFile actions={this.props.actions} file={this.props.files[x]} key={x}></FileListFile>);
		}
		return (
			<div className={'file-list'}>
				{filesReact}
			</div>
		);
	}

}

FileList.propTypes = {
	files: React.PropTypes.array.isRequired,
	actions: React.PropTypes.object.isRequired
};

export default FileList;
