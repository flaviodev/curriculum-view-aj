/**
 * @autor flaviodev - Flávio de Souza - fdsdev@gmail.com
 * 
 * Modules 
 */

/** routeProvider - page navigation */
var app = angular.module('app',['ngRoute']);
app.config(function($routeProvider, $locationProvider)
{
   $routeProvider
      .when('/', { /** for route '/', load the template home.html */
         templateUrl:'app/views/home.html',
         controller:'NavigatorCtrl'})
      
      .when('/profile', {
	     templateUrl:'app/views/profile.html',
	     controller:'NavigatorCtrl'})
      
	  .when('/instituteOfEducation', {
	     templateUrl:'app/views/instituteOfEducation.html',
	     controller:'NavigatorCtrl'})

	  .otherwise ({redirectTo: '/'}); /** if dont find a route, redirect to route '/'  */
});