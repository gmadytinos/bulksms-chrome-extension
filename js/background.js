setInterval(function() {
  chrome.storage.local.get(null, function(items) {	
	var username = items['username'];
	var password = items['password'];
        var region = items['region'];
	var url = region + "?username=" + username + "&password=" + password;

	getCredits(username, password, url);
  });
}
, 1000 * 60 * 5);//every 5 minutes


