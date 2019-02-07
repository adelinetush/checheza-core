#!/usr/bin/env node
'use strict'
const fs = require('fs');
const path = require('path');
const uglify = require('uglify-es');

function readDirectory(directory) { 

	fs.readdir(directory, (error, list) => {

		if (error)
			return;

		list.forEach(file => {
			file = path.join(directory, file);

			fs.stat(file, (error, status) => {
				if (error)
					return;

				if (status.isDirectory())
					readDirectory(file);
				else
					processFile(file);
			});
		});
	});
	
}

function processFile(file) {
	if ( file.endsWith(".js") ) {
		var buffer = fs.readFileSync(file)
		var result = uglify.minify(buffer.toString(), {
			compress: {
				dead_code: true,
				loops: true,
				if_return: true,
				keep_fargs: true,
				keep_fnames: true
			}
		});

		if(result.error) {
			console.log("Could not minify:" + file);
			console.log("Error: "+result.error);
		} else {
			fs.writeFileSync(file, result.code, 'utf8');
		}
	}
}

readDirectory("platforms/android/assets/www");
