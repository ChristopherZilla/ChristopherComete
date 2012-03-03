
	window.WebSocket = window.WebSocket || window.MozWebSocket;
	
	// if browser doesn't support WebSocket, just show some notification and exit
    if (!window.WebSocket) {
                            
	  console.log('Sorry, but your browser doesn\'t support WebSockets');
      return;
    }
	var connection = new WebSocket('ws://127.0.0.1:1337');
	
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
		dropZone.addEventListener('drop',secondSlice,false);
		
	var dropBtn = document.getElementById("drop_btn");
		dropBtn.addEventListener('click',firstSlice, false);
		dropZone.addEventListener('click',secondSlice,false);
}


function handleDragOver(evt){
		
			evt.preventDefault();
			evt.dataTransfer.dropEffect = 'copy'; 
		}

function firstSlice(evt){
	evt.preventDefault();
	var files;

		if(evt.type == 'drop'){
			files = evt.dataTransfer.files;
			}
			else{
			files = document.getElementById("file").files; // Retrieve a list of file.
			}
			
			var file = files[0]; // Retrieve the file name.
			var fname = files[0].name; // Retrieve the file name.
			var fsize =  files[0].size; // Retrieve the file size.
			var ftype = files[0].type; // Retrieve the file type.
			
			var message = {
				source: 'info',
				filename: fname,
				contentlength: fsize,
				type: ftype
			};
		
			connection.send(JSON.stringify(message)); 
			
    
	
	
}

function secondSlice(evt){
	evt.preventDefault();
	connection.binaryType = "arraybuffer";

	if(evt.type == 'drop'){
			files = evt.dataTransfer.files;
			}
			else{
			files = document.getElementById("file").files; // Retrieve a list of file.
			}
	
	file= files[0];
	reader = new FileReader(); // Object to read the file.
	reader.readAsArrayBuffer(file); // Reader read the file.
	var dataBuffer;
	reader.onload = function(e){
			
				
				dataBuffer = e.target.result;
				connection.send(dataBuffer);
				connection.send(""+connection.binaryType);
			
				};
				
				// action à effectuer quand le chargement est fini. Action at the end of the loading.
				reader.onloadend= function(e){
					
					dataBuffer = e.target.result;
					connection.send(dataBuffer);
				
				//	alert("terminé"); // an alert to warn about the end.
				}
} 
		

