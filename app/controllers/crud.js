/**
 * @autor flaviodev - Flávio de Souza - fdsdev@gmail.com
 * 
 * Controllers 
 */

/** 
 * NavigatorCtrl - controller associated to $routeProvider(app.js) 
 * to control the page navigation  
 */

/** 
 * ttmContext: name of application for invocation of services
 */

/** 
 * CrudControl - reuseble controller responsible for operations crud on standards windows  
 */
curriculum.controller('CrudCtrl', function ($scope, $http) {
   /** variables for crud operation setted id data custom attributes on first div in html file */
   // TODO create a web component for this
   var elementDivCrud = document.getElementById('Crud');
   var ttmModel = elementDivCrud.getAttribute("data-ttm-model");
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
   $http({method: 'GET', url: ttmModel, /** service resquest */ 
      headers: { 'Content-Type': 'application/json; charset=UTF-8' }})
      .success(function(data) {
    	 /** ttmCrudTable: collection that contais the registers of table, data: return of service */ 
    	  $scope[ttmCrudTable] = data; 
         //alert(data.toSource());
      })
      .error(function(data, status, headers, config) {
         alert("error: "+data);
      });

  /**
   * getObject - invoke the service that return a object (mapped entity) corresponding on id
   */
   $scope.getObject = function (id) {
	  
	  /** service resquest */
      var request = $http({
         method: "GET",
         url: ttmModel+"/"+id,
         headers:{'Content-Type': 'application/json; charset=UTF-8'}
      });
      
      request.success(function (data) {
    	 /** setting the returned register to crud form */
    	  $scope[ttmCrudGroupRegister][ttmCrudRegister] = data;
      });
   }

   /**
    * createObject: invoke the service that create a new object (mapped entity)
    */
   $scope.createObject = function (object) {
	  /** service resquest */
      var request = $http({
         method: "POST",
         url: ttmModel,
         data: object, 
         headers : {'Content-Type': 'application/json; charset=UTF-8'}
      });
      
      request.success(function (data) {
    	 /** pushing the created register to crud table */
    	  $scope[ttmCrudTable].push(data)
      });
      
  	  /** reseting crud form */
 	  $scope[ttmCrudGroupRegister][ttmCrudRegister] = {};
      
      /** updating state of mode view on form */
      $scope.view_mode = true;
      $scope.create_mode = false;
      $scope.edition_mode = false;
   }	

   /**
    * updateObject: invoke the service that update the object (mapped entity)
    */   
   $scope.updateObject = function (object) {
	  /** service resquest */
	  var request = $http({
         method: "PUT",
         url: ttmModel,
         data : object, 
         headers : {'Content-Type': 'application/json; charset=UTF-8'}
      });
      
      request.success(function (data) {
     	 /** updating the data on crud table */ 
    	  var arrayTable = $scope[ttmCrudTable];
    	  for(i in arrayTable) {
    	    if(arrayTable[i].id == object.id) {
    	    	arrayTable[i] = parseObjectToTable($scope[ttmCrudGroupRegister][ttmCrudRegister]);
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
      
      request.error(function (data, status, headers, config) {
    	  alert("error: "+data + " - "+status);
      });

   }
	
   /**
    * deleteObject: invoke the service that delete the object (mapped entity)
    */   
   $scope.deleteObject = function (idObject) {
	   /** Validation id object */
	   if(idObject==0) {
		   alert("Error: Id of object can.t be zero (0)");
		   return;
	   }
	   /** Validation if the delete request isnt about a object on edition */
	   if($scope[ttmCrudGroupRegister]!=null && $scope[ttmCrudGroupRegister][ttmCrudRegister].id==idObject) {
		   alert("Register is on edition! Can't be deleted.")
		   return;
	   }
      
      /** service resquest */
      var request = $http({
         method: "DELETE",
         url: ttmModel+"/"+idObject,
         headers: {'Content-Type': 'application/json; charset=UTF-8'}
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
    	  copyObject[i] = parseFieldToForm(object[i]);
      }

      /** setting copy object to crud form */
      $scope[ttmCrudGroupRegister][ttmCrudRegister] = copyObject;
      
      /** updating state of mode view on form */
      $scope.view_mode = false;
      $scope.create_mode = false;
      $scope.update_mode = true;
      $scope.edition_mode = true;
   }

   /** handle type conversions on data parse of table to form **/
   function parseFieldToForm(field) {
	   if(field.date!=null) {
		// parsing date to form
		   return new Date(Number(field.date));
	   }
	   
	   return field;
   }

   /** copy data of form to table, converting the type of data **/
   function parseObjectToTable(object) {
	  var copyObject = {};
	  for (i in object) {
		  copyObject[i] = parseFieldToTable(object[i]);
      }
	  
	  return copyObject;
   }
   
   /** handle type conversions on data parse of form to table **/
   function parseFieldToTable(field) {
	   if(field instanceof Date) {
		   // parsing date to table
		   var dateField = {};
		   dateField.date = field.getTime();
		   
		   return dateField;
	   }
	   return field;
   }

   /**
    * newObject: change view mode 
    */   
   $scope.newObject = function () {
  	  /** reseting crud form */
	  $scope[ttmCrudGroupRegister] = {};
  	  $scope[ttmCrudGroupRegister][ttmCrudRegister] = {};
	   
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
