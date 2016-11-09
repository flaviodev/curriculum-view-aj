var $=jQuery;

var curriculum = angular.module('curriculum', ['ngRoute','ngTable']);

function tablePaging($scope, $filter, NgTableParams, dataArray, pageCount, sortBy, filterBy) {
	var initialParams = { 
		count: pageCount,
		sorting: sortBy,
		filter: filterBy
	};
		
	var initialSettings = { 
		counts: [pageCount, pageCount*2, pageCount*5, pageCount*10],
		getData: function(params) {
			var orderedData = params.sorting() ? $filter('orderBy')(dataArray, params.orderBy()) : dataArray;
			var filteredData = $filter('filter')(orderedData, params.filter());
	        var paginedData = filteredData.slice((params.page() - 1) * params.count(), params.page() * params.count());
	        params.total(filteredData.length);
	        return paginedData;
	    },
		paginationMaxBlocks: 3,
		paginationMinBlocks: 2,
	};

	$scope.tableParams = new NgTableParams(initialParams, initialSettings);
}


function showMessage(idElement,typeMessage, message) {
    $("#"+idElement).show('fast');
	$("#"+idElement).addClass('alert alert-'+typeMessage);
	$("#"+idElement).html(message);
	setTimeout(function(){
		$("#"+idElement).removeClass('alert alert-'+typeMessage);
		$("#"+idElement).hide('fast');
	},4000);
}

curriculum.directive('showFocus', function($timeout) {
	  return function(scope, element, attrs) {
	    scope.$watch(attrs.showFocus, 
	      function (newValue) { 
	        $timeout(function() {
	            newValue && element[0].focus();
	        });
	      },true);
	  };    
	});