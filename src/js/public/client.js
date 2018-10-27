var socket = io.connect(`${window.location.href}`);

socket.on('urls',(data)=>{
	console.log(`Recieved URLS:`);
	if(typeof data=='string'){
		console.log(data);
		vue.url.push(data);
	}else{
		data.forEach((elem)=>{
			console.log(elem);
		});
		Array.prototype.push.apply(vue.url , data);
	}
});