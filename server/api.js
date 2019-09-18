var express = require('express');
var router = express.Router();
var serverConf = require("./conf.js");

router.get('/websocketurl', function(req, res) {

	console.log("> '/api/websocketurl' GET route called.");
	res.send({url: serverConf.spmURL});
});

router.get('/config', function(req, res) {

	console.log("> '/api/config' GET route called.");
	res.send(serverConf);
});

module.exports = router;