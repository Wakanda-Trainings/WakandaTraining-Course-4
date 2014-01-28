
(function Component (id) {// @lock


function constructor (id) {
	var notesListContainer$ = getHtmlObj('notesListContainer'),
		selectedNotesUL$ = getHtmlObj('selectedNotesUL'),
		inputNoteBody$ = getHtmlObj('inputNoteBody'),
		inputNoteTitle$ = getHtmlObj('inputNoteTitle'),
		inputNoteBodyRef = getHtmlId('inputNoteBody'),
		inputNoteTitleRef = getHtmlId('inputNoteTitle'),
		addNoteContainer$ = getHtmlObj('addNoteContainer');
		
	function buildNoteGrid(optionsObj) {
		//notesListContainer$.children().remove(); 
		selectedNotesUL$.children().remove(); 
		
		//Note: Refactor
		switch(optionsObj.section) {
			case "leads":
			ds.Note.query("lead.ID = :1", optionsObj.entityID, {
				orderBy: "createDate desc",
				onSuccess: function(ev1) {
					ev1.entityCollection.forEach({
						onSuccess: function(ev2) {	
							noteData = 	{
								title:  	ev2.entity.title.getValue(),
								body: 		ev2.entity.body.getValue(),
								createDate: ev2.entity.createDate.getValue(),
								dataId: 	ev2.entity.ID.getValue()
							};
							selectedNotesUL$.append(WAK5CRMUTIL.noteListTemplateFn(noteData));
						}
					}); //ev1.entityCollection.forEach
				}
			});
			break;
			
			case "contacts":
			ds.Note.query("contact.ID = :1", optionsObj.entityID, {
				orderBy: "createDate desc",
				onSuccess: function(ev1) {
					ev1.entityCollection.forEach({
						onSuccess: function(ev2) {	
							noteData = 	{
								title:  	ev2.entity.title.getValue(),
								body: 		ev2.entity.body.getValue(),
								createDate: ev2.entity.createDate.getValue(),
								dataId: 	ev2.entity.ID.getValue()
							};
							selectedNotesUL$.append(WAK5CRMUTIL.noteListTemplateFn(noteData));
							//notesListContainer$.append(WAK5CRMUTIL.noteListTemplateFn(noteData));
						}
					}); //ev1.entityCollection.forEach
				}
			});
			break;
			
			case "accounts":
			ds.Note.query("account.ID = :1", optionsObj.entityID, {
				orderBy: "createDate desc",
				onSuccess: function(ev1) {
					ev1.entityCollection.forEach({
						onSuccess: function(ev2) {	
							noteData = 	{
								title:  	ev2.entity.title.getValue(),
								body: 		ev2.entity.body.getValue(),
								createDate: ev2.entity.createDate.getValue(),
								dataId: 	ev2.entity.ID.getValue()
							};
							selectedNotesUL$.append(WAK5CRMUTIL.noteListTemplateFn(noteData));
						}
					}); //ev1.entityCollection.forEach
				}
			});	
			break;
		} //end - switch
		
	}
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'notes';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
		setTimeout(function() {
			buildNoteGrid(data.userData);
			addNoteContainer$.css('height', 42);
		
			notesListContainer$.on('mouseenter', '.noteListItem', function (event) {
		   		$(this).addClass('noteSelected');
			});
			
			notesListContainer$.on('mouseleave', '.noteListItem', function (event) {
		   		$(this).removeClass('noteSelected');
			});
		}, 80);
		
		
	// @region namespaceDeclaration// @startlock
	var cancelNoteButton = {};	// @button
	var saveNoteButton = {};	// @button
	var inputNoteBody = {};	// @textField
	// @endregion// @endlock

	// eventHandlers// @lock

	cancelNoteButton.click = function cancelNoteButton_click (event)// @startlock
	{// @endlock
		$$(inputNoteBodyRef).setValue();
		$$(inputNoteTitleRef).setValue();
		inputNoteBody$.css('height', 22);
		addNoteContainer$.css('height', 42);
	};// @lock

	saveNoteButton.click = function saveNoteButton_click (event)// @startlock
	{// @endlock
		
		var newNote = ds.Note.newEntity(); // create an entity with attributes set to null
		
        newNote.body.setValue(inputNoteBody$.val()); 
        newNote.title.setValue(inputNoteTitle$.val()); 
     	newNote.createDate.setValue(new Date()); 
     	
     	switch(data.userData.section) {
			case "leads":
			newNote.lead.setValue(waf.sources.lead.getCurrentElement()); 
			break;
			
			case "contacts":
			newNote.contact.setValue(waf.sources.contact.getCurrentElement()); 
			break;
			
			case "accounts":
			newNote.account.setValue(waf.sources.account.getCurrentElement()); 
			break;
		} //end - switch
     	
     	
     	
        newNote.save({
        	onSuccess: function(event) {
        		$$(inputNoteBodyRef).setValue();
				$$(inputNoteTitleRef).setValue();
				inputNoteBody$.css('height', 22);
				addNoteContainer$.css('height', 42);
				buildNoteGrid(data.userData);
        	}
        });
	};// @lock

	inputNoteBody.focus = function inputNoteBody_focus (event)// @startlock
	{// @endlock
		inputNoteBody$.css('height', 190);
		addNoteContainer$.css('height', 255);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_cancelNoteButton", "click", cancelNoteButton.click, "WAF");
	WAF.addListener(this.id + "_saveNoteButton", "click", saveNoteButton.click, "WAF");
	WAF.addListener(this.id + "_inputNoteBody", "focus", inputNoteBody.focus, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
