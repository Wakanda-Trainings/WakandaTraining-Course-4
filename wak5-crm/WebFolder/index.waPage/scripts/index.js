
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
	var login2 = {};	// @login
// @endregion// @endlock

// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		var noteListTemplateSource = $("#note-list-template2").html();
		WAK5CRMUTIL.noteListTemplateFn = Handlebars.compile(noteListTemplateSource);
	
		WAK5CRMUTIL.setRecentItemsEventHandler();
		waf.sources.lead.declareDependencies('owner');
		
		
		if (WAF.directory.currentUser() === null) {
			WAK5CRMUTIL.setLoggedOutContext();
		} else {
			WAK5CRMUTIL.setLoggedInContext();
		}
	};// @lock

	login2.logout = function login2_logout (event)// @startlock
	{// @endlock
		WAK5CRMUTIL.setLoggedOutContext();
	};// @lock

	login2.login = function login2_login (event)// @startlock
	{// @endlock
		WAK5CRMUTIL.setLoggedInContext();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("login2", "logout", login2.logout, "WAF");
	WAF.addListener("login2", "login", login2.login, "WAF");
// @endregion
};// @endlock
