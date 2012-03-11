var http = require('http'),
    util = require('util'),
    formidable = require('formidable'),
	path = require("path"),
    fs = require("fs"),
    server;
	var TEST_PORT = 8888;
	var TEST_TMP = __dirname + '/XHRupfile';
	
	
	server = http.createServer(function(req, res) {
			
		if (req.url == '/getfile') {
			console.log(req);
			console.log('get file indeed');
			var form = new formidable.IncomingForm(),
			files = [],
			fields = [];
			
			form.uploadDir = TEST_TMP;
			
			form
				.on('field', function(field, value) {
					console.log(field, value);
					fields.push([field, value]);
				})
			
				.on('file', function(field, file) {
					console.log(field, file);
					files.push([field, file]);
				})
			
				.on('end', function() {
					console.log('-> upload done');
					res.writeHead(200, {'content-type': 'text/plain'});
					res.write('received fields:\n\n '+util.inspect(fields));
					res.write('\n\n');
					res.end('received files:\n\n '+util.inspect(files));
				});
				form.parse(req,function(err, fields, files) {
									if (err) {
										console.log(err);
									}
				});
		} else {
				res.writeHead(404, {'content-type': 'text/plain'});
				res.end('404');
			}
	
	});
server.listen(TEST_PORT);

console.log('listening on http://localhost:'+TEST_PORT+'/');