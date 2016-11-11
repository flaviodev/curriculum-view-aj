(function() {
	'use strict';
    
	app.controller('employerController', employerController);
	employerController.$inject = ["$scope"];

	function employerController ($scope) {
		var self = this;
		
		$scope.crud.setServicePath(controlLayerService);
		$scope.crud.setResource("Employer");
		$scope.crud.setResourceName("Employer");
		$scope.crud.setSortBy("name:asc");
		$scope.crud.getAllObjects();
		
	}
})();
