
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'recentItems';
	// @endregion// @endlock

	this.load = function (data) {// @lock

		//WAK5CRMUTIL.loadRecentItems('mainComponent_recentItemsComponent_recentItemsBodyContainer'); //Note: Need to refactor to not reference components directly (July 11. 2013).
		
	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
