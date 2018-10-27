/*
	Depedencies
*/
const fs = require("fs");

/*
	Module features
*/
function sendFileIfExists(path,res){
	console.log(`Path: ${path}`);
	if(fs.existsSync(path)){
		res.sendFile(path);
	}else{
		res.status(404).send("File not found");
	}
}

/*
	Exports
*/
module.exports = {
	sendFileIfExists,
}