function getDecimalSeparator() {
    var n = 1.1;
    n = n.toLocaleString().substring(1, 2);
    return n;
}

function getCredits(username, password, url) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
  	  if (xhr.readyState == 4) {
	    var errorCode = xhr.responseText.substr(0, xhr.responseText.indexOf('|'));
	    var credits = xhr.responseText.substr(xhr.responseText.indexOf('|')+1, 
	    	 Math.min(xhr.responseText.indexOf(getDecimalSeparator())-xhr.responseText.indexOf('|')-1, 4));
	    if (errorCode > 0) {
	      if (errorCode == 23)
	        chrome.browserAction.setTitle({title: "Please set your BulkSMS username and password in the Options"});
	      else
	        chrome.browserAction.setTitle({title: credits.substr(0, credits.indexOf('|'))});
	      credits = "?";
	    }
	    else {
		chrome.browserAction.setTitle({title: "BulkSMS Remaining Credits"});
            }
	    chrome.browserAction.setBadgeText({
		text: credits
	    });
          }
	}
	xhr.send();
}