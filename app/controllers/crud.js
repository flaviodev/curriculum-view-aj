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
curriculum.controller('CrudCtrl', function ($scope, $http, $filter, NgTableParams) {
   /** variables for crud operation setted id data custom attributes on first div in html file */
   // TODO create a web component for this
   var elementDivCrud = document.getElementById('Crud');
   var ttmEntity = elementDivCrud.getAttribute("data-ttm-entity"); 
   var ttmControlService = elementDivCrud.getAttribute("data-ttm-control-service");
   var urlControlService = "/" + ttmControlService + "/" + ttmEntity;
   
   /** setting initial state of mode view on form */ 
   $scope.view_state=true;
   $scope.edition_state = false;   
   $scope.creating_mode = false;
   $scope.updating_mode = false;
   
   var objects = [];
   
   /** Crude operations (invoke crud services) */
   
   /** 
    * getObjects - function responsible to return the registers of crud table 
    */
   $http({method: 'GET', url: urlControlService, /** service resquest */ 
      headers: { 'Content-Type': 'application/json; charset=UTF-8' }})
      .success(function(data) {
    	 /** ttmCrudTable: collection that contais the registers of table, data: return of service */ 
		 var sorting = { name: "asc" };
    	 var filter = {name:""};
    	
    	 objects = data;
    	 
    	 tablePaging($scope, $filter, NgTableParams, objects, 5, sorting, filter);      
      })
      .error(function(data, status, headers, config) {
    	  showMessage("message-status","danger",'Error trying get profiles: '+data);
      });

  /**
   * getObject - invoke the service that return a object (mapped entity) corresponding on id
   */
   $scope.getObject = function (id) {
	  /** service resquest */
      var request = $http({
         method: "GET",
         url: urlControlService+"/"+id,
         headers:{'Content-Type': 'application/json; charset=UTF-8'}
      });
      
      request.success(function (data) {
    	 /** setting the returned register to crud form */
    	  $scope[ttmEntity] = data;
      });
   }

   /**
    * createObject: invoke the service that create a new object (mapped entity)
    */
   $scope.createObject = function (object) {
	  /** service resquest */
      var request = $http({
         method: "POST",
         url: urlControlService,
         data: object, 
         headers : {'Content-Type': 'application/json; charset=UTF-8'}
      });
      
      request.success(function (data) {
    	 /** pushing the created register to crud table */
  		  objects.push(parseObjectToTable(data));
		
		  $scope.tableParams.reload();
		  $scope.tableParams.sorting();
		
		  /** reseting crud form */
		  $scope[ttmEntity] = {};

		  /** updating state of mode view on form */
		  $scope.view_state = true;
		  $scope.creating_mode = false;
		  $scope.edition_state = false;
		  
		  showMessage("message-status","success",'Profile saved with success');
      });
      
      request.error(function (data, status, headers, config) {
    	  showMessage("message-status","danger",'Error trying save profile: '+data);
      });
   }	

   /**
    * updateObject: invoke the service that update the object (mapped entity)
    */   
   $scope.updateObject = function (object) {
	  /** service resquest */
	  var request = $http({
         method: "PUT",
         url: urlControlService,
         data : object, 
         headers : {'Content-Type': 'application/json; charset=UTF-8'}
      });
      
      request.success(function (data) {
     	 /** updating the data on crud table */ 
     	 for(i in objects) {
       	    if(objects[i].id == object.id) {
       	    	objects[i] = parseObjectToTable(data);
                  break;
               }
          }

          $scope.tableParams.reload();

          /** reseting crud form */
    	  $scope[ttmEntity] = {};

    	  /** updating state of mode view on form */
    	  $scope.view_state = true;
    	  $scope.updating_mode = false;
    	  $scope.edition_state = false;
    	  
		  showMessage("message-status","success",'Profile udated with success');
      });
      
      request.error(function (data, status, headers, config) {
    	  showMessage("message-status","danger",'Error trying update profile: '+data);
      });
   }
	
   /**
    * deleteObject: invoke the service that delete the object (mapped entity)
    */   
   $scope.deleteObject = function (object) {
	   /** Validation if the delete request isnt about a object on edition */
	   if($scope[ttmEntity]!=null && $scope[ttmEntity].id==object.id) {
		   alert("Register is on edition! Can't be deleted.")
		   return;
	   }
      
      /** service resquest */
      var request = $http({
         method: "DELETE",
         url: urlControlService+"/"+object.id,
         headers: {'Content-Type': 'application/json; charset=UTF-8'}
      });
 	   
      request.success(function (data) {
    	 /** removing the data on crud table */
  	     var index = objects.indexOf(object);
	     objects.splice(index,1);
	   
	     $scope.tableParams.reload().then(function(data) {
	         if ($scope.tableParams.data.length === 0 && $scope.tableParams.total() > 0) {
	        	 $scope.tableParams.page($scope.tableParams.page() - 1);
	        	 $scope.tableParams.reload();
	           }
	     });
		
		 showMessage("message-status","success",'Profile deleted with success');
      });
      
      request.error(function (data, status, headers, config) {
    	  showMessage("message-status","danger",'Error trying delete profile: '+data);
      });
   }
   
   /** State of view operations (not invoke crud services) */
   
   /**
    * loadObject: just copy the data of a register form crud table to edition on crud form
    */
   $scope.loadObject = function (object) {
	   /** coping data of the crud table object to other object for after updating */
       var copyobject = {}; 
	   for (i in object) {
		   copyobject[i] = parseFieldToForm(object[i]);
	   }

	   /** setting copy object to crud form */
	   $scope[ttmEntity] = copyobject;
	     
	   $scope.view_state = false;
	   $scope.creating_mode = false;
	   $scope.updating_mode = true;
	   $scope.edition_state = true;
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
      $scope[ttmEntity] = {};
      
      /** updating state of mode view on form */
      $scope.view_state = false;
	  $scope.creating_mode = true;
	  $scope.edition_state = true;
   }   
   
   /**
    * cancelEdition: just reset the form
    */   
   $scope.cancelEdition = function () {
	   /** reseting crud form */
	  $scope[ttmEntity] = {};

	  /** updating state of mode view on form */
	  $scope.view_state=true;
	  $scope.edition_state = false;   
	  $scope.creating_mode = false;
	  $scope.updating_mode = false;
   }
});

