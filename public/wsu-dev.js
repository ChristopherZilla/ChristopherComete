window.WebSocket = window.WebSocket || window.MozWebSocket;
// if browser doesn't support WebSocket, just show some notification and exit
    if (!window.WebSocket) {
      
	  alert('Sorry, but your browser doesn\'t support WebSockets');
     // return;
    } 
	var connection = new WebSocket('ws://127.0.0.1:8080');
	var c=0; // compteur pour consolePrint();
	var output=[]; //tableau pour consolePrint();
	var tag=[]; // tableau pour consolePrint();

connection.onopen = function () {
        // connection is opened and ready to use
		console.log('WebSocket client connected');
		upload();
		};
		
connection.onerror = function (error) {
        // an error occurred when sending/receiving data
		console.log("Connection Error: " + error.toString());
    };

connection.onmessage = function (message) {
        // try to decode json (I assume that each message from server is json)
        try {
            var json = JSON.parse(message.data);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
        }
        // handle incoming message
    };
	
function upload(){

	 
	
	var dropZone = document.getElementById("drop_zone");
		dropZone.addEventListener('dragover', handleDragOver, false);
		dropZone.addEventListener('drop', firstSlice, false);
	
		
	var dropBtn = document.getElementById("drop_btn");
		dropBtn.addEventListener('click',firstSlice, false);
	//	dropZone.addEventListener('click',secondSlice,false);
}

function handleDragOver(evt){
		
			evt.preventDefault();
			evt.dataTransfer.dropEffect = 'copy'; 
}

function consolePrint(print){
	
	tag[c]=print;
	output.push('<li><strong>',tag[c],'</strong></li>');
	document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
	c++;
}
		
function firstSlice(evt){
	evt.preventDefault();
	var files;
	var file;
	var fname;
	var fsize;
	var ftype;
	var lmd;
	var i = 0;

		if(evt.type == 'drop'){
			files = evt.dataTransfer.files;
			}
			else{
			files = document.getElementById("file").files; // Retrieve a list of file.
			}
			for(i=0;i<files.length;i++){
				file = files[i]; // Retrieve the file name.
				fname = files[i].name; // Retrieve the file name.
				fsize =  files[i].size; // Retrieve the file size.
				ftype = files[i].type; // Retrieve the file type.
				lmd = files[i].lastModifiedDate;
			
				var message = {
					source: 'info',
					filename: fname,
					contentlength: fsize,
					type: ftype,
					lastmodifieddate: lmd
				};
		
				connection.send(JSON.stringify(message)); 
				secondSlice(evt,i);
			}
	upload();
}


function errorHandler(evt) {
    switch(evt.target.error.code) {
      case evt.target.error.NOT_FOUND_ERR:
        alert('File Not Found!');
        break;
      case evt.target.error.NOT_READABLE_ERR:
        alert('File is not readable');
        break;
      case evt.target.error.ABORT_ERR:
        break; 
      default:
        alert('An error occurred reading this file.');
    };
}

function progressNote(evt){
	if(evt.lengthComputable){
		var percentUploaded = Math.round((evt.loaded / evt.total) * 100);
		if(percentUploaded <100){
			document.getElementById.innerHTML = percentUploaded+' %';
		}
	}
}

function secondSlice(evt,i){
	evt.preventDefault();
	var files;
	var file;
	var reader;

	consolePrint('tata');
	consolePrint('toto');
	consolePrint('tete');
	consolePrint('titi');

	if(evt.type == 'drop'){
			files = evt.dataTransfer.files;
			}
			else{
			files = document.getElementById("file").files; // Retrieve a list of file.
			}
	
	file = files[i];
	
	
	
	reader = new FileReader(); // Object to read the file.
	reader.readAsArrayBuffer(file); // Reader read the file.
	
	reader.onabort = function(e){
		alert('File read cancelled');
    };
	
	reader.onerror = errorHandler;
	reader.onprogress = progressNote;
	
	reader.onload = function(e){


						
						connection.send(e.target.result);
						if(i<1){
							document.getElementById('drop_zone').innerHTML= i+1+' file uploaded this time';
						}
						else{
							document.getElementById('drop_zone').innerHTML= i+1+' files uploaded this time';
						}
					};
				
	// action à effectuer quand le chargement est fini. Action at the end of the loading.
	reader.onloadend= function(e){
						connection.send("end");
						
			};
} 