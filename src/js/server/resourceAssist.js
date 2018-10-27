/*
	Depedencies
*/
const fs = require("fs");
//toggles on and off the dev settings
const dev = false;
/*
	Module features
*/
function sendFileIfExists(path,res){
	(dev?console.log(`Path: ${path}`):"");
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