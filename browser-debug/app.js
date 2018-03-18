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

function readFolder(path){
	return fs.readdirSync("../"+path);
}

function readFile(path) {
	try {
		return fs.readFileSync("../"+path, "utf8");
	} catch(e) {
		return fs.readFileSync(".."+path, "utf8");
	}
}

function isDir(path) {
	return fs.lstatSync(path).isDirectory();
}

function isFile(path) {
	return fs.lstatSync(path).isFile();
}

module.exports = app;
