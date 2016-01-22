/**
 * Created by Vibhanshu Chaturvedi on 22/1/16.
 */

(function () {
	'use strict';

	var express = require('express'),
		mongoose = require('mongoose'),
		bodyParser = require('body-parser'),
		jobModel = require('./models/job'),
		conf = {
			IP: process.env.IP || '0.0.0.0',
			PORT: process.env.PORT || '3000',
			DB_USER: process.env.DB_USER  || 'root',
			DB_PWD: process.env.DB_PWD,
			DB_HOST: process.env.DB_HOST || 'localhost',
			DB_NAME: process.env.DB_NAME || 'jobfinder'
		},
		path = require('path'),
		app = express();

	app.use(bodyParser.json()); // support json encoded bodies
	app.use(bodyParser.urlencoded({ extended: true }));

	app.get('/api/jobs', function(req, res) {
		mongoose.model('job').find({}).exec(function (error, collection) {
			res.send({data:collection});
		});
	});

	app.post('/api/jobs', function(req, res) {
		var title = req.body.title,
			description = req.body.description;
		var instance = jobModel.createJob({
			title: title,
			description: description
		});
		res.send({data: instance});
	});

	app.delete('/api/jobs/:id', function (req, res) {
		var id = req.params.id;
		jobModel.deleteJob(id);
		res.send('Success fully deleted');
	});


	app.use(express.static(path.join(__dirname, 'public/')));

	app.get('/', function(request, res) {
		console.log('Hello');
		res.render('index');
	});


	mongoose.connect(createDBString(conf));

	function createDBString(conf) {
		var result = 'mongodb://';
		if (conf.DB_USER && conf.DB_PWD) {
			result = result + conf.DB_USER + ':' + conf.DB_PWD + '@';
		}
		result = result + conf.DB_HOST + '/' + conf.DB_NAME;
		return result;
	}

	var con = mongoose.connection;

	con.once('open', function () {
		console.log('Connected to Mongodb Successfully');
		jobModel.SeedJobs();
	});

	app.listen(conf.PORT, function () {
		console.log('Hello');
		console.log('Starting Server at ' + conf.IP + ':' + conf.PORT)
	});

}());


