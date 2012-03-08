// Node server by ChristopherZilla, ask me for information or see my Github.
var WebSocketServer = require('ws').Server;
var http = require('http');
var fs = require('fs');
var path = require('path');
var wsServerPort = 8080;
var wss = new WebSocketServer({port: wsServerPort});

// To connect with an other ip that localhost
//var WebSocket = require('ws'); // instead of var WebSocketServer = require('ws').Server;
//var ws = new WebSocket('ws://www.host.com/path'); //var wsServerPort = 8080;var wss = new WebSocketServer({port: wsServerPort});

var source;
var name;
var size;
var type;
var date;
var pathDir = __dirname + '/upfile';


if(wss != null){
	console.log((new Date()) + " Server is listening on port " + wsServerPort);
	 path.exists(pathDir,function(exists){
		if(exists == false){
			fs.mkdir( pathDir,function(error){
				if(error){
					throw error;
				}
				console.log('File will be send there: ', __dirname +'/upfile');
			});
		}
	});
}


wss.on('connection', function(ws){
	console.log((new Date()) + ' Connection accepted.');
	
	ws.on('message', function(message,flags){
		
		console.log('Message received:', message);
		
		if(flags.binary == true || flags.binary === true){
			fs.writeFile( pathDir+'/'+name, message,function(error){
				if(error){
					console.log('An error occured: ', error);
					throw error
				}
				console.log('The file '+name+' is saved');
			}); 
			console.log('youpi');
		}
		else{
			if(typeof JSON != "undefined"){
			var json;
				try {
					json = JSON.parse(message);
					console.log('It\'s a JSON');
					if (json.source == 'info') { // first response from the server with user's color
						source = json.source;
						name= json.filename;
						size= json.contentlength;
						type= json.type;
						date = json.lastmodifieddate;
						console.log("source: "+source+" ;name: "+name+" ;size: "+size+" ;type: "+type+" ;date:"+date+"");
					}else {
						console.log('Hmm..., I\'ve never seen JSON like this: ', json);
					}
					
			} catch (e) {
					console.log('This doesn\'t look like a valid JSON: ', message);
					switch(message){
						case "end":
							console.log("File uploaded");
							break;
						default:
							console.log("default");
							break;
					} 
			}
					
			}
			
		}
		
	}); 
	
});
