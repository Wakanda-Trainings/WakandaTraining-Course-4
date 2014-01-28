
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'splashScreen';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var signUpButton = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	signUpButton.click = function signUpButton_click (event)// @startlock
	{// @endlock
		WAK5CRMUTIL.signUp(signUpObj);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_signUpButton", "click", signUpButton.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
