(function() {
	'use strict';
    
	app.controller('instituteOfEducationController', instituteOfEducationController);
	instituteOfEducationController.$inject = ["$scope"];

	function instituteOfEducationController ($scope) {
		var self = this;
		
		$scope.crud.setServicePath(controlLayerService);
		$scope.crud.setResource("InstituteOfEducation");
		$scope.crud.setResourceName("Institute of Education");
		$scope.crud.setSortBy("name:asc");
		
		$scope.crud.getAllObjects();
	}
})();
