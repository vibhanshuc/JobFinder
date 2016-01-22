(function () {
	'use strict';


	function AppController() {

		var vm = this;

		function activate() {

		}


		vm.activate = activate;
		vm.title = 'Welcome To JobFinder';
		vm.jobs = [{
			title: 'Sales Head',
			description: 'I really don\'t know what a sales person does.'
		},
			{
				title: 'Sales Manager',
				description: 'Does some awesome magic tricks on little bit of boot licking.'
			}
		];

		activate();

	}

	angular.module('JobFinder', [])
		.controller('AppController', AppController);
	
})();
