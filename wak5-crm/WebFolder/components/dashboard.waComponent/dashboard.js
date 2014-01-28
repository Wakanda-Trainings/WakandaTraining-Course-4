
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var leadsButton = getHtmlId('leadsButton'),
		contactsButton = getHtmlId('contactsButton'),
		accountsButton = getHtmlId('accountsButton'),
		activityButton = getHtmlId('activityButton'),
		homeButton = getHtmlId('homeButton'),
		dealsButton = getHtmlId('dealsButton'),
		signedInComponent = getHtmlId('signedInComponent'),
		recentItemsBodyContainer = getHtmlId('recentItemsBodyContainer'),
		mainMenubarContainer = getHtmlId('mainMenubarContainer');
		
	WAK5CRMUTIL.mainMenubarObj = new WAK5CRMUTIL.MetroRadioMenuBar(mainMenubarContainer);		
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'dashboard';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
		function handleMainMenuBarSelect(ev) {	
			if (!ev.options) {
				ev.options = {view: "list"};
			}
			
		  	switch(ev.buttonElemId) {
		  		case homeButton :
				$$(signedInComponent).loadComponent({path: '/components/home.waComponent'});
				break;
				
	   			case leadsButton :
	   			waf.sources.lead.collectionRefresh();
				$$(signedInComponent).loadComponent({path: '/components/leads.waComponent', userData: {view: ev.options.view}});
				break;
				
				case contactsButton :
				waf.sources.contact.collectionRefresh();
				$$(signedInComponent).loadComponent({path: '/components/contacts.waComponent', userData: {view: ev.options.view}});
				break;
				
				case accountsButton :
				waf.sources.account.collectionRefresh();
				$$(signedInComponent).loadComponent({path: '/components/accounts.waComponent', userData: {view: ev.options.view}});
				break;
				
				case activityButton :
				//Note: Refactor. Bug. onRestrictingQuery for Activity won't fire.
				ds.User.find("email = :1", waf.directory.currentUser().userName, {
					onSuccess: function(event) {
							
						waf.sources.activity.query("owner.ID = :1", event.entity.ID.value);
						/*
						if (waf.directory.currentUserBelongsTo('Manager') || waf.directory.currentUserBelongsTo('Administrator')) {
							waf.sources.activity.all();
						} else {
							waf.sources.activity.query("owner.ID = :1", event.entity.ID.value);
						}
						*/
					}
				});
				$$(signedInComponent).loadComponent({path: '/components/activity.waComponent'});
				break;

				
				default:
				WAK5CRMUTIL.setMessage("This option is not yet implemented", 4000, "error");
					
	   		} //end - switch
		} //end - function handleMainMenuBarSelect
		
		WAK5CRMUTIL.mainMenubarObj.subscribe(handleMainMenuBarSelect, "on select"); 
		/*
		if (waf.directory.currentUser().userName == "greg@wakanda.org") {
			WAK5CRMUTIL.mainMenubarObj.setSelectedMenuItem(2);
		} else {
			WAK5CRMUTIL.mainMenubarObj.setSelectedMenuItem(0);
		}
		*/
		WAK5CRMUTIL.mainMenubarObj.setSelectedMenuItem(0);
		//WAK5CRMUTIL.mainMenubarObj.setSelectedMenuItem(1, {view: "list"});
		WAK5CRMUTIL.loadRecentItems(recentItemsBodyContainer);
		
	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
