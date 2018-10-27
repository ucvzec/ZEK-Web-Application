/* Node JS Modules */
const path = require("path");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
	input:process.stdin,
	output:process.stdout,
});

/* Configuration Files */
const config = require(path.resolve(__dirname+"/config.json"));

/*
	Express Server stuff
*/
const express = require("express");
const app = express();

const server = require("http").Server(app);
const port = 80;

server.listen(port,()=>{
	console.log(`Server is listening on port ${port}.`);
})
/*
	Socket IO stuff
*/
let io = require("socket.io").listen(server);

io.on('connection',(socket)=>{
	console.log("Got a socket connection");

	socket.on('disconnect',(reason)=>{
		console.log(`Socket disconnected.`);
	});

	socket.emit('urls',urlStore);
});

/*
	Resource Routes
*/
const {sendFileIfExists} = require(path.resolve(__dirname+config.serverJSPath+"resourceAssist.js"));
//this method checks if the provided path exists, and if so it sends the file. If not it sends a 404 error code

app.get("/css/:styleFileName",(req,res)=>{
	sendFileIfExists(path.resolve(__dirname+config.publicCSSPath+req.params.styleFileName),res);
});

app.get("/js/:jsFileName",(req,res)=>{
	//this checks if the requested file can be found on the publicly accessible part of the application
	sendFileIfExists(path.resolve(__dirname+config.publicJSPath+req.params.jsFileName),res);
});

/*
	Normal Front-facing Routes
*/
app.get("/*",(req,res)=>{
	res.sendFile(path.resolve(__dirname+"/client.html"));
});

/*
	Application
*/
let urlStore = [
];

fs.readFile(path.resolve(__dirname+"/urls.txt"),"utf8",(err,data)=>{
	if(err){
		console.log(err);
	}
	Array.prototype.push.apply(urlStore,data.split("\n"));
});

/*
	Developer Utilities
*/
//emits all of the urls it's provided
rl.on('line',(input)=>{
	io.sockets.emit('urls',input.split(" "));
});