
model = new DataStoreCatalog();

include("classes/utility.js");

include("classes/activity.js");
include("classes/user.js");
include("classes/lead.js");
include("classes/contact.js");
include("classes/account.js");
include("classes/recentItem.js");
include("classes/note.js");
include("classes/log.js");


var dataClassNames = ['Lead', 'Account', 'Contact']; 

for (var i = 0, len = dataClassNames.length; i < len; i++) 
{
	model[dataClassNames[i]].collectionMethods.collectionEcho = function() {
		return "There are " + this.length + " entities in the collection."
	};
	
	model[dataClassNames[i]].collectionMethods.collectionEcho.scope = "public";
}

