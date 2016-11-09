
angular.module('app').config(function($routeProvider, $locationProvider) {
   $routeProvider
      .when('/', { 
         templateUrl:'app/modules/register/views/profile.html',
         controller:'navigationController'})
      
      .when('/profile', {
	     templateUrl:'app/modules/register/views/profile.html',
	     controller:'navigationController'})
      
	  .when('/instituteOfEducation', {
	     templateUrl:'app/modules/register/views/instituteOfEducation.html',
	     controller:'navigationController'})
	     
	  .when('/Employer', {
	     templateUrl:'app/modules/register/views/employer.html',
	     controller:'navigationController'})

	  .otherwise ({redirectTo: '/'}); 
});

