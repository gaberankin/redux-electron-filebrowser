import React from 'react';
import { sep as pathSeperator, resolve as pathResolve } from 'path';
import {remote} from 'electron';

const ltrimRegex = new RegExp((pathSeperator === '\\' ? '\\\\' : pathSeperator) + "+$"); //thanks windows...
const ltrimSeperator = function(string) {
	return string.replace(ltrimRegex, '');
};
const HOMEDIR = ltrimSeperator(remote.app.getPath('home'));


class PathBar extends React.Component {

	render () {

		let pathComponents = ltrimSeperator(this.props.path).split(pathSeperator),
			pathReact = [],
			pathOperations = [],
			fullPath = '';

		for(let x = 0, k = 0, l = pathComponents.length; x < l; x++) {
			fullPath += pathComponents[x] + pathSeperator;
			let clickEvent = this.props.actions.gotoPath.bind(undefined, fullPath);
			if(x > 0) {
				pathReact.push(<span key={k++} className={'path-seperator'}></span>);
			}
			pathReact.push(
				<button type='button' className="path-component" key={k++} onClick={(e) => clickEvent()}>
					<span className="path-dirname">{pathComponents[x] ? pathComponents[x] : "\u00a0"}</span>
				</button>
			);
		}

		pathOperations.push(<button type='button' key="home" className="go-home" disabled={HOMEDIR == ltrimSeperator(this.props.path)} onClick={e => this.props.actions.gotoPath(HOMEDIR)}><i className="fa fa-home"></i></button>);
		pathOperations.push(<button type='button' key="up" className="go-up" disabled={pathComponents.length <= 1} onClick={e => this.props.actions.gotoPath(pathResolve(this.props.path, '..'))}><i className="fa fa-level-up"></i></button>);

		return (
			<div className={'path-bar'}>
				<div className={'path-operations'}>{pathOperations}</div>
				<div className={'path-components'}>{pathReact}</div>
			</div>
		);
	}

}

PathBar.propTypes = {
	path: React.PropTypes.string.isRequired,
	actions: React.PropTypes.object.isRequired
};

export default PathBar;
