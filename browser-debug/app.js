const express = require('express');
const fs = require('fs')
const cors = require('cors');
const app = express();


var specPaths = [];

app.use(cors())

app.get('/', (req, res, next) => {
	specPaths = [];

	readDir("../www/addons");

	res.json(specPaths);

});

function readDir(path){
	var files = fs.readdirSync(path);

	files.map((file) => {
		var f = path+"/"+file;
		if(isDir(f)) {
			readDir(f);
		} else if (isFile(f)) {
			if (f.indexOf("specification.json") != -1) {
				specPaths.push({ "path":path.replace('../www',''), "file":file });
			}
		} 
	});
}

function isDir(path) {
	return fs.lstatSync(path).isDirectory();
}

function isFile(path) {
	return fs.lstatSync(path).isFile();
}

module.exports = app;
