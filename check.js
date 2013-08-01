setInterval(function() {
  chrome.storage.local.get(null, function(items) {	
	var username = items['username'];
	var password = items['password'];
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "http://bulksms.2way.co.za:5567/eapi/user/get_credits/1/1.1?username="+username+"&password="+password, true);
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
	    chrome.browserAction.setBadgeText({
		text: xhr.responseText.substr(xhr.responseText.indexOf('|')+1, 
		      Math.min(xhr.responseText.length-(xhr.responseText.indexOf('|')+2), 4)) 
	    });
	  }
	}
	xhr.send();
  });
}
, 1000 * 60 * 5);//every 5 minutes


