
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var nameInputField = getHtmlId('nameInputField'),
		accountsListContainer = getHtmlId('accountsListContainer'),
		accountsDetailContainer = getHtmlId('accountsDetailContainer'),
		accountsDetailMainContainer = getHtmlId('accountsDetailMainContainer'),
		accountsActivityDetailContainer = getHtmlId('accountsActivityDetailContainer'),
		notesComponent = getHtmlId('notesComponent'),
		activityDetailComponent = getHtmlId('activityDetailComponent'),
		combobox1$ = getHtmlObj('combobox1'),
		combobox2$ = getHtmlObj('combobox2'),
		accordion4 = getHtmlId('accordion4'),
		dataGridAccountsList = getHtmlId('dataGrid1'),
		changeOwnerComponent = getHtmlId('changeOwnerComponent'),
		accountsChangeOwnerContainer = getHtmlId('accountsChangeOwnerContainer'),
		accountPrvButton = getHtmlId('accountPrevButton'),
		accountNxtButton = getHtmlId('accountNextButton');
		
	function loadNewAccount() {
		waf.sources.activity.query("account.ID = :1", waf.sources.account.ID);
		//Load Note Component
		$$(notesComponent).loadComponent({path: '/components/notes.waComponent', userData: {section: "accounts", entityID: waf.sources.account.ID}});
		//Super Hack
		combobox1$.find('input').val(waf.sources.account.type);
		combobox2$.find('input').val(waf.sources.account.industry);
		resetPrevNextButtons();
	} //end - loadNewAccount.
	
	
	function resetPrevNextButtons() {
		//Next button
		if (waf.sources.account.getPosition() === waf.sources.account.length - 1) {
			$$(accountNxtButton).disable();
		} else {
			$$(accountNxtButton).enable();
		}
		
		//Prev Button
		if (waf.sources.account.getPosition() === 0) {
			$$(accountPrvButton).disable();
		} else {
			$$(accountPrvButton).enable();
		}
	} //end - resetPrevNextButtons.
	
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'accounts';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		/**/
		setTimeout(function() {
			if (data.userData.view == "detail") {
				loadNewAccount();
				//switch view.
				$$(accountsListContainer).hide();
				$$(accountsDetailContainer).show();
			} else {
				$$(accountsDetailContainer).hide();
				$$(accountsListContainer).show();
			}
		}, 200);
		
				
		//Load activity detail component.
		//$$(activityDetailComponent).loadComponent({path: '/components/activityDetail.waComponent', userData: {detailMainContainer: accountsDetailMainContainer, activityDetailContainer: accountsActivityDetailContainer}});

	
	// @region namespaceDeclaration// @startlock
	var accountNextButton = {};	// @button
	var accountPrevButton = {};	// @button
	var accountChangeOwnerButton = {};	// @button
	var newAccountEventButton = {};	// @button
	var accountsCopyAddrButton = {};	// @button
	var newAccountTaskButton = {};	// @button
	var dataGrid2 = {};	// @dataGrid
	var newAccountButton = {};	// @button
	var accountsCancelButton = {};	// @button
	var accountsSaveButton = {};	// @button
	var dataGrid1 = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	accountNextButton.click = function accountNextButton_click (event)// @startlock
	{// @endlock
		waf.sources.account.selectNext({
			onSuccess: function(event) {
				loadNewAccount();
			}
		});
	};// @lock

	accountPrevButton.click = function accountPrevButton_click (event)// @startlock
	{// @endlock
		waf.sources.account.selectPrevious({
			onSuccess: function(event) {
				loadNewAccount();
			}
		});
	};// @lock

	accountChangeOwnerButton.click = function accountChangeOwnerButton_click (event)// @startlock
	{// @endlock
		if (waf.directory.currentUserBelongsTo("Manager")) {
			waf.sources.account.getEntityCollection().buildFromSelection(waf.sources.account.getSelection(), {
				onSuccess: function(event) {
					$$(changeOwnerComponent).loadComponent({path: '/components/changeOwner.waComponent', userData: {section: "accounts", selectionArr: $$(dataGridAccountsList).getSelectedRows(), listContainer: accountsListContainer, changeOwnerContainer: accountsChangeOwnerContainer, theEntityCollection: event.entityCollection}});
				}
			});
			
					
			$$(accountsListContainer).hide();
			$$(accountsChangeOwnerContainer).show();
		
		} else {
			WAK5CRMUTIL.setMessage("You do not have permission to transfer leads.", 4000, "error");
		}
	};// @lock

	newAccountEventButton.click = function newAccountEventButton_click (event)// @startlock
	{// @endlock
		waf.sources.activity.addNewElement();
		waf.sources.activity.type = "event";
		waf.sources.activity.status = "Started";
		waf.sources.activity.priority = "Normal";
		//Bug report: Activity onInit() is not running. Why?
		waf.sources.activity.serverRefresh({
			onSuccess: function(event) {
				waf.sources.activity.account.set(waf.sources.account);
				$$(activityDetailComponent).loadComponent({path: '/components/activityDetail.waComponent', userData: {detailMainContainer: accountsDetailMainContainer, activityDetailContainer: accountsActivityDetailContainer}});
				$$(accountsDetailMainContainer).hide();
				$$(accountsActivityDetailContainer).show();
			}
		});
	};// @lock

	accountsCopyAddrButton.click = function accountsCopyAddrButton_click (event)// @startlock
	{// @endlock
		waf.sources.account.shippingStreet = waf.sources.account.billingStreet;
		waf.sources.account.shippingCity = waf.sources.account.billingCity;
		waf.sources.account.shippingState = waf.sources.account.billingState;
		waf.sources.account.shippingZip = waf.sources.account.billingZip;
		waf.sources.account.shippingCountry = waf.sources.account.billingCountry;
		waf.sources.account.autoDispatch();
		WAK5CRMUTIL.setMessage("Billing Address copied to Shipping Address.", 5000, "normal");

	};// @lock

	newAccountTaskButton.click = function newAccountTaskButton_click (event)// @startlock
	{// @endlock
		waf.sources.activity.addNewElement();
		waf.sources.activity.type = "task";
		waf.sources.activity.status = "Started";
		waf.sources.activity.priority = "Normal";
		//Bug report: Activity onInit() is not running. Why?
		waf.sources.activity.serverRefresh({
			onSuccess: function(event) {
				waf.sources.activity.account.set(waf.sources.account);
				$$(activityDetailComponent).loadComponent({path: '/components/activityDetail.waComponent', userData: {detailMainContainer: accountsDetailMainContainer, activityDetailContainer: accountsActivityDetailContainer}});
				$$(accountsDetailMainContainer).hide();
				$$(accountsActivityDetailContainer).show();
			}
		});
	};// @lock

	dataGrid2.onRowDblClick = function dataGrid2_onRowDblClick (event)// @startlock
	{// @endlock
		//Activity Grid.
		$$(activityDetailComponent).loadComponent({path: '/components/activityDetail.waComponent', userData: {detailMainContainer: accountsDetailMainContainer, activityDetailContainer: accountsActivityDetailContainer}});
		$$(accountsDetailMainContainer).hide();
		$$(accountsActivityDetailContainer).show();
	};// @lock

	newAccountButton.click = function newAccountButton_click (event)// @startlock
	{// @endlock
		waf.sources.account.addNewElement();
		waf.sources.account.serverRefresh({
			onSuccess: function(event) {
				waf.sources.account.save({
					onSuccess: function(ev2) {
						//Note: Bug - Refactor - Super hack fix later.
						combobox1$.find('input').val('-none-');
						combobox2$.find('input').val('-none-');
		
						$$(accountsListContainer).hide();
						$$(accountsDetailContainer).show();
						$$(nameInputField).focus();
					}
				});
			}
		});
	};// @lock

	accountsCancelButton.click = function accountsCancelButton_click (event)// @startlock
	{// @endlock
		if (waf.sources.account.isNewElement()) {
			waf.sources.account.removeCurrentReference();
		}
		
		$$(accordion4).expand(1);
		$$(accountsDetailContainer).hide();
		$$(accountsListContainer).show();
	};// @lock

	accountsSaveButton.click = function accountsSaveButton_click (event)// @startlock
	{// @endlock
		waf.sources.account.save({
			onSuccess: function(event) {
				WAK5CRMUTIL.setMessage("Account: " + event.dataSource.name + " has been saved to the server.", 5000, "normal");
				WAK5CRMUTIL.newRecentItem("accounts", "Account: ", event.dataSource.name, event.dataSource.ID, 'mainComponent_recentItemsBodyContainer'); 
			}
		});
		
		$$(accordion4).expand(1);
		$$(accountsDetailContainer).hide();
		$$(accountsListContainer).show();
		
		//$$(tabView1).selectTab(1);
		//Bug report: isNewElement(). The following line is only work-around.
		//waf.sources.account.collectionRefresh(); BAD BAD
	};// @lock

	dataGrid1.onRowDblClick = function dataGrid1_onRowDblClick (event)// @startlock
	{// @endlock
		loadNewAccount();
		
		$$(accountsListContainer).hide();
		$$(accountsDetailContainer).show();
		
		//Add to recent items.
		WAK5CRMUTIL.newRecentItem("accounts", "Account: ", waf.sources.account.name, waf.sources.account.ID, 'mainComponent_recentItemsBodyContainer'); 
		// Note: Refactor so "mainComponent_recentItemsBodyContainer" is not hard-coded. (July 11, 2013).

	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_accountNextButton", "click", accountNextButton.click, "WAF");
	WAF.addListener(this.id + "_accountPrevButton", "click", accountPrevButton.click, "WAF");
	WAF.addListener(this.id + "_accountChangeOwnerButton", "click", accountChangeOwnerButton.click, "WAF");
	WAF.addListener(this.id + "_newAccountEventButton", "click", newAccountEventButton.click, "WAF");
	WAF.addListener(this.id + "_accountsCopyAddrButton", "click", accountsCopyAddrButton.click, "WAF");
	WAF.addListener(this.id + "_newAccountTaskButton", "click", newAccountTaskButton.click, "WAF");
	WAF.addListener(this.id + "_dataGrid2", "onRowDblClick", dataGrid2.onRowDblClick, "WAF");
	WAF.addListener(this.id + "_newAccountButton", "click", newAccountButton.click, "WAF");
	WAF.addListener(this.id + "_accountsCancelButton", "click", accountsCancelButton.click, "WAF");
	WAF.addListener(this.id + "_accountsSaveButton", "click", accountsSaveButton.click, "WAF");
	WAF.addListener(this.id + "_dataGrid1", "onRowDblClick", dataGrid1.onRowDblClick, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
