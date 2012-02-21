
  var streamworksContainer;
  var selectedCodeLine;

  function RenderControl(container,activityid)
  {
	streamworksContainer = container;
    getActivityFor(activityid);
  }		

  function getActivityFor(activityid) {
    var url = 'http://alisdair73.iriscouch.com/codereview/_design/app/_view/byActivityId?key=%22' + activityid +'%22';
    var params = {};
    params[gadgets.io.RequestParameters.METHOD] = gadgets.io.MethodType.GET;
    params[gadgets.io.RequestParameters.CONTENT_TYPE] = gadgets.io.ContentType.JSON;
    params[gadgets.io.RequestParameters.REFRESH_INTERVAL] = 10;
    params['bypassSpecCache'] = 0;

    gadgets.io.makeRequest(url, renderActivity, params);
  };

  function renderActivity(obj) {
 
    if(obj.data){

      var activity = obj.data.rows[0].value;
      var innerHTML = '<div class="SourceCode"><table cellpadding="0" cellspacing="0" class="lines"><tbody><tr><td>';

      // Build Source Code Table
      var linenumbersPRE = '<pre class="LineNumbers">';
      var sourcelinesPRE = '<div class="CodeLines"><pre>';

      activity.sourcecode.forEach(function(sourcecodeline){
        linenumbersPRE = linenumbersPRE + '<div class="LineNumber"><span id="L' + sourcecodeline.linenumber +
                                          '" rel="#L' + sourcecodeline.linenumber + '" onClick="codeLineSelected(\'LC' +
                                          sourcecodeline.linenumber + '\')">' + sourcecodeline.linenumber + 
                                          '</span></div>';	

        if(sourcecodeline.codeline){
          sourcelinesPRE = sourcelinesPRE + '<div class="CodeLine" id="LC' + sourcecodeline.linenumber + '" style="background-color: transparent;"><span>' +
                                           sourcecodeline.codeline + '</span></div>';
        } else {
//          sourcelinesPRE = sourcelinesPRE + '<br>';
          sourcelinesPRE = sourcelinesPRE + '<div class="CodeLine" id="LC' + sourcecodeline.linenumber + '" style="background-color: transparent;"><br></div>';
        }
      });	

      linenumbersPRE = linenumbersPRE + '</pre>';
      sourcelinesPRE = sourcelinesPRE + '</pre></div>';

      innerHTML = innerHTML + linenumbersPRE + '</td><td width="100%">' + sourcelinesPRE + '</td></tr></tbody></table></div>';
      streamworksContainer.innerHTML = buildToolbar() + innerHTML;
gadgets.window.adjustHeight()
    }
  }

  function codeLineSelected(clickedCodeLine){
	
	if(selectedCodeLine){
		document.getElementById(selectedCodeLine).style.backgroundColor = "transparent";
	}
	
	selectedCodeLine = clickedCodeLine;
	document.getElementById(selectedCodeLine).style.backgroundColor = "rgb(255, 255, 204)";
	
  }

  function buildToolbar(){
    var html = '<div class="meta">' +
	           '<div class="info">' +
	           '<span class="icon"><img alt="Txt" height="16" src="https://a248.e.akamai.net/assets.github.com/images/icons/txt.png?1315937721" width="16"></span>' +
	           '<span>8 lines (5 sloc)</span>' +
	           '</div>' +
	           '<ul class="actions">' +
	           '<li><a href="#" id="changes">Show Changes</a></li>' +
	           '</ul>' +
	           '</div>';
	
	return html;
	
}
