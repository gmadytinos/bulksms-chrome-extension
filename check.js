setInterval(function() {
  chrome.storage.local.get(null, function(items) {	
	var username = items['username'];
	var password = items['password'];
        var url = "https://bulksms.2way.co.za/eapi/user/get_credits/1/1.1?username="+username+"&password="+password;

	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
	    var credits = xhr.responseText.substr(xhr.responseText.indexOf('|')+1, 
		Math.min(xhr.responseText.length-(xhr.responseText.indexOf('.')+1), 4));
            if (credits.length > 25) credits = "?";
	    chrome.browserAction.setBadgeText({
	  	text: credits
      	    });
          }
        }
	xhr.send();
  });
}
, 1000 * 60 * 5);//every 5 minutes


