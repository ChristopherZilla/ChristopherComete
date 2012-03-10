window.WebSocket = window.WebSocket || window.MozWebSocket;
// if browser doesn't support WebSocket, just show some notification and exit
    if (!window.WebSocket) {
      
	  alert('Sorry, but your browser doesn\'t support WebSockets');
     // return;
    } 
	var connection = new WebSocket('ws://127.0.0.1:8080');

	var startTime = 0;
	var start = 0;
	var end = 0;
	var diff = 0;
	var timerID = 0;

connection.onopen = function () {
        // connection is opened and ready to use
		console.log('WebSocket client connected');
		prepare();
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
	
function prepare(){

	 
	
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
				upload(evt,i);
			}
	prepare();
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
	var percentUploaded;
	if(evt.lengthComputable){
		var percentUploaded = Math.round((evt.loaded / evt.total) * 100);
		if(percentUploaded <=100){
			document.getElementById('percent').innerHTML = percentUploaded+' %';
			document.getElementById('progres').value = percentUploaded;
		}
	}
}

function chrono(){
	end = new Date();
	diff = end - start;
	diff = new Date(diff);
	var msec = diff.getMilliseconds();
	var sec = diff.getSeconds();
	var min = diff.getMinutes();
	var hr = diff.getHours()-1;
	if (min < 10){
		min = "0" + min;
	}
	if (sec < 10){
		sec = "0" + sec;
	}
	if(msec < 10){
		msec = "00" +msec;
	}
	else if(msec < 100){
		msec = "0" +msec;
	}
	document.getElementById("chronotime").innerHTML = hr + ":" + min + ":" + sec + ":" + msec;
	timerID = setTimeout("chrono()", 10);
}


function upload(evt,i){
	evt.preventDefault();
	var files;
	var file;
	var reader;


	if(evt.type == 'drop'){
			files = evt.dataTransfer.files;
			}
			else{
			files = document.getElementById("file").files; // Retrieve a list of file.
			}
	
	file = files[i];
	
	
	
	reader = new FileReader();// Object to read the file.
	reader.onerror = errorHandler;
	reader.onprogress = progressNote;
	reader.onabort = function(e){
		alert('File read cancelled');
    };
		reader.onloadstart = function(e){
		start = new Date();
		chrono();
		
	};

	reader.onabort = function(e){
		alert('File read cancelled');
    };
	
	
	reader.onload = function(e){
	//	start = new Date();
	//	chrono();

						
		connection.send(e.target.result);
		if(i<1){
				document.getElementById('drop_zone').innerHTML= i+1+' file uploaded this time';
				clearTimeout(timerID);
				}
		else{
				document.getElementById('drop_zone').innerHTML= i+1+' files uploaded this time';
				clearTimeout(timerID);
			}
	};
				
	// action à effectuer quand le chargement est fini. Action at the end of the loading.
	reader.onloadend= function(e){
						
						connection.send("end");
							clearTimeout(timerID);
	};
	
	reader.readAsArrayBuffer(file); // Reader read the file.
} 