(function() {
	'use strict';

	angular.module('app').service('registerService', registerService);
	registerService.$inject = ["$http"];

	function registerService ($http) {
		/* jshint validthis: true */
		var self = this;

		self.servicePath;
		self.setServicePath = setServicePath;
		function setServicePath(servicePath) {
			self.servicePath = servicePath;
		}		
		
		self.resource;
		self.setResource = setResource;
		function setResource(resource) {
			self.resource = resource;
		}		
		
		self.header = {'Content-Type': 'application/json; charset=UTF-8'};
		
		function getUri() {
			return self.servicePath+"/"+self.resource; 
		}
		
		function doRequest(requestMethod, requestUrl, requestData, onSuccessFunction, onErrorFunction) {
			var request = $http({
				method: requestMethod,
				url: requestUrl,
				data: requestData,
				headers: self.header
			});
			
			request.success(function (data, status) {
				onSuccessFunction(status,data);
			});
			
			request.error(function (data, status, headers, config) {
				onErrorFunction(status,data);
			});			
		}

		self.getAllObjects = getAllObjects;
		function getAllObjects(onSuccessFunction, onErrorFunction) {
			doRequest("GET", getUri(), null, onSuccessFunction, onErrorFunction); 
		}
		
		self.getObject = getObject;
		function getObject(id, onSuccessFunction, onErrorFunction) {
			doRequest("GET", getUri()+"/"+id, null, onSuccessFunction, onErrorFunction); 
		}
		
		self.postObject = postObject;
		function postObject(object, onSuccessFunction, onErrorFunction) {
			doRequest("POST", getUri(), object, onSuccessFunction, onErrorFunction);
		}
		
		self.putObject = putObject;
		function putObject(object, onSuccessFunction, onErrorFunction) {
			doRequest("PUT", getUri(), object, onSuccessFunction, onErrorFunction);			
		}
		
		self.deleteObject = deleteObject;
		function deleteObject(id, onSuccessFunction, onErrorFunction) {
			doRequest("DELETE", getUri()+"/"+id, null, onSuccessFunction, onErrorFunction);			
		}
	}
})()