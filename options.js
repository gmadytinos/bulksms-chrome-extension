// Saves options to localStorage.
function save_options() {
  var username = $("#username").val();
  var password = $("#password").val();
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

  chrome.storage.local.set({'username':username, 'password':password}, function() {
	  $("#status").css("display","block").fadeOut(2000);
  });
}

// Restores state to saved value from localStorage.
function restore_options() {
  chrome.storage.local.get(null, function(items) {	
	if (items['username'] && items['password']) {
	  $("#username").val(items['username']);
	  $("#password").val(items['password']);
	}
  });
  $("#status").css("display","none");
}

$(document).foundation();
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);

