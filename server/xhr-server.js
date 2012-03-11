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
	var content;
	var name = 'test';
    if(path=="/getfile"){

		request.addListener('data',function(chunk){
			content += chunk;
		});
		request.addListener('end', function(){
			console.log('Now we save');
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
	console.log((new Date()) + " Server is listening on port " + XHRServerPort);
	upload(request, response);
  // response.writeHead(200, {"Content-Type": "text/plain"});
  // response.write("Hello World");
  // response.end();
  
  

}).listen(XHRServerPort);

