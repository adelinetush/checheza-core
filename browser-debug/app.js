const express = require('express');
const fs = require('fs')
const cors = require('cors');
const app = express();


var specPaths = [];
var bookPaths = []

app.use(cors())

app.get('/', cors(), (req, res, next) => {
	specPaths = [];
	readDir("../www/addons");
	res.json(specPaths);
});

app.get('/bookshelf', cors(), (req, res, next) => {
	res.json(getBooks()[0])
});

function getBooks() {
	var files = fs.readdirSync("../www/addons/learnwithlara.widget.bookshelf/books/");

	return files.map((lang) => {
		return books = fs.readdirSync("../www/addons/learnwithlara.widget.bookshelf/books/"+lang)
		.map((book) => { 
			var num_pages = 0;

			book_data = fs.readdirSync("../www/addons/learnwithlara.widget.bookshelf/books/"+lang+"/"+book)
			.map((bdata) => {
				if(bdata.indexOf(".png") != -1) {
					num_pages++;
				}
				return bdata;
			});

			return {
				id: book,
				pages: num_pages,
				cover_picture: 'front.png',
				path: 'addons/learnwithlara.widget.bookshelf/books/'+lang+'/'+book,
				language: lang
			};
		});
	});
}

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
