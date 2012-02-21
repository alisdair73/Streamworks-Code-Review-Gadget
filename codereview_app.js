 var couchapp = require('couchapp'),
     path = require('path');

ddoc = {   _id:'_design/app',
         views:{} 
       };

ddoc.views.byActivityId = {
	
	map: function(doc){
		emit(doc.activityid, doc);
	}
}

couchapp.loadAttachments(ddoc, path.join(__dirname, 'attachments'));

module.exports = ddoc;
