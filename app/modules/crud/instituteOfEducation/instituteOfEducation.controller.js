(function() {
	'use strict';
    
	app.controller('instituteOfEducationController', instituteOfEducationController);
	instituteOfEducationController.$inject = ["$scope"];

	function instituteOfEducationController ($scope) {
		var self = this;
		
		
		$scope.crud.setServicePath(controlLayerService);

		self.currentLocale;
		$scope.crud.setResource("InstituteOfEducation");
		$scope.crud.setResourceName("Institute of Education");
		$scope.crud.setSortBy("name:asc");

		
	    $scope.$parent.$parent.$watch('locales.current', function (locale) {
	        if (!locale) {
	            return;
	        }
	        
	        self.currentLocale = locale;
	        $scope.crud.getAllObjects(locale);	        
	    });
		
	    self.getLocaleComplement = getLocaleComplement;
	    function getLocaleComplement(registerLocale) {
	    	if(registerLocale!=self.currentLocale) {
	    		return "("+registerLocale +")";
	    	} else {
	    		return "";
	    	}
	    }
	}
})();
