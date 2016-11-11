angular.module("gettext").run(['gettextCatalog', function (gettextCatalog) {
		
	// Load the strings automatically during initialization.
	gettextCatalog.setStrings("pt", {
        "Registers": "Cadastros",
        "Profile" : "Perfil",
        "Institute of Education" : "Instituição de Ensino",
        "Institute" : "Instituição",
        "Employer" : "Empregador",
        
        "Name" : "Nome",
        "Document" : "Documento",
        "Date of Birth" : {"short":"Data Nasc",'$$noContext':"Data de Nascimento"},
    });
	
	gettextCatalog.setStrings("es", {
		"Registers": "Registros",
        "Profile" : "Perfil",
        "Institute of Education" : "Instituición de Educación",
        "Institute" : "Instituición",
        "Employer" : "Empleador",
        
        "Name" : "Apellido/Nombre",
        "Document" : "Documento",
        "Date of Birth" : {"short":"Fecha Nasc",'$$noContext':"Fecha de Nascimeinto"},
    });
	
}]);


