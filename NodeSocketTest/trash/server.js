//var http = require("http");
//var path = require("path");
//var sys = require("util");
//var io = require("socket.io");
	
//	var server = http.createServer(function(req,res){
	
//			res.writeHead(200,{'content-type':'text/plain'});
//			res.write('received upload: \n\n');
//			res.end("Hello Dude");
//	}).listen(8080);
	
//	io = io.listen(server);

//Import Socket.io module
var io = require('socket.io');
//Creates a HTTP Server
var socket = io.listen(8124);
//Bind the Connection Event
//This will be fired every time when a new connection is made
socket.sockets.on('connection',function(socket){
 
        //This will be fired when data is received from client over a single socket
        socket.on('message', function(msg){
            console.log('Received message from client ',msg);
        });
        //Emit a message to client
        socket.emit('greet',{hello: 'world'});
        //This will fire when the client has disconnected
        socket.on('disconnect', function(){
            console.log('Server has disconnected');
        });
});
	
	
	