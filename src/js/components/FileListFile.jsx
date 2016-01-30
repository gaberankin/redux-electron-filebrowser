import React from 'react';

class FileListFile extends React.Component {

	render () {
		let classNames = ['file'];
		let clickHandler = e => this.props.actions.gotoPath(this.props.file.path);
		if(!this.props.file.readable) {
			classNames.push('unreadable');
			clickHandler = e => this.props.actions.alertError(`file ${this.props.file.path} is not accessible`);
		}

		return (
			<div className={classNames.join(' ')} onClick={clickHandler}>
				<span className={'file-name'}>{this.props.file.name}</span>
			</div>
		);
	}

}

FileListFile.propTypes = {
	file: React.PropTypes.object.isRequired,
	actions: React.PropTypes.object.isRequired
};

export default FileListFile;
