var http = require("http");
var path = require("path");
var sys = require("util");
var io = require("socket.io");
	
	var server = http.createServer(function(req,res){
	
			res.writeHead(200,{'content-type':'text/plain'});
			res.write('received upload: \n\n');
			res.end("Hello Dude");
	}).listen(8080);
	
	io = io.listen(server);
	
	
	