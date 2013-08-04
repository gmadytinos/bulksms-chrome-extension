// Saves options to localStorage.
function save_options() {
  var username = $("#username").val();
  var password = $("#password").val();
  var region = $("#region").val();
  var url = region + "?username=" + username + "&password=" + password;

  getCredits(username, password, url);

  chrome.storage.local.set({'username':username, 'password':password, 'region':region}, function() {
	  $("#status").css("display","block").fadeOut(2000);
  });
}

// Restores state to saved value from localStorage.
function restore_options() {
  chrome.storage.local.get(null, function(items) {	
	if (items['username'] && items['password'] && items['region']) {
	  $("#username").val(items['username']);
	  $("#password").val(items['password']);
	  $("#region").val(items['region']);
	}
  });
  $("#status").css("display","none");
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
$(document).foundation();
