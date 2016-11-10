(function() {
	'use strict';
    
	app.controller('profileController', profileController);
	profileController.$inject = ["$scope"];

	function profileController ($scope) {
		var self = this;
		
		$scope.reg.setServicePath(controlLayerService);
		$scope.reg.setResource("Profile");
		$scope.reg.setResourceName("Profile");
		$scope.reg.setSortBy("name:asc");
		
		$scope.reg.getAllObjects();
	}
})();
