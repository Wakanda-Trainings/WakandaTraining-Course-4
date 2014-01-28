
WAF.onAfterInit = function onAfterInit() {// @lock

var daveObj = daveObj || null,
tomObj = {};
// @region namespaceDeclaration// @startlock
	var button2 = {};	// @button
	var documentEvent = {};	// @document
	var button1 = {};	// @button
// @endregion// @endlock

// eventHandlers// @lock

	button2.click = function button2_click (event)// @startlock
	{// @endlock
		//console.log("First: " + daveObj.counter);
		
		
		tomObj.counter++;
		
		waf.sources.lead.userDataTest(tomObj.counter, { //
			onSuccess: function(event) {
				console.log("counter: " + event.userData.counter);
				//if (event.userData == 1) debugger;
			},
			
			userData: tomObj
		});
		
		
//		daveObj.one = "three";
//		console.log("Third: " + daveObj.counter);
		
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		daveObj = 0;
		tomObj.counter = 0;
	};// @lock
	
	
	button1.click = function button1_click (event)// @startlock
	{// @endlock
		//console.log("First: " + daveObj.counter);
		
		
		daveObj++;
		
		waf.sources.lead.userDataTest(daveObj, { //
			onSuccess: function(event) {
				console.log("counter: " + event.userData);
				//if (event.userData == 1) debugger;
			},
			
			userData: daveObj
		});
		
		
//		daveObj.one = "three";
//		console.log("Third: " + daveObj.counter);
		
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("button2", "click", button2.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
	WAF.addListener("button1", "click", button1.click, "WAF");
// @endregion
};// @endlock
