var xhr = new XMLHttpRequest();
	var xhrstartTime = 0;
	var xhrstart = 0;
	var xhrend = 0;
	var xhrdiff = 0;
	var xhrtimerID = 0;

function xhrprepare(){
		alert("xhrprepare");
		var xhrdropZone = document.getElementById("xhrdrop_zone");
		xhrdropZone.addEventListener('dragover', xhrhandleDragOver, false);
		xhrdropZone.addEventListener('drop', xhrfirstSlice, false);
	
		
	var xhrdropBtn = document.getElementById("xhrdrop_btn");
		xhrdropBtn.addEventListener('click',xhrfirstSlice, false);

}



function xhrhandleDragOver(evt){
		
			evt.preventDefault();
			evt.dataTransfer.dropEffect = 'copy'; 
}


function xhrfirstSlice(evt){
	evt.preventDefault();
	
	var files;
	var file;
	var i=0;
	
	if(evt.type == 'drop'){
		files = evt.dataTransfer.files;
		}
	else{
		files = document.getElementById("xhrfile").files; // Retrieve a list of file.
		}
	
	
	for(i=0;i<files.length;i++){
		file = files[i];
		alert("xhrfirstSlice");
		xhrupload(evt,i);
		
	}
	xhrprepare();
}

function xhrchrono(){
	xhrend = new Date();
	xhrdiff = end - start;
	xhrdiff = new Date(diff);
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
	document.getElementById("xhrchronotime").innerHTML = hr + ":" + min + ":" + sec + ":" + msec;
	xhrtimerID = setTimeout("xhrchrono()", 10);
}

function xhrupload(evt,i) {
	
	evt.preventDefault();
	var files;
	var file;
	var i=0;
	var content;
	const BYTES_PER_CHUNK = 1024 * 1024; // 1MB chunk sizes.
	var debut = 0;
	var fin = BYTES_PER_CHUNK;
	var chunk;
	
	if(evt.type == 'drop'){
		files = evt.dataTransfer.files;
		}
	else{
		files = document.getElementById("file").files; // Retrieve a list of file.
		}
	file = files[i];
	xhr.open("POST", "http://localhost:8888/getfile", true);
	xhr.responseType = 'text';
	xhr.upload.onprogress = xhrprogressNote;
	
/*	xhr.onload = function(e){
		xhr.send(this.result);
	};*/
	
	reader = new FileReader();
	reader.onloadstart = function(e){
		xhrstart = new Date();
		xhrchrono();
		
	};
	reader.onload = function(e){

		xhr.send(e.target.result);
		alert('' + e.target.result);
		if(i<1){
				document.getElementById('xhrdrop_zone').innerHTML= i+1+' file uploaded this time';
				clearTimeout(xhrtimerID);
				}
		else{
				document.getElementById('xhrdrop_zone').innerHTML= i+1+' files uploaded this time';
				clearTimeout(xhrtimerID);
			}
	};
reader.readAsDataURL(file);

 }
  
  
  
function xhrerrorHandler(evt) {
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

function xhrprogressNote(evt){
	var percentUploaded;
	if(evt.lengthComputable){
		var percentUploaded = Math.round((evt.loaded / evt.total) * 100);
		if(percentUploaded <=100){
			document.getElementById('xhrpercent').innerHTML = percentUploaded+' %';
			document.getElementById('xhrprogres').value = percentUploaded;
		}
	}
}

window.onload = xhrprepare;

