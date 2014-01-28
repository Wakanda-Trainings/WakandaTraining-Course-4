
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var welcomeMessageRichText = getHtmlId('welcomeMessageRichText'),
		chartContainerPlaceHolder = getHtmlId('chartContainerPlaceHolder'),
		component1 = getHtmlId('component1'),
		messageChangeOwnerContainer = getHtmlId('messageChangeOwnerContainer'),
		noMessagesContainer = getHtmlId('noMessagesContainer'),
		
		//Transferred Leads, Contacts, Accounts Messages.
		selectedTransferredUL$ = getHtmlObj('selectedTransferredUL'), //selectedTransferredUL
		selectedTransferredListTemplateSource = $('#selected-transferred-list-template').html(), //selected-transferred-list-template
		selectedTransferredListTemplateFn = Handlebars.compile(selectedTransferredListTemplateSource),
		transferredData = {};
	
	
	function buildSelectedTransferredList(selectedTransferredCollection) {
		selectedTransferredUL$.children().remove(); 
		
		selectedTransferredCollection.forEach({
			onSuccess: function(ev2) {	
			
				transferredData = 	{
					fullName:  	ev2.entity.fullName.getValue(),
					company: 	ev2.entity.company.getValue(),
					email: 		ev2.entity.emailAccnt.getValue(),
					dataId: 	ev2.entity.ID.getValue()
				}; 
				
				selectedTransferredUL$.append(selectedTransferredListTemplateFn(transferredData));
			}
		});
	} //end - buildSelectedLeadsList.
		
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'home';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		setTimeout(function() {
			//Have any Leads been transferred to this user?
			ds.Lead.query("changeOwnerFlag == :1", true, {
				onSuccess: function(ev) {
					if (ev.entityCollection.length > 0) {
						console.log(messageChangeOwnerContainer);
						buildSelectedTransferredList(ev.entityCollection);
						$$(noMessagesContainer).hide();
						$$(messageChangeOwnerContainer).show();
					}
				}
			});
			
			$$(component1).loadComponent({path: '/components/leadStatus.waComponent'});
			
			$$(welcomeMessageRichText).setValue("Welcome " + waf.directory.currentUser().fullName);
			//waf.sources.activity.query("status !== :1", "Completed");
			
			//Note: Refactor. Bug. onRestrictingQuery for Activity won't fire.
			ds.User.find("email == :1", waf.directory.currentUser().userName,  {
				onSuccess: function(event) {
						
					waf.sources.activity.query("owner.ID = :1 && status != :2", event.entity.ID.value, "Completed");
					/*
					if (waf.directory.currentUserBelongsTo('Manager') || waf.directory.currentUserBelongsTo('Administrator')) {
						waf.sources.activity.all();
					} else {
						waf.sources.activity.query("owner.ID = :1", event.entity.ID.value);
					}
					*/
				}
			});
		}, 200);
		
		
		selectedTransferredUL$.on('mouseenter', '.selectedTransferred', function (event) {
	   		$(this).addClass('hoverTransferred');
		});
		
		selectedTransferredUL$.on('mouseleave', '.selectedTransferred', function (event) {
	   		$(this).removeClass('hoverTransferred');
		});
		
		
	// @region namespaceDeclaration// @startlock
	var messageDismissButton = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	messageDismissButton.click = function messageDismissButton_click (event)// @startlock
	{// @endlock
		waf.sources.lead.changeOwnerAcknowledgement({
			onSuccess: function(event) {
				WAK5CRMUTIL.setMessage(event.result, 4000);
			}
		});
		
		$$(messageChangeOwnerContainer).hide();
		$$(noMessagesContainer).show();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_messageDismissButton", "click", messageDismissButton.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
