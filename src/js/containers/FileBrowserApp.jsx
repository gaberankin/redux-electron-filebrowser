import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PathActions from '../actions/PathActions';
import { PathBar, FileList, FolderList } from '../components';

class FileBrowserApp extends React.Component {
	constructor(props) {
		super(props);
		const { dispatch } = this.props;
		this.actions = bindActionCreators(PathActions, dispatch);
		this.actions.initApplication();
	}
	render () {
		const { path: { path, files, folders }, dispatch } = this.props;
		// const actions = bindActionCreators(PathActions, dispatch);

		return (
			<div className="file-browser-app">
				<PathBar path={path} actions={this.actions} />
				<FileList path={path} files={files} actions={this.actions} />
				<FolderList path={path} folders={folders} actions={this.actions} />
			</div>
		);
	}
}
FileBrowserApp.propTypes = {
	path: React.PropTypes.object.isRequired
};

const select = function(state) {
	return { path: state.pathReducer };
};

export default connect(select)(FileBrowserApp);
