
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var login1 = {};	// @login
	var documentEvent = {};	// @document
// @endregion// @endlock
	var itemsUL$ = $('#itemsUL'),
	//Get jQuery reference to our <ul> for listing the collection.
	listTemplateSource = $("#list-template").html(),
	listTemplateFn = Handlebars.compile(listTemplateSource),
	//Nav template.
	navUL$ = $('#navUL'),
	navTemplateSource = $("#nav-template").html(),
	navTemplateFn = Handlebars.compile(navTemplateSource),
	showDetails = false,
	toggleDetailRichText$ = $('#toggleDetailRichText'),
	detailBottomContainer$ = $('#detailBottomContainer'), 
	itemData = "";
	
	function buildNavList() {
		navData = [	{title: "Leads", dataclass: "Leads", navItemId: "navLeads"},
					{title: "Contacts", dataclass: "Contacts", navItemId: "navContacts"},
					{title: "Accounts", dataclass: "Accounts", navItemId: "navAccounts"}];
					
		navData.forEach(function(navItem) {
			navUL$.append(navTemplateFn(navItem));
		});
	}
	
	function updateItemDetail(name, city, phone, industry) {
		entityObj.name = name;
		entityObj.city = city;
		entityObj.phone = phone;
		if (industry !== "-none-") { 
			entityObj.industry = industry ;
		} else {
			entityObj.industry = "";
		}
		waf.sources.entityObj.sync();
	}
	
	function buildItemsList(dataClassName) {
		itemsUL$.children().remove(); 

		switch(dataClassName) {
			case "Leads":
			ds.Lead.all({
				onSuccess: function(ev1) {
					var count = 0;
					ev1.entityCollection.forEach({
						onSuccess: function(ev2) {	
							itemData = 	{
								name:  		ev2.entity.fullName.getValue(),
								city:    	ev2.entity.city.getValue(),
								dataId: 	ev2.entity.ID.getValue(),
								dataclass: 	"Leads",
								imagePath: "/images/people_small.png"
							};
							itemsUL$.append(listTemplateFn(itemData));
							
							if (count === 0) {
								updateItemDetail(ev2.entity.fullName.getValue(), ev2.entity.city.getValue(), ev2.entity.phone.getValue(), ev2.entity.industry.getValue());
								itemsUL$.find('li').addClass('itemPermSelected');
							}
							count++;
						}
					}); //ev1.entityCollection.forEach
				}
			});
			waf.widgets.detailMediumImage.setValue('/images/people_medium.png');
			break;
			
			case "Contacts":
			ds.Contact.all({
				onSuccess: function(ev1) {
					var count = 0;
					ev1.entityCollection.forEach({
						onSuccess: function(ev2) {	
							itemData = 	{
								name:  		ev2.entity.fullName.getValue(),
								city:    	ev2.entity.city.getValue(),
								dataId: 	ev2.entity.ID.getValue(),
								dataclass: 	"Contacts",
								imagePath: "/images/people_small.png"
							};
							itemsUL$.append(listTemplateFn(itemData));
							
							if (count === 0) {
								updateItemDetail(ev2.entity.fullName.getValue(), ev2.entity.city.getValue(), ev2.entity.phone.getValue());
								itemsUL$.find('li').addClass('itemPermSelected');
							}
							count++;

						}
					}); //ev1.entityCollection.forEach
				}
			});
			waf.widgets.detailMediumImage.setValue('/images/people_medium.png');
			break;
			
			case "Accounts":
			ds.Account.all({
				onSuccess: function(ev1) {
					var count = 0;
					ev1.entityCollection.forEach({
						onSuccess: function(ev2) {	
							itemData = 	{
								name:  		ev2.entity.name.getValue(),
								city:    	ev2.entity.billingCity.getValue(),
								dataId: 	ev2.entity.ID.getValue(),
								dataclass: 	"Accounts",
								imagePath: "/images/people_small.png"
							};
							itemsUL$.append(listTemplateFn(itemData));
							
							if (count === 0) {
								updateItemDetail(ev2.entity.name.getValue(), ev2.entity.billingCity.getValue());
								itemsUL$.find('li').addClass('itemPermSelected');
							}
							count++;

						}
					}); //ev1.entityCollection.forEach
				}
			});
			waf.widgets.detailMediumImage.setValue('/images/companies_medium.png');
			break;
		} //end - switch.
	} //end - buildItemsList.

