/**
* @doc
* @example <ttm-crud-title></ttm-crud-title>
*/
angular.module('app').directive('showFocus', showFocus);
function showFocus($timeout) {
	return function(scope, element, attrs) {
		scope.$watch(attrs.showFocus, function (newValue) { 
			$timeout(function() {
				newValue && element[0].focus();
			});
		},true);
	};
}

