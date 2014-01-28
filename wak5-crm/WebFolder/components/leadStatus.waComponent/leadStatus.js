
(function Component (id) {// @lock
	
// Add the code that needs to be shared between components here

function constructor (id) {
	var chartContainer = getHtmlId('chartContainer');
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'leadStatus';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
		
		waf.sources.lead.jqPlotLeadStatus({
			onSuccess: function(event) {
				
				if (event.result !== "Do not plot") {
					$.jqplot(chartContainer,  event.result, { 
						seriesDefaults: {
					    	// Make this a pie chart.
					  		renderer: jQuery.jqplot.PieRenderer, 
					    	rendererOptions: {
						    	// Put data labels on the pie slices.
						    	// By default, labels show the percentage of the slice.
						    	showDataLabels: true
						   	}
						}, 
					
						legend: { show:true, location: 'e' }
					}); //end - $.jqplot.
				}
			}
		}); //end - waf.sources.lead.jqPlotLeadStatus.
		
		
		/*
		var data = [
			['Attempted Contact', 12],['Contact In Future', 9], ['Contacted', 14], 
		    ['Junk Lead', 16],['Lost Lead', 7],['Contacted', 7], ['Pre-Qualified', 9]
		];
		
		var plot1 = jQuery.jqplot (chartContainer, [data], { 
			seriesDefaults: {
		    	// Make this a pie chart.
		  		renderer: jQuery.jqplot.PieRenderer, 
		    	rendererOptions: {
			    	// Put data labels on the pie slices.
			    	// By default, labels show the percentage of the slice.
			    	showDataLabels: true
			   	}
			}, 
		
			legend: { show:true, location: 'e' }
		});
		*/
		
		
			
	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
