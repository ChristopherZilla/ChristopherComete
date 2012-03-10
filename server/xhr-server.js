var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    util = require("util");

	var XHRServerPort = 8888;
	var pathDir = __dirname + '/XHRupfile';
	
	path.exists(pathDir,function(exists){
		if(exists == false){
			fs.mkdir( pathDir,function(error){
				if(error){
					throw error;
				}
			console.log('File will be send there: ', __dirname +'/XHRupfile');
			});
		}
	});
	
function upload(request, response){
	var path = url.parse(request.url).pathname;
    if(path=="/getfile"){

		var content = '';
		request.setEncoding('binary');
		var name = response.getHeader('x-File-Name');
	
		request.addListener('data', function(chunk){
			content = content + chunk;
		});
	
		request.addListener('end',function(){
			fs.writeFile( pathDir+'/'+name, content,function(error){
				if(error){
				console.log('An error occured: ', error);
				throw error
				}
			console.log('The file '+name+' is saved');
			}); 
		});
	}
	else{
			response.writeHead(500);
			return response.end('Error loading page.html');
	}
}

http.createServer(function(request, response) {
	response.header("Access-Control-Allow-Origin", "*");
	upload(request, response);
  // response.writeHead(200, {"Content-Type": "text/plain"});
  // response.write("Hello World");
  // response.end();
  
  console.log((new Date()) + " Server is listening on port " + XHRServerPort);

}).listen(XHRServerPort);

// voir 
/*
http://www.proglogic.com/code/javascript/time/chronometer.php

https://github.com/daleharvey/dropup/blob/master/docroot/client.dropup.js

http://planb.nicecupoftea.org/2012/01/05/a-node-js-bot-in-xmpp/

http://www.componentix.com/blog/9/file-uploads-using-nodejs-now-for-real

http://net.tutsplus.com/tutorials/javascript-ajax/learning-serverside-javascript-with-node-js/

http://hacks.mozilla.org/2009/12/uploading-files-with-xmlhttprequest/
*/