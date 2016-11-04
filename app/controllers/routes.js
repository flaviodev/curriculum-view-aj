curriculum.config(function($routeProvider, $locationProvider) {
   $routeProvider
      .when('/', { 
         templateUrl:'app/views/home.html',
         controller:'NavigatorCtrl'})
      
      .when('/profile', {
	     templateUrl:'app/views/profile.html',
	     controller:'NavigatorCtrl'})
      
	  .when('/instituteOfEducation', {
	     templateUrl:'app/views/instituteOfEducation.html',
	     controller:'NavigatorCtrl'})
	     
	  .when('/Employer', {
	     templateUrl:'app/views/Employer.html',
	     controller:'NavigatorCtrl'})

	  .otherwise ({redirectTo: '/'}); 
});

