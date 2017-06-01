const express = require('express'),
	path = require('path'),
	bodyParser = require('body-parser'),	
	videos = require('./routs/videos.js'),
 	app = express(),
 	publicDir = 'client/public';
	port = 3001;

// Parsing req.body
app.use(bodyParser.json());

// Serve static assets
app.use(express.static(path.resolve(__dirname, publicDir)));

app.use("/videos", videos);

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, publicDir, 'index.html'));
});

app.listen(port);
console.log('Server is listening on localhost:' + port);
console.log('Playbuzz interview assigment by Nir Leinov');

