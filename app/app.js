var app = angular.module('app',['ngRoute']);
 
app.config(function($routeProvider, $locationProvider)
{
   // remove o # da url
  // $locationProvider.html5Mode(true);
 
   $routeProvider
 
   // para a rota '/', carregaremos o template home.html e o controller 'HomeCtrl'
   .when('/', {
      templateUrl : 'app/views/home.html',
      controller     : 'NavegacaoCtrl',
   })

   .when('/profile', {
	   templateUrl : 'app/views/profile.html',
	   controller  : 'NavegacaoCtrl',
   })

   .when('/instituteOfEducation', {
	   templateUrl : 'app/views/instituteOfEducation.html',
	   controller  : 'NavegacaoCtrl',
   })
   
   
   
   // caso não seja nenhum desses, redirecione para a rota '/'
   .otherwise ({ redirectTo: '/' });
});