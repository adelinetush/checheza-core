var app = require('./app');
var port = process.env.PORT || 8001;

var server = app.listen(port, function() {
	console.log("App debugger now running!");
});
