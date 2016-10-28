app.controller('NavegacaoCtrl', function($rootScope, $location){
	$rootScope.activetab = $location.path();
});

var pathBase = '/curriculum-control-php';


app.controller('serviceProfile', function ($scope, $http) {
	$http({method: 'POST', url: pathBase+"/ServiceProfile/getProfiles", 
	   headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }})
   .success(function(data){$scope.profiles = data.reply;
  	  alert(data.toSource());
  	    
   })
   .error(function(data, status, headers, config) {alert("error: "+data);});
	
	$scope.getProfile = function () {
		var dataInput = {"id":$scope.data.profile.id};
		var request = $http({
	    	method: "post",
    		url: pathBase+"/ServiceProfile/getProfile",
    		data    : dataInput, 
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
		});
	
		request.success(function (data) {
			$scope.data.profile = data.reply;
		});
	}

	$scope.createProfile = function () {
		var dataInput = {"profile":$scope.data.profile};
		var request = $http({
			method: "post",
			url: pathBase+"/ServiceProfile/createProfile",
			data    : dataInput, 
			headers : {'Content-Type': 'application/x-www-form-urlencoded'}
		});
		
		request.success(function (data) {
			$scope.profiles.push(data.reply)
			$scope.data.profile = {};
		});
	}	

	$scope.loadProfile = function (profile) {
	   $scope.data = {};

	   var copyProfile = {}; 
	   for (i in profile) { 
		   copyProfile[i] = profile[i]; 
	   }
	   
	   $scope.data.profile = copyProfile;
	}
	
	$scope.cancel = function () {
		$scope.data.profile = {}
	}
	
	$scope.updateProfile = function (id) {
		var dataInput = {"profile":$scope.data.profile};
		var request = $http({
			method: "post",
			url: pathBase+"/ServiceProfile/updateProfile",
			data    : dataInput, 
			headers : {'Content-Type': 'application/x-www-form-urlencoded'}
		});
		
		request.success(function (data) {
			for(i in $scope.profiles) {
				if($scope.profiles[i].id == id) {
					$scope.profiles[i] = $scope.data.profile;
					break;
				}
			}
			$scope.data.profile = {};
		});
	}
	
	$scope.deleteProfile = function (id) {
		var dataInput = {"id":id};
		var request = $http({
	    	method: "post",
    		url: pathBase+"/ServiceProfile/deleteProfile",
    		data    : dataInput, 
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
		});
	
		request.success(function (data) {
			for(i in $scope.profiles) {
				if($scope.profiles[i].id == id) {
					$scope.profiles.splice(i, 1);
					break;
				}
			}
			$scope.data.profile = {};
		});
	}

	
	$scope.commandProfile = function () {
		var dataInput = {
				"arg1":"99", 
				"arg2":"77"
		};
		
		var request = $http({
			method: "post",
			url: pathBase+"/command/comandoImprimeDados",
			data    : dataInput, 
			headers : {'Content-Type': 'application/x-www-form-urlencoded'}
		});
		
		request.success(function (data) {
			$scope.data.profile = data.reply;
		});
	}
});


app.controller('serviceInstitute', function ($scope, $http) {
	$http({method: 'POST', url: pathBase+"/ServiceInstituteOfEducation/getInstitutesOfEducation", 
	   headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }})
   .success(function(data){$scope.institutes = data.reply;})
   .error(function(data, status, headers, config) {alert("error: "+data);});
	
	$scope.getInstitute = function () {
		var dataInput = {"id":$scope.data.institute.id};
		var request = $http({
	    	method: "post",
    		url: pathBase+"/ServiceInstituteOfEducation/getInstituteOfEducation",
    		data    : dataInput, 
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
		});
	
		request.success(function (data) {
			$scope.data.institute = data.reply;
		});
	}

	$scope.createInstitute = function () {
		var dataInput = {"institute":$scope.data.institute};
		var request = $http({
			method: "post",
			url: pathBase+"/ServiceInstituteOfEducation/createInstituteOfEducation",
			data    : dataInput, 
			headers : {'Content-Type': 'application/x-www-form-urlencoded'}
		});
		
		request.success(function (data) {
			$scope.institutes.push(data.reply)
			$scope.data.institute = {};
		});
	}	

	$scope.loadInstitute = function (institute) {
	   $scope.data = {};

	   var copyInstitute = {}; 
	   for (i in institute) { 
		   copyInstitute[i] = institute[i]; 
	   }
	   
	   $scope.data.institute = copyInstitute;
	}
	
	$scope.cancel = function () {
		$scope.data.institute = {}
	}
	
	$scope.updateInstitute = function (id) {
		var dataInput = {"institute":$scope.data.institute};
		var request = $http({
			method: "post",
			url: pathBase+"/ServiceInstituteOfEducation/updateInstituteOfEducation",
			data    : dataInput, 
			headers : {'Content-Type': 'application/x-www-form-urlencoded'}
		});
		
		request.success(function (data) {
			for(i in $scope.institutes) {
				if($scope.institutes[i].id == id) {
					$scope.institutes[i] = $scope.data.institute;
					break;
				}
			}
			$scope.data.institute = {};
		});
	}
	
	$scope.deleteInstitute = function (id) {
		var dataInput = {"id":id};
		var request = $http({
	    	method: "post",
    		url: pathBase+"/ServiceInstituteOfEducation/deleteInstituteOfEducation",
    		data    : dataInput, 
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
		});
	
		request.success(function (data) {
			for(i in $scope.institutes) {
				if($scope.institutes[i].id == id) {
					$scope.institutes.splice(i, 1);
					break;
				}
			}
			$scope.data.institute = {};
		});
	}

	
	$scope.commandProfile = function () {
		var dataInput = {
				"arg1":"99", 
				"arg2":"77"
		};
		
		var request = $http({
			method: "post",
			url: pathBase+"/command/comandoImprimeDados",
			data    : dataInput, 
			headers : {'Content-Type': 'application/x-www-form-urlencoded'}
		});
		
		request.success(function (data) {
			$scope.data.institute = data.reply;
		});
	}
});

