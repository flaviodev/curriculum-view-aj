(function() {
	'use strict';
    
	app.controller('employerController', employerController);
	employerController.$inject = ["$scope"];

	function employerController ($scope) {
		var self = this;
		
		$scope.reg.setServicePath(controlLayerService);
		$scope.reg.setResource("Employer");
		$scope.reg.setResourceName("Employer");
		$scope.reg.setSortBy("name:asc");
		$scope.reg.getAllObjects();
	}
})();
