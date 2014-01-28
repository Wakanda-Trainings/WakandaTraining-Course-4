
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var combobox1$ = getHtmlObj('combobox1'),
		combobox2$ = getHtmlObj('combobox2'),
		textField2$ = getHtmlObj('textField2');
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'activityDetail';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		setTimeout(function() {
			
			textField2$.datepicker();
			
			if (waf.sources.activity.isNewElement()) {
				//Super Hack
				combobox1$.find('input').val("Started");
				combobox2$.find('input').val("Normal");
			} else {
				//Super Hack
				combobox1$.find('input').val(waf.sources.activity.status);
				combobox2$.find('input').val(waf.sources.activity.priority);
			}
		}, 80);
		
		
		
		
	
	// @region namespaceDeclaration// @startlock
	var saveActivityButton = {};	// @button
	var cancelActivityButton = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	saveActivityButton.click = function saveActivityButton_click (event)// @startlock
	{// @endlock

		waf.sources.activity.save({
			onSuccess: function(event) {
				WAK5CRMUTIL.setMessage("Activity for " + waf.sources.lead.firstName + " " + waf.sources.lead.lastName + " has been saved to the server.", 5000, "normal");
		},
			
			onError: function(error) {
				//error['error'][0].message + " (" + error['error'][0].errCode + ")"
				//WAK5CRMUTIL.setMessage(error['error'][0].message + " (" + error['error'][0].errCode + ")", 7000, "error");
			}
		});
		
		$$(data.userData.activityDetailContainer).hide();
		$$(data.userData.detailMainContainer).show(); 
	};// @lock

	cancelActivityButton.click = function cancelActivityButton_click (event)// @startlock
	{// @endlock
		$$(data.userData.activityDetailContainer).hide();
		$$(data.userData.detailMainContainer).show(); 
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_saveActivityButton", "click", saveActivityButton.click, "WAF");
	WAF.addListener(this.id + "_cancelActivityButton", "click", cancelActivityButton.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
