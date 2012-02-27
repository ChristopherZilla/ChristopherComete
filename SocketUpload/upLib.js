 
 function upload(){
 // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;
	
	// if browser doesn't support WebSocket, just show some notification and exit
    if (!window.WebSocket) {
       
                             
	  console.log('Sorry, but your browser doesn\'t support WebSockets');
     //   return;
    }

    var connection = new WebSocket('ws://127.0.0.1:1337');

    connection.onopen = function () {
        // connection is opened and ready to use
		console.log('WebSocket client connected');
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


	var dropZone = document.getElementById("drop_zone");
		dropZone.addEventListener('dragover', handleDragOver, false);
		dropZone.addEventListener('drop', handleFileSelect, false);
		dropZone.addEventListener('drop', getInfoFile, false);
		
		var dropBtn = document.getElementById("drop_btn"); // Ne semble pas fonctionner.
		dropBtn.addEventListener('click',handleFileClickSelect, false); // Ne semble pas fonctionner. 
		
		// Fonction récupérant les informations d'un fichier et renvoie un JSON.
		function getInfoFile(evt){
			var files;
			if(evt.type == 'drop'){
			files = evt.dataTransfer.files;
			}
			else{
			files = document.getElementById("file").files; // Récupération d'une liste de fichier.
			}
			
			var file = files[0]; // Récupération du premier fichier.
			var fname = files[0].name; // Récupération du nom du fichier.
			var fsize =  files[0].size; // Récupération de la taille du fichier.
			var ftype = files[0].type; // Récupération du type de fichier.
			
			var message = {
				source: 'info',
				name: fname,
				size: fsize,
				type: ftype
			};
			alert("POP");
			connection.sendUTF(JSON.stringify(message));
			
		} 
		
		function handleDragOver(evt){
			evt.stopPropagation();
			evt.preventDefault();
			evt.dataTransfer.dropEffect = 'copy'; 
		}
		
		function handleFileSelect(evt){
			evt.stopPropagation(); // Empêche la redirection.
			evt.preventDefault(); // Empêcher le comportement par défaut du navigateur qui serait d'essayer d'afficher le fichier.
		
			if(evt.type == 'drop'){
			files = evt.dataTransfer.files;
			
			}
			else{
			files = document.getElementById("file").files; // Récupération d'une liste de fichier.
			}
			var file = files[0]; // Récupération du premier fichier.
		
			var reader = new FileReader(); // Objet servant à lire le ficher.
			reader.readAsArrayBuffer(file); // On demande à l'objet reader de lire le fichier.
			// action à effectuer lors du chargement des données
			reader.onload = function(e){
			
				connection.sendBytes(e.target.result);
			};
				
				// action à effectuer quand le chargement est fini.
				reader.onloadend= function(e){
					var contentFile= e.target.result; // récupération des données formant le fichier
					connection.sendBytes(contentFile);
					alert("terminé"); // un alert pour signaler que l'upload et terminé.
				}
			} 
}

upload(); 




/*







	var WebSocketClient = require('websocket').client;

		var client = new WebSocketClient();

		client.on('connectFailed', function(error) {
			console.log('Connect Error: ' + error.toString());
		});

		client.on('connect', function(connection) {
			console.log('WebSocket client connected');
			connection.on('error', function(error) {
				console.log("Connection Error: " + error.toString());
			});
			connection.on('close', function() {
				console.log('echo-protocol Connection Closed');
			});
			connection.on('message', function(message) {
				if (message.type === 'utf8') {
					console.log("Received: '" + message.utf8Data + "'");
				}
			});
		/*	
			// Fonction récupérant les informations d'un fichier et renvoie un JSON.
		function getInfoFile(evt){
			var files;
			if(evt.type == 'drop'){
			files = evt.dataTransfer.files;
			}
			else{
			files = document.getElementById("file").files; // Récupération d'une liste de fichier.
			}
			
			var file = files[0]; // Récupération du premier fichier.
			var fname = files[0].name; // Récupération du nom du fichier.
			var fsize =  files[0].size; // Récupération de la taille du fichier.
			var ftype = files[0].type; // Récupération du type de fichier.

			var message = {
				name: fname,
				size: fsize,
				type: ftype
			};
			
			return message;
		}
		
		function handleDragOver(evt){
			evt.stopPropagation();
			evt.preventDefault();
			evt.dataTransfer.dropEffect = 'copy'; 
		}
		
		function handleFileSelect(evt){
			evt.stopPropagation(); // Empêche la redirection.
			evt.preventDefault(); // Empêcher le comportement par défaut du navigateur qui serait d'essayer d'afficher le fichier.
		
			if(evt.type == 'drop'){
			files = evt.dataTransfer.files;
			}
			else{
			files = document.getElementById("file").files; // Récupération d'une liste de fichier.
			}
			var file = files[0]; // Récupération du premier fichier.
		
			var reader = new FileReader(); // Objet servant à lire le ficher.
			reader.readAsArrayBuffer(file); // On demande à l'objet reader de lire le fichier.
			// action à effectuer lors du chargement des données
			reader.onload = function(e){
				connection.sendBytes(e.target.result);
			};
				
				// action à effectuer quand le chargement est fini.
				reader.onloadend= function(e){
					var contentFile= e.target.result; // récupération des données formant le fichier
					connection.sendBytes(contentFile);
					alert("terminé"); // un alert pour signaler que l'upload et terminé.
				}
			});
				

			function sendNumber() {
				if (connection.connected) {
					var number = Math.round(Math.random() * 0xFFFFFF);
					connection.sendUTF(number.toString());
					setTimeout(sendNumber, 1000);
				}
			}
			sendNumber();
		});

		 client.connect('ws://localhost:8080/', 'echo-protocol');
/*
		var dropZone = document.getElementById("drop_zone");
		dropZone.addEventListener('dragover', handleDragOver, false);
		dropZone.addEventListener('drop', handleFileSelect, false);
		dropZone.addEventListener('drop', gettFileInfo, false);
		
		var dropBtn = document.getElementById("drop_btn"); // Ne semble pas fonctionner.
		dropBtn.addEventListener('click',handleFileClickSelect, false); // Ne semble pas fonctionner.*/