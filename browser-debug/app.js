const express = require('express');
const fs = require('fs')
const cors = require('cors');
const app = express();


var specPaths = [];
var bookPaths = []

app.use(cors())
app.use(express.json());      
app.use(express.urlencoded());


app.post('/readFolder', cors(), (req, res, next) => {
	res.json(readFolder(req.body.readPath));
});

app.post('/readFile', cors(), (req, res, next) => {
	res.json(readFile(req.body.filePath));
})

app.get('/bookshelf', cors(), (req, res, next) => {
	res.json(getBooks()[0])
});

function readFolder(path){
	if(path.includes("www/addons")) {
		return fs.readdirSync("../"+path).map(entry => {
			return path + "/" + entry;
		})
	} else if (path.includes("addons/")) {
		var path = path.replace("addons/", "../www/addons/");
		return fs.readdirSync(path).map(entry => {
			return entry;
		})
	} else { 
		return fs.readdirSync("../www/addons/"+path);
	}
}

function readFile(path) {
	try {
		if(path.includes("www/addons"))
			return fs.readFileSync("../www/addons/"+path, "utf8");
		else
			return fs.readFileSync("../"+path, "utf8");
	} catch(e) {
		return fs.readFileSync("../"+path, "utf8");
	}
}

function isDir(path) {
	return fs.lstatSync(path).isDirectory();
}

function isFile(path) {
	return fs.lstatSync(path).isFile();
}

module.exports = app;
