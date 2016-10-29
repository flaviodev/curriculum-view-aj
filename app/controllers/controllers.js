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
 * ttmContext: name of application for invocation of services
 */

/** 
 * CrudControl - reuseble controller responsible for operations crud on standards windows  
 */
app.controller('CrudCtrl', function ($scope, $http) {
   /** variables for crud operation setted id data custom attributes on first div in html file */
   // TODO create a web component for this
   var elementDivCrud = document.getElementById('Crud');
   
   var ttmContext = elementDivCrud.getAttribute("data-ttm-context");
   var ttmGetObjects = elementDivCrud.getAttribute("data-ttm-getobjects");
   var ttmGetObject = elementDivCrud.getAttribute("data-ttm-getobject");
   var ttmCreateObject = elementDivCrud.getAttribute("data-ttm-createobject"); 
   var ttmUpdateObject = elementDivCrud.getAttribute("data-ttm-updateobject"); 
   var ttmDeleteObject = elementDivCrud.getAttribute("data-ttm-deleteobject"); 
   var ttmCrudGroupRegister = elementDivCrud.getAttribute("data-ttm-crudgroupregister"); 
   var ttmCrudRegister = elementDivCrud.getAttribute("data-ttm-crudregister"); 
   var ttmCrudTable = elementDivCrud.getAttribute("data-ttm-crudtable"); 
   
   /** setting initial state of mode view on form */ 
   $scope.view_mode=true;
   $scope.create_mode = false;
   $scope.update_mode = false;
   $scope.edition_mode = false;   
   
   /** Crude operations (invoke crud services) */
   
   /** 
    * getObjects - function responsible to return the registers of crud table 
    */
   $http({method: 'POST', url: ttmContext+"/"+ttmGetObjects, /** service resquest */ 
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }})
      .success(function(data) {
    	 /** ttmCrudTable: collection that contais the registers of table, data.reply: return of service */ 
    	  $scope[ttmCrudTable] = data.reply; 
         //alert(data.toSource());
      })
      .error(function(data, status, headers, config) {
         alert("error: "+data);
      });

  /**
   * getObject - invoke the service that return a object (mapped entity) corresponding on id
   */
   $scope.getObject = function (id) {
  	 /** service parametter */
	  var dataInput = {"id":id};
	  
	  /** service resquest */
      var request = $http({
         method: "post",
         url: ttmContext+"/"+ttmGetObject,
         data: dataInput, 
         headers:{'Content-Type': 'application/x-www-form-urlencoded'}
      });
      
      request.success(function (data) {
    	 /** setting the returned register to crud form */
    	  $scope[ttmCrudGroupRegister][ttmCrudRegister] = data.reply;
      });
   }

   /**
    * createObject: invoke the service that create a new object (mapped entity)
    */
   $scope.createObject = function (object) {
	  /** service parametter */
	  var dataInput = {"object":object};
	  
	  /** service resquest */
      var request = $http({
         method: "post",
         url: ttmContext+"/"+ttmCreateObject,
         data: dataInput, 
         headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      });
      
      request.success(function (data) {
    	 /** pushing the created register to crud table */
    	  $scope[ttmCrudTable].push(data.reply)
         /** reseting the form */
         $scope[ttmCrudGroupRegister][ttmCrudRegister] = {};
      });
      
      /** updating state of mode view on form */
      $scope.view_mode = true;
      $scope.create_mode = false;
      $scope.edition_mode = false;
   }	

   /**
    * updateObject: invoke the service that update the object (mapped entity)
    */   
   $scope.updateObject = function (object) {
	  /** service parametter */
	  var dataInput = {"object":object};
      
	  /** service resquest */
	  var request = $http({
         method: "post",
         url: ttmContext+"/"+ttmUpdateObject,
         data : dataInput, 
         headers : {'Content-Type': 'application/x-www-form-urlencoded'}
      });
      
      request.success(function (data) {
     	 /** updating the data on crud table */ 
    	  var arrayTable = $scope[ttmCrudTable];
    	  for(i in arrayTable) {
    	    if(arrayTable[i].id == object.id) {
    	    	arrayTable[i] = $scope[ttmCrudGroupRegister][ttmCrudRegister];
               break;
            }
         }
    	 
    	 /** reseting crud form */
    	 $scope[ttmCrudGroupRegister][ttmCrudRegister] = {};
         
         /** updating state of mode view on form */
         $scope.view_mode = true;
         $scope.update_mode = false;
         $scope.edition_mode = false;
      });
   }
	
   /**
    * deleteObject: invoke the service that delete the object (mapped entity)
    */   
   $scope.deleteObject = function (idObject) {
	   /** Validation if the delete request isnt about a object on edition */
	   if($scope[ttmCrudGroupRegister][ttmCrudRegister].id==idObject) {
		   alert("Register is on edition! Can't be deleted.")
		   return;
	   }
	   
	   /** service parametter */
      var dataInput = {"id":idObject};
      
      /** service resquest */
      var request = $http({
         method: "post",
         url: ttmContext+"/"+ttmDeleteObject,
         data: dataInput, 
         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });
 	   
      request.success(function (data) {
    	 /** removing the data on crud table */
    	 var arrayTable = $scope[ttmCrudTable]; 
    	 for(i in arrayTable) {
            if(arrayTable[i].id == idObject) {
            	arrayTable.splice(i, 1);
               break;
            }
         }
      });
   }
   
   /** State of view operations (not invoke crud services) */
   
   /**
    * loadObject: just copy the data of a register form crud table to edition on crud form
    */
   $scope.loadObject = function (object) {
	   /** reset the model object of crud form */
	   $scope[ttmCrudGroupRegister] = {};
      
	   /** coping data of the crud table object to other object for after updating */
      var copyObject = {}; 
      for (i in object) { 
          copyObject[i] = object[i]; 
      }

      /** setting copy object to crud form */
      $scope[ttmCrudGroupRegister][ttmCrudRegister] = copyObject;
      
      /** updating state of mode view on form */
      $scope.view_mode = false;
      $scope.create_mode = false;
      $scope.update_mode = true;
      $scope.edition_mode = true;
   }

   /**
    * newObject: change view mode 
    */   
   $scope.newObject = function () {
	  /** updating state of mode view on form */
	  $scope.view_mode = false;
	  $scope.create_mode = true;
	  $scope.edition_mode = true;
   }   
   
   /**
    * cancelEdition: just reset the form
    */   
   $scope.cancelEdition = function () {
	   /** reseting crud form */
	  $scope[ttmCrudGroupRegister][ttmCrudRegister] = {};

	  /** updating state of mode view on form */
      $scope.view_mode = true;
      $scope.create_mode = false;
      $scope.update_mode = false;
      $scope.edition_mode = false;
   }
});
