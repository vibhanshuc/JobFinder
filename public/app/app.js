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
			data.$save().then(function (result) {
				vm.job = {};
				vm.jobs.push(result);
			});
		};

		vm.deleteJob = function (index) {
			vm.jobs[index].$destroy();
			vm.jobs.splice(index, 1);
		};

		getJobs();

	}

	angular.module('JobFinder', ['modelFactory', 'angularMoment'])
		.controller('AppController', AppController)
		.service('JobModel', function($modelFactory){
			return $modelFactory('/api/jobs', {
				pk: '_id'
			});
		});

	AppController.$inject = ['JobModel'];
	
})();
