
angular.module('app').config(function($routeProvider, $locationProvider) {
   $routeProvider
      .when('/', { 
         templateUrl:'app/modules/register/profile/profile.view.html',
         controller:'navigationController'})
      
      .when('/Profile', {
	     templateUrl:'app/modules/register/profile/profile.view.html',
	     controller:'navigationController'})
      
	  .when('/InstituteOfEducation', {
	     templateUrl:'app/modules/register/instituteOfEducation/instituteOfEducation.view.html',
	     controller:'navigationController'})
	     
	  .when('/Employer', {
	     templateUrl:'app/modules/register/employer/employer.view.html',
	     controller:'navigationController'})

	  .otherwise ({redirectTo: '/'}); 
});

