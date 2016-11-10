/**
 * @autor flaviodev - Flávio de Souza - fdsdev@gmail.com
 * 
 * register controller -  
 */
(function() {
	'use strict';
    
	app.controller('homeController', homeController);
	homeController.$inject = ["$scope", "gettextCatalog","tmhDynamicLocale"];

	function homeController ($scope, gettextCatalog,tmhDynamicLocale) {
		
	    // Locale switcher
	    $scope.locales = {
	        current: tmhDynamicLocale.get(),
	        available: {
		        'en-us': 'English',
		        'pt-br': 'Português (Brasil)',
		        'es-es': 'Español'	
			}
	    };

	    $scope.$watch('locales.current', function (locale) {
	        if (!locale) {
	            return;
	        }

	        var language = locale.substr(0, 2); 
	        gettextCatalog.setCurrentLanguage(language);
	        tmhDynamicLocale.set(locale);
	    });			
	}
})();
