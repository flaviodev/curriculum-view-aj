/**
 * @autor flaviodev - Flávio de Souza - fdsdev@gmail.com
 * 
 * Controllers 
 */

/** 
 * NavigatorCtrl - controller associated to $routeProvider(app.js) 
 * to control the page navigation  
 */
app.controller('NavigatorCtrl', function($rootScope, $location){
	$rootScope.activetab = $location.path();
});

/** 
 * pathBase: name of application for invocation of services
 */

/** 
 * CrudControl - reuseble controller responsible for operations crud on standards windows  
 */
app.controller('CrudCtrl', function ($scope, $http) {
	/** variables that has the divs values on the html */
   var pathBase = document.getElementById('pathBase').innerHTML;
   var serviceGetObjects = document.getElementById('serviceGetObjects').innerHTML;
   
   $scope.view_mode=true;
   
   /** function responsible to return the registers of table */
   $http({method: 'POST', url: pathBase+"/"+serviceGetObjects, 
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }})
      .success(function(data) {
    	 /** registers: collection that contais the registers of table, data.reply: return of service */ 
         $scope.registers = data.reply; 
         //alert(data.toSource());
      })
      .error(function(data, status, headers, config) {
         alert("error: "+data);
      });

  /**
   * getObject - invoke the service that return a object (mapped entity) corresponding on id
   */
   $scope.getObject = function (id,service) {
  	 /** service parametter */
	  var dataInput = {"id":id};
      var request = $http({
         method: "post",
         url: pathBase+"/"+service,
         data: dataInput, 
         headers:{'Content-Type': 'application/x-www-form-urlencoded'}
      });
      
      request.success(function (data) {
    	 /** setting the returned register to form */
         $scope.form.register = data.reply;
      });
   }

   /**
    * createObject: invoke the service that create a new object (mapped entity)
    */
   $scope.createObject = function (object,service) {
	  /** service parametter */
	  var dataInput = {"object":object};
      var request = $http({
         method: "post",
         url: pathBase+"/"+service,
         data: dataInput, 
         headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      });
      
      request.success(function (data) {
    	 /** pushing the created register to table */
         $scope.registers.push(data.reply)
         /** reseting the form */
         $scope.form.register = {};
      });
      $scope.view_mode = true;
      $scope.create_mode = false;
      $scope.edition_mode = false;
   }	

   /**
    * loadObject: just copy the data of a register form table to edition on form
    */
   $scope.loadObject = function (object) {
      $scope.form = {};
      
      var copyObject = {}; 
      for (i in object) { 
          copyObject[i] = object[i]; 
      }

      $scope.form.register = copyObject;
      $scope.view_mode = false;
      $scope.create_mode = false;
      $scope.update_mode = true;
      $scope.edition_mode = true;
   }

   /**
    * newObject: change view mode 
    */   
   $scope.newObject = function () {
	  $scope.view_mode = false;
	  $scope.create_mode = true;
	  $scope.edition_mode = true;
   }   
   
   /**
    * cancelEdition: just reset the form
    */   
   $scope.cancelEdition = function () {
      $scope.form.register = {};
      $scope.view_mode = true;
      $scope.create_mode = false;
      $scope.update_mode = false;
      $scope.edition_mode = false;
   }

   /**
    * updateObject: invoke the service that update the object (mapped entity)
    */   
   $scope.updateObject = function (object,service) {
	  /** service parametter */
	  var dataInput = {"object":object};
      var request = $http({
         method: "post",
         url: pathBase+"/"+service,
         data : dataInput, 
         headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      });
      
      request.success(function (data) {
     	 /** updating the data on table */ 
    	 for(i in $scope.registers) {
            if($scope.registers[i].id == object.id) {
               $scope.registers[i] = $scope.form.register;
               break;
            }
         }
         $scope.form.register = {};
         $scope.view_mode = true;
         $scope.update_mode = false;
         $scope.edition_mode = false;
      });
   }
	
   /**
    * deleteObject: invoke the service that delete the object (mapped entity)
    */   
   $scope.deleteObject = function (idObject,service) {
	   if($scope.form.register.id==idObject) {
		   alert("This register is on edition! Can1t be deleted")
		   return;
	   }
	   
	   /** service parametter */
      var dataInput = {"id":idObject};
      var request = $http({
         method: "post",
         url: pathBase+"/"+service,
         data: dataInput, 
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });
 	   
      request.success(function (data) {
    	 /** removing the data on table */
    	 for(i in $scope.registers) {
            if($scope.registers[i].id == idObject) {
               $scope.registers.splice(i, 1);
               break;
            }
         }
      });
   }
});



