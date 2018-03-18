var app = require('./app');
var port = process.env.PORT || 27000;

var server = app.listen(port, function() {
	console.log("App debugger now running!");
});
