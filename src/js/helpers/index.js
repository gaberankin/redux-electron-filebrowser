import fs from 'fs';
import path from 'path';
import {remote} from 'electron';

export function readdir(dirPath) {
	return new Promise(function(resolve, reject){
		fs.readdir(dirPath, function(err, dirListing){
			//check if there's an error with reading this directory.
			if(err) {
				reject(err);
				return;
			}
			//set up the parent directory, as this will be part of the folder listing
			let parentDirPath = path.resolve(dirPath, '..');
			let foldersInit = [];
			if(parentDirPath != dirPath) {
				let accessOk = true;
				try {
					fs.accessSync(parentDirPath, fs.R_OK);	//throws if there's a problem with access rights at the parent directory.
				} catch (e) {
					accessOk = false;
				}
				foldersInit.push({ name: '..', path: parentDirPath, info: fs.statSync(parentDirPath), readable: accessOk});
			}
			let { files, folders } = dirListing.reduce(function(prev, current){
				try {
					let fullPath = path.join(dirPath, current);
					let fileStats = fs.statSync(fullPath);
					let accessOk = true;
					try {
						fs.accessSync(fullPath, fs.R_OK);
					} catch (e) {
						accessOk = false;
					}
					let info = { name: current, path: fullPath, info: fileStats, readable: accessOk};
					if(fileStats.isDirectory()) {
						prev.folders.push(info);
					} else {
						prev.files.push(info);
					}
				} catch(e) {
					console.error(e);
				}
				return prev;
			}, { files: [], folders: foldersInit});

			resolve({path: dirPath, files, folders});
			return;
		});

	});
}
