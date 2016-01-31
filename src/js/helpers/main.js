import fs from 'fs';
import path from 'path';
import {app} from 'electron';

const defaultConfig = {
	'path': app.getPath('home'),
	'theme': 'default'
};
let loadedConfig = null;

export function loadconfig() {
	return new Promise(function(resolve, reject){
		if(loadedConfig !== null) {
			resolve(loadedConfig);
			return;
		}
		try {
			fs.readFile(path.join(app.getPath('userData'), 'config.json'), function(err, data) {
				if(err) {
					console.warn('loading default settings due to error on loading config: %o', err);
					loadedConfig = {...defaultConfig};
					resolve(loadedConfig);
					return;
				}
				loadedConfig = JSON.parse(data);
				resolve(loadedConfig);
				return;
			});
		} catch (e) {
			reject(e);
		}
	});
}

export function setconfigval(name, val) {
	loadedConfig[name] = val;
}

export function saveconfig() {
	fs.writeFileSync(path.join(app.getPath('userData'), 'config.json'), JSON.stringify(loadedConfig));
}
