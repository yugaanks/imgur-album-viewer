const path = require('path');
const data = require("../src/data/");
const axios = require('axios');
const config= require("../src/config/config.json");
// client id= your imgur application client id,  you get it after registering your app on imgur
const clientId=config.client_id;
const constructorMethod = (app) => {
    
    
	app.get("/", async (req, res) => {
        res.render('album', {});
	});

	app.get("/album", async (req, res)=>{
		try {
			var albumUrl=req.query.albumid;
			var index=albumUrl.indexOf('/a/');
			var albumId=albumUrl.slice(index+3);
			var cleanId=albumId.replace(/[\/]/g, "");
			const response= await axios({
				method: 'get',
				url: `https://api.imgur.com/3/album/${cleanId}/images`,
				headers: { 'authorization': 'Client-ID ' + clientId }
			});
			res.render('home', {images: response.data.data});
		}
		catch(err) {
			res.render('album', {error: "Album not found!"});
		}
	});


    app.use("/*", (req, response) => {
		let route = path.resolve('public/error.html');
		response.status(404).sendFile(route);    
	});
};

module.exports = constructorMethod;