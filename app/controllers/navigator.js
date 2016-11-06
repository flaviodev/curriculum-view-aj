/**
 * @autor flaviodev - Flávio de Souza - fdsdev@gmail.com
 * 
 * Controllers 
 */

/** 
 * NavigatorCtrl - controller associated to $routeProvider(app.js) 
 * to control the page navigation  
 */
curriculum.controller('NavigatorCtrl', function($rootScope, $location){
	$rootScope.activetab = $location.path();
});

