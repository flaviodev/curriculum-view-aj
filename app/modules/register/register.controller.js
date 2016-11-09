/**
 * @autor flaviodev - Flávio de Souza - fdsdev@gmail.com
 * 
 * register controller -  
 */
(function() {
	'use strict';
    
	angular.module('app').controller('registerController', registerController);
	registerController.$inject = ["$scope", "$window", "$filter", "NgTableParams", "registerService"];

	function registerController ($scope, $window, $filter, NgTableParams, registerService) {
		/* jshint validthis: true */
		var self = this;

		/** CRUD entity for comunication with control layer (assembly url) */
		self.ttmEntity = $("#ttm-crud-config").attr("resource"); 
		
		/** CRUD entity name for showing on screen */
		self.ttmEntityName = $("#ttm-crud-config").attr("name-resource");
		
		var sortByColumn;
		var sortByValue;
		
		var filterByColumn;
		var filterByValue;
		
		self.ttmSortBy = $("#registers-table").attr("ttm-sort-by"); 
		self.ttmFilterBy = $("#registers-table").attr("ttm-filter-by");
		
		if(self.ttmSortBy != undefined && self.ttmSortBy.indexOf(":")>-1) {
			var partsOfSortBy = self.ttmSortBy.split(":");
			sortByColumn = partsOfSortBy[0];
			sortByValue = partsOfSortBy[1];
		}
		
		if(self.ttmFilterBy != undefined && self.ttmFilterBy.indexOf(":")>-1) {
			var partsOfFilterBy = self.self.ttmFilterBy.split(":");
			filterByColumn = partsOfFilterBy[0];
			filterByValue = partsOfFilterBy[1];
		}

		/** setting initial state of mode view on form */ 
		self.view_state=true;
		self.edition_state = false;   
		self.creating_mode = false;
		self.updating_mode = false;
		
		/** register array for storing the table data on screen */
		var objects = [];
		
		
		/** Crude operations (invoke crud services) */
		
		registerService.setServicePath(controlLayerService);
		registerService.setResource(self.ttmEntity);
		
		/** 
	    * getObjects - function responsible to return the registers of crud table 
	    */
		registerService.getAllObjects(
		    /** onSuccessFunction */
			function (status, data) {
				if(status == 200) {
					/** ttmCrudTable: collection that contais the registers of table, data: return of service */ 
					objects = data;
				} 
				  
				var sorting = {};
				if(sortByColumn != undefined) {
					sorting[sortByColumn] = sortByValue;
				}
				
				var filter = {};
				if(filterByColumn != undefined) {
					filter[filterByColumn] = filterByValue;
				}
				
				self.tableParams = tablePaging($scope, $filter, NgTableParams, objects, 5, sorting, filter);
		    },
		    /** onErrorFunction */
		    function (status, data) {
		    	alert('Error trying get '+self.ttmEntityName+' registers: ' + data);
		    }
		);
		
		/**
		 * getObject - invoke the service that return a object (mapped entity) corresponding on id
		 */
		self.getObject = getObject;
		function getObject(id) {
			registerService.getObject(id,
			    /** onSuccessFunction */
				function (status, data) {
					$scope.register = data;
				},
			    /** onErrorFunction */
			    function (status, data) {
					alert('Error trying get '+self.ttmEntityName+' registers: ' + data);
				}
			);					
		}
		
		/**
		* createObject: invoke the service that create a new object (mapped entity)
		*/
		self.createObject = createObject;
		function createObject(object) {
			registerService.postObject(object,
			    /** onSuccessFunction */
				function (status, data) {
					/** pushing the created register to crud table */
					objects.push(parseObjectToTable(data));
					self.tableParams.reload();
					self.tableParams.sorting();
					
					/** reseting crud form */
					$scope.register = {};
					
					/** updating state of mode view on form */
					self.view_state = true;
					self.creating_mode = false;
					self.edition_state = false;
					
					showMessage("message-status","success",self.ttmEntityName+' saved with success');	
				},
			    /** onErrorFunction */
			    function (status, data) {
					alert('Error trying save '+self.ttmEntityName+': '+data);
				}
			);					
		}

		/**
		* updateObject: invoke the service that update the object (mapped entity)
		*/
		self.updateObject = updateObject;
		function updateObject(object) {
			registerService.putObject(object,
			    /** onSuccessFunction */
				function (status, data) {
					/** updating the data on crud table */ 
					for(var i in objects) {
						if(objects[i].id == object.id) {
							objects[i] = parseObjectToTable(data);
							break;
						}
					}
	
					self.tableParams.reload();
	
					/** reseting crud form */
					$scope.register = {};
	
					/** updating state of mode view on form */
					self.view_state = true;
					self.updating_mode = false;
					self.edition_state = false;
	
					showMessage("message-status","success",self.ttmEntityName+' updated with success');
				},
			    /** onErrorFunction */
			    function (status, data) {
					alert('Error trying update '+self.ttmEntityName+': '+data);
				}
			);					
		}

		/**
		* deleteObject: invoke the service that delete the object (mapped entity)
		*/
		self.deleteObject = deleteObject;
		function deleteObject(object) {

			/** Validation if the delete request isnt about a object on edition */
			if($scope.register!=null && $scope.register.id==object.id) {
				alert("Register is on edition! Can't be deleted.")
				return;
			}
			
			registerService.deleteObject(object.id,
			    /** onSuccessFunction */
				function (status, data) {
					/** removing the data on crud table */
					var index = objects.indexOf(object);
					objects.splice(index,1);
					   
					self.tableParams.reload().then(function(data) {
						if (self.tableParams.data.length === 0 && self.tableParams.total() > 0) {
							self.tableParams.page(self.tableParams.page() - 1);
							self.tableParams.reload();
						}
					});
						
					showMessage("message-status","success",self.ttmEntityName+' deleted with success');
				},
			    /** onErrorFunction */
			    function (status, data) {
					alert('Error trying delete '+self.ttmEntityName+': '+data);
				}
			);					
		}
		
		/** State of view operations (not invoke crud services) */
		   
		/**
		* loadObject: just copy the data of a register form crud table to edition on crud form
		*/
		self.loadObject = loadObject;
		function loadObject(object) {
			/** coping data of the crud table object to other object for after updating */
			var copyobject = {}; 
			for(var i in object) {
				copyobject[i] = parseFieldToForm(object[i]);
			}
		
			/** setting copy object to crud form */
			$scope.register = copyobject;
			
			self.view_state = false;
			self.creating_mode = false;
			self.updating_mode = true;
			self.edition_state = true;
		}

		/**
		* newObject: change view mode 
		*/   
		self.newObject = newObject;
		function newObject() {
			/** reseting crud form */
			$scope.register = {};
		  
			/** updating state of mode view on form */
			self.view_state = false;
			self.creating_mode = true;
			self.edition_state = true;
		}   
		   
		/**
		* cancelEdition: just reset the form
		*/   
		self.cancelEdition = cancelEdition; 
		function cancelEdition() {
			/** reseting crud form */
			$scope.register = {};
			
			/** updating state of mode view on form */
			self.view_state=true;
			self.edition_state = false;   
			self.creating_mode = false;
			self.updating_mode = false;
		}
		   
		/**
		* showDeleteConfirm: show dialog window for confirming the deletation
		*/   
		self.showDeleteConfirm = showDeleteConfirm;
		function showDeleteConfirm(object) {
			if ($window.confirm("Would you like to delete this register?")) {
				self.deleteObject(object);
			}
		}   
		
		/** parsing data form<->table  */
   
		/** handle type conversions on data parse of table to form **/
		function parseFieldToForm(field) {
			if(field.date!=null) {
				//parsing date to form
				return new Date(Number(field.date));
			}
		
			return field;
		}

		/** copy data of form to table, converting the type of data **/
		function parseObjectToTable(object) {
			var copyObject = {};
			
			for(var i in object) {
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
	}
})();
