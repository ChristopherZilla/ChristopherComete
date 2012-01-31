/*
function updateStatus(id, message){
	document.getElementById(id).innerHTML = message;
}

function SocketUpload(wsserver){
	if(window.Websocket){
		var ws = new WebSocket(wsserver);
	
		ws.onopen= function(){
			updateStatus("wsStatus","Connected to WebSocket server!");
		}
	
		ws.onmessage = function(e){
			displayMessage(e.data);
		}
	
		ws.onclose = function(){
			updateStatus("wsStatus","WebSocket closed!");
		}
	
		ws.onerror = function(e){
			updateStatus("wsStatus", "WebSocket error:"+e.data);
		}
	}
	else{
		updateStatus("wsStatus","Your browser does NOT support webSocket.");

}
}

function sendFile(idForm){
	 var file = document.getElementById(idForm).value;
	 if (ws.readyState ==1){
		ws.send(file);
	 }
	 else{
		alert("The websocket is not open! Try refreshing your browser");
	}
}
*/

<script type="text/javascript" src="/socket.io/socket.io.js"></script>
//se connecter au serveur
var socket = io.connect();
function socketUpload(idForm){
	var filePath = document.getElementById(idForm).value;

	var fso = new ActiveXObject("Scripting.FileSystemObject");


// returns the file object associated with the specified file

var fileObj = fso.GetFile(filePath);

//document.write(fileObj.Name);
socket.send(fileObj);

fso = null;
}
