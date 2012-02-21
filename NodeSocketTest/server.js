var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');

app.listen(80);

// Envoie de la page.
function handler(req,res){
	fs.readFile(__dirname+'/page.html',
	function(err,data){
		if(err){
			res.writeHead(500);
			return res.end('Error loading page.html');
}

			res.writeHead(200);
			res.end(data);
	});
}

// Connection et envoie de message (style brouillon)
io.sockets.on('connection', function (socket) {
	socket.emit('drop', { helloduDrop: 'world' });
	socket.on('taille', function (data) {
		console.log(data);
		});
	socket.emit('click', { helloduClick: 'world' });
	socket.on('taille', function (data) {
		console.log(data);
		});
});