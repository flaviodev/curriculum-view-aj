(function() {
	'use strict';
    
	app.controller('profileController', profileController);
	profileController.$inject = ["$scope"];

	function profileController ($scope) {
		var self = this;
		
		$scope.crud.setServicePath(controlLayerService);
		$scope.crud.setResource("Profile");
		$scope.crud.setResourceName("Profile");
		$scope.crud.setSortBy("name:asc");
		
		$scope.crud.getAllObjects();
	}
})();
