var WebSocketServer = require('websocket').server;
var http = require('http');
var webSocketsServerPort = 1337;
var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets server
    // we don't have to implement anything.
});
server.listen(webSocketsServerPort, function() {
	console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
 });

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
	
	console.log((new Date()) + ' Connection accepted.');
	
    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
	
		
        if (message.type === 'utf8') {
            // process WebSocket message
				try {
					var json = JSON.parse(message.data);
			} catch (e) {
					console.log('This doesn\'t look like a valid JSON: ', message.data);
					return;
			}
		
				if (json.source === 'info') { // first response from the server with user's color
					console.log('JSON is arrived !')
			
					var name= json.name;
					var size= json.size;
					var type= json.type;
					console.log("name: "+name+" ;size: "+size+" ;type: "+type+"");
				}else {
					console.log('Hmm..., I\'ve never seen JSON like this: ', json);
				}
					console.log('Received Message: ' + message.utf8Data);
			//	connection.sendUTF(message.utf8Data);
        }
		else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });

    connection.on('close', function(connection) {
        // close user connection
		console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});