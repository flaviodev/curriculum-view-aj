(function() {
	'use strict';
    
	app.controller('instituteOfEducationController', instituteOfEducationController);
	instituteOfEducationController.$inject = ["$scope"];

	function instituteOfEducationController ($scope) {
		var self = this;
		
		$scope.reg.setServicePath(controlLayerService);
		$scope.reg.setResource("InstituteOfEducation");
		$scope.reg.setResourceName("Institute of Education");
		$scope.reg.setSortBy("name:asc");
		
		$scope.reg.getAllObjects();
	}
})();
