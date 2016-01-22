(function () {
	'use strict';


	function AppController(JobModel) {

		var vm = this;

		var getJobs = function () {
			JobModel.query().then(function(result) {
				vm.jobs = vm.jobs.concat(result);
			});
		};

		vm.title = 'JobFinder';
		vm.jobs = [];

		vm.createJob = function (job) {
			var data = new JobModel(job);
			job.createdAt = new Date();
			vm.job = {};
			vm.jobs.push(job);
			data.$save();
		};

		getJobs();

	}

	angular.module('JobFinder', ['modelFactory', 'angularMoment'])
		.controller('AppController', AppController)
		.service('JobModel', function($modelFactory){
			return $modelFactory('/api/jobs');
		});

	AppController.$inject = ['JobModel'];
	
})();
