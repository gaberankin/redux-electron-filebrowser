import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PathActions from '../actions/PathActions';
import { PathBar, FileList, FolderList } from '../components';

class FileBrowserApp extends React.Component {
	render () {

		const { path: { path, files, folders }, dispatch } = this.props;
		const actions = bindActionCreators(PathActions, dispatch);
		actions.gotoPath(path);
		return (
			<div className="file-browser-app">
				<PathBar path={path} actions={actions} />
				<FileList path={path} files={files} actions={actions} />
				<FolderList path={path} folders={folders} actions={actions} />
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
