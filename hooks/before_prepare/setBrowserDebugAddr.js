#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

parseConfigJson = () => {
	fs.readFile('./package.json', 'utf8', (error, config) => {
		config = JSON.parse(config);
		port = config.scripts.start.split(" ")[5].split("=")[1];

		var script = '\
		var getUrl = window.location; \
		var baseUrl = getUrl .protocol + "//" + getUrl.hostname; \
		var browserdebug = baseUrl+":'+port+'";';

		fs.writeFile('./www/static/browserDbgAddr.js', script, (err) => {
			if(err) {
				console.log("Could not write to file");
			}
		});
	});
}

parseConfigJson();


