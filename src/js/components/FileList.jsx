import React from 'react';
import moment from 'moment';

class FileList extends React.Component {

	render () {

		let filesReact = [];

		if(this.props.files.length > 0) {
			for(let x = 0, l = this.props.files.length; x < l; x++) {
				let classNames = 'file';
				let clickHandler = null;
				let date = moment(this.props.files[x].info.mtime);
				if(!this.props.files[x].readable) {
					classNames += ' unreadable';
					clickHandler = e => this.props.actions.alertError(`file ${this.props.files[x].path} is not accessible`);
				} else {
					clickHandler = e => this.props.actions.gotoPath(this.props.files[x].path);
				}

				filesReact.push(
					<tr className={classNames} onClick={clickHandler} key={x}>
						<td className={'file-name'}>{this.props.files[x].name}</td>
						<td>{this.props.files[x].info.size}</td>
						<td>{date.isValid() ? date.format('MMM Do YYYY, h:mm:ss A') : '--'}</td>
						<td></td>
					</tr>
				);
			}
		} else {
			filesReact.push(
				<tr className={'file notice'} key={0}>
					<td colSpan="4">No files found in this directory</td>
				</tr>
			);
		}
		return (
			<div className={'file-list'}>
				<table>
					<colgroup>
						<col className={'colgroup-name'} />
						<col className={'colgroup-size'} />
						<col className={'colgroup-mtime'} />
						<col className={'colgroup-other'} />
					</colgroup>
					<thead>
						<tr className={'file-header file-sortby-' + this.props.fileSort.by + ' file-sortdir-' + this.props.fileSort.dir}>
							<th className={'file-header-name'} onClick={e => this.props.actions.sortFiles('name')} onMouseMove={this.handleMouseMove}>
								Name
								<i className="fa fa-sort-asc"></i><i className="fa fa-sort-desc"></i>
							</th>
							<th className={'file-header-size'} onClick={e => this.props.actions.sortFiles('size')}>
								Size
								<i className="fa fa-sort-asc"></i><i className="fa fa-sort-desc"></i>
							</th>
							<th className={'file-header-mtime'} onClick={e => this.props.actions.sortFiles('mtime')}>
								Last Modified
								<i className="fa fa-sort-asc"></i><i className="fa fa-sort-desc"></i>
							</th>
							<th className={'file-header-other'}> </th>
						</tr>
					</thead>
					<tbody>{filesReact}</tbody>
				</table>
			</div>
		);
	}
	handleMouseMove(e) {
		let rect = e.target.getBoundingClientRect();
		if(e.clientX > rect.right - 5 && e.clientX <= rect.right) {
			e.target.style.cursor = 'ew-resize';
		} else {
			e.target.style.cursor = '';
		}
	}
}

FileList.propTypes = {
	files: React.PropTypes.array.isRequired,
	fileSort: React.PropTypes.object.isRequired,
	actions: React.PropTypes.object.isRequired
};

export default FileList;
