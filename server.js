/**
 * Created by Vibhanshu Chaturvedi on 22/1/16.
 */

(function () {
	'use strict';

	var express = require('express'),
		conf = {
			IP: process.env.IP || '0.0.0.0',
			PORT: process.env.PORT || '3000'
		},
		path = require('path'),
		app = express();

	app.use(express.static(path.join(__dirname, 'public/')));

	app.get('/', function(request, res) {
		res.render('index');
	});


	app.listen(conf.PORT, function () {
		console.log('Starting Server at ' + conf.IP + ':' + conf.PORT)
	});

}());


