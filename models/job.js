/**
 * Created by Vibhanshu Chaturvedi on 22/1/16.
 */

(function () {
	'use strict';

	var mongoose = require('mongoose');

	var jobSchema = mongoose.Schema({
		title: {type: String},
		description: {type: String},
		createdAt: { type: Date, default: Date.now }
	});

	var Job = mongoose.model('job', jobSchema);

	exports.createJob = function createJob (job) {
		return Job.create(job);
	};

	exports.SeedJobs = function () {
		Job.find({}).exec(function (error, collection) {
			if (collection.length === 0) {
				Job.create({
					title: 'Sales Head',
					description: 'I really don\'t know what a sales person does.'
				});
				Job.create({
					title: 'Sales Manager',
					description: 'Does some awesome magic tricks on little bit of boot licking.'
				});
				Job.create({
					title: 'Cook',
					description: 'Needs to be most impatient person in World.'
				});
				Job.create({
					title: 'Sweeper',
					description: 'Needs to be dumbest person in the world.'
				});
			}
		})
	}

}());
