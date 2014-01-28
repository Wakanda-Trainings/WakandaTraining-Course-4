
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
		selectedPeopleUL$ = getHtmlObj('selectedPeopleUL'),
		selectedPeopleListTemplateSource = $('#selected-people-list-template').html(),
		selectedPeopleListTemplateFn = Handlebars.compile(selectedPeopleListTemplateSource),
		combobox1 = getHtmlId('combobox1'),
		peopleData = {};
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'changeOwner';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		selectedPeopleUL$.on('mouseenter', '.selectedPeople', function (event) {
	   		$(this).addClass('hoverPeople');
		});
		
		selectedPeopleUL$.on('mouseleave', '.selectedPeople', function (event) {
	   		$(this).removeClass('hoverPeople');
		});
	
		waf.ds.User.getOtherUsers({
			onSuccess: function(event) {
				$comp.sourcesVar.otherGuysArr = event.result.slice(0);
				$comp.sources.otherGuysArr.sync();	
			} //end - onSuccess
		});
		
		
		function buildSelectedPeopleList(selectedPeopleCollection) {
			selectedPeopleUL$.children().remove(); 
			
			selectedPeopleCollection.forEach({
				onSuccess: function(ev2) {	
					
					switch(data.userData.section) {
					case "leads":
					case "contacts":
					peopleData = 	{
						fullName:  	ev2.entity.fullName.getValue(),
						company: 	ev2.entity.company.getValue(),
						email: 		ev2.entity.emailAccnt.getValue(),
						dataId: 	ev2.entity.ID.getValue(),
						owner: 		ev2.entity.owner.value.fullName
					}; 
					break;
					
					case "accounts":
					peopleData = 	{
						fullName:  	ev2.entity.name.getValue(),
						company: 	ev2.entity.website.getValue(),
						email: 		ev2.entity.billingCity.getValue(),
						dataId: 	ev2.entity.ID.getValue(),
						owner: 		ev2.entity.owner.value.fullName
					}; 
					break;
					} //end - switch
					
					selectedPeopleUL$.append(selectedPeopleListTemplateFn(peopleData));
				}
			});
		} //end - buildSelectedLeadsList.
		
		
		buildSelectedPeopleList(data.userData.theEntityCollection);
		
	// @region namespaceDeclaration// @startlock
	var changeOwnerButton = {};	// @button
	var cancelChangeOwnerButton = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	changeOwnerButton.click = function changeOwnerButton_click (event)// @startlock
	{// @endlock
		
		switch(data.userData.section) {
			case "leads":
			waf.sources.lead.changeOwner({ownerID: $$(combobox1).getValue(), leadsSelectionArr: data.userData.selectionArr}, {
				onSuccess: function(event) {
					WAK5CRMUTIL.setMessage(event.result, 4000);
					waf.sources.lead.collectionRefresh();
					//Update Recent Items because some of them may have been removed as a result of lead change owner.
					WAK5CRMUTIL.loadRecentItems('mainComponent_recentItemsBodyContainer'); // Note: Refactor so "mainComponent_recentItemsComponent
					
					$$(data.userData.changeOwnerContainer).hide();
					$$(data.userData.listContainer).show(); 
				}
			});
			break;
			 
			case "contacts":      
			waf.sources.contact.changeOwner({ownerID: $$(combobox1).getValue(), contactsSelectionArr: data.userData.selectionArr}, {
				onSuccess: function(event) {
					WAK5CRMUTIL.setMessage(event.result, 4000);
					waf.sources.contact.collectionRefresh();
					//Update Recent Items because some of them may have been removed as a result of lead change owner.
					WAK5CRMUTIL.loadRecentItems('mainComponent_recentItemsBodyContainer'); // Note: Refactor so "mainComponent_recentItemsComponent
					
					$$(data.userData.changeOwnerContainer).hide();
					$$(data.userData.listContainer).show(); 
				}
			});
			break;
			
			case "accounts":
			waf.sources.account.changeOwner({ownerID: $$(combobox1).getValue(), accountsSelectionArr: data.userData.selectionArr}, {
				onSuccess: function(event) {
					WAK5CRMUTIL.setMessage(event.result, 4000);
					waf.sources.account.collectionRefresh();
					//Update Recent Items because some of them may have been removed as a result of lead change owner.
					WAK5CRMUTIL.loadRecentItems('mainComponent_recentItemsBodyContainer'); // Note: Refactor so "mainComponent_recentItemsComponent
					
					$$(data.userData.changeOwnerContainer).hide();
					$$(data.userData.listContainer).show(); 
				}
			});
			break;
		} //end - switch
		
		
		/*
		waf.sources.lead.changeOwner({ownerID: $$(combobox2).getValue(), leadsSelectionArr: $$(dataGridLeadsList).getSelectedRows()}, {
			onSuccess: function(event) {
				WAK5CRMUTIL.setMessage(event.result, 4000);
				waf.sources.lead.collectionRefresh();
				//Update Recent Items because some of them may have been removed as a result of lead change owner.
				WAK5CRMUTIL.loadRecentItems('mainComponent_recentItemsBodyContainer'); // Note: Refactor so "mainComponent_recentItemsComponent
				$$(changeOwnerContainer).hide();
				$$(leadsListContainer).show();
				
			}
		});
		*/
	};// @lock

	cancelChangeOwnerButton.click = function cancelChangeOwnerButton_click (event)// @startlock
	{// @endlock
		$$(data.userData.changeOwnerContainer).hide();
		$$(data.userData.listContainer).show(); 
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_changeOwnerButton", "click", changeOwnerButton.click, "WAF");
	WAF.addListener(this.id + "_cancelChangeOwnerButton", "click", cancelChangeOwnerButton.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