// eventHandlers// @lock

	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		itemsUL$.children().remove(); 
		navUL$.children('li').removeClass('navPermSelected');
		entityObj.name = null;
		entityObj.city = null;
		entityObj.phone = null;
		entityObj.industry = null;
		waf.sources.entityObj.sync();
	};// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
		buildItemsList("Leads");
		$('#navLeads').addClass('navPermSelected');	
		WAK5CRMUTIL.setMessage("Welcome to WakandaBook. Leads, Contacts and Accounts as Easy as 1, 2 3!", 6000);
		//WAK5CRMUTIL.loadRecentItems('recentItemsContainer');
	};// @lock
	
	
	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		if (WAF.directory.currentUser() === null) {
			itemsUL$.children().remove(); 
			navUL$.children('li').removeClass('navPermSelected');
			entityObj.name = null;
			entityObj.city = null;
			entityObj.phone = null;
			entityObj.industry = null;
			waf.sources.entityObj.sync();
		} else {
			buildItemsList("Leads");
			$('#navLeads').addClass('navPermSelected');	
		}
		
		
		//event handlers
		toggleDetailRichText$.on('click', function (event) {
			if (showDetails) {
				$$('toggleDetailRichText').setValue('Show Fewer Details');
				showDetails = false;
				detailBottomContainer$.animate({height:240},400); //.css('height', 160); 
				
			} else {
				$$('toggleDetailRichText').setValue('Show More Details');
				showDetails = true;
				detailBottomContainer$.animate({height:45},400); //.css('height', 60); //.animate({height:40},200)
			}
		});
		
		
		navUL$.on('click', '.navItem', function (event) {
			if (waf.directory.currentUser() !== null) {
		   		var this$ = $(this);
		   		this$.addClass('navPermSelected');
		   		this$.siblings().removeClass('navPermSelected');
		   		var dataclass = this$.children('div.itemIdent').attr('data-dataclass');
		   		buildItemsList(dataclass);
		   		if (dataclass === "Accounts") {
		   			waf.widgets.detailMediumImage.setValue('/images/companies_medium.png');
		   		} else {
		   			waf.widgets.detailMediumImage.setValue('/images/people_medium.png');
		   		}
		   		
		   	} else {
		   		WAK5CRMUTIL.setMessage("Please sign in to access your account.", 4000, "normal");
		   	}
		   	
		   	entityObj.name = null;
			entityObj.city = null;
			entityObj.phone = null;
			entityObj.industry = null;
			waf.sources.entityObj.sync();
		});
		
		itemsUL$.on('mouseenter', '.itemPreview', function (event) {
	   		$(this).addClass('itemSelected');
		});

		itemsUL$.on('mouseleave', '.itemPreview', function (event) {
	   		$(this).removeClass('itemSelected');
		});
		
		itemsUL$.on('click', '.itemPreview', function (event) {
			var this$ = $(this);
	   		this$.addClass('itemPermSelected');
	   		this$.siblings().removeClass('itemPermSelected');
	   		var itemId = this$.children('div.itemIdent').attr('data-id');
	   		var dataclass = this$.children('div.itemIdent').attr('data-dataclass');
	   		
	   		switch(dataclass) {
				case "Leads":
				ds.Lead.find("ID = :1", itemId, {
		   			onSuccess: function(event) {		
		   				updateItemDetail(event.entity.fullName.getValue(), event.entity.city.getValue(), event.entity.phone.getValue(), event.entity.industry.getValue());
		   			}
		   		});
				break;

				case "Contacts":
				ds.Contact.find("ID = :1", itemId, {
		   			onSuccess: function(event) {
		   				updateItemDetail(event.entity.fullName.getValue(), event.entity.city.getValue(), event.entity.phone.getValue());
		   			}
		   		});
				break;

				case "Accounts":
				ds.Account.find("ID = :1", itemId, {
		   			onSuccess: function(event) {
		   				updateItemDetail(event.entity.name.getValue(), event.entity.billingCity.getValue(), event.entity.phone.getValue());
		   			}
		   		});
				break;				
			} //end - switch.

		});
		
		//buildItemsList("Leads");
		buildNavList();
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("login1", "login", login1.login, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
