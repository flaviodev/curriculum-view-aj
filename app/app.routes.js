
angular.module('app').config(function($routeProvider, $locationProvider) {
   $routeProvider
      .when('/', { 
         templateUrl:'app/modules/crud/profile/profile.view.html',
         controller:'navigationController'})
      
      .when('/Profile', {
	     templateUrl:'app/modules/crud/profile/profile.view.html',
	     controller:'navigationController'})
      
	  .when('/InstituteOfEducation', {
	     templateUrl:'app/modules/crud/instituteOfEducation/instituteOfEducation.view.html',
	     controller:'navigationController'})
	     
	  .when('/Employer', {
	     templateUrl:'app/modules/crud/employer/employer.view.html',
	     controller:'navigationController'})

	  .otherwise ({redirectTo: '/'}); 
});

