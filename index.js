const express = require('express');
const snap = require('./snap');

const app = express();

let promiseQueue = Promise.resolve();

app.get('/', function (req, res) {

	
	const url = req.query.url;
	if (!url) return res.sendFile(__dirname + '/index.html');
	
	promiseQueue = promiseQueue
	.then(() => snap(url))
	.then(function (filepath) {
		res.sendFile(filepath);
	}).catch(e => {
		res.end(e.message);	
	});
});

app.listen(process.env.PORT || 3000);