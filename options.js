// Saves options to localStorage.
function save_options() {
  var username_ctl = document.getElementById("username");
  var username = username_ctl.value;

  var password_ctl = document.getElementById("password");
  var password = password_ctl.value;

  chrome.storage.local.set({'username':username, 'password':password}, function() {
	  // Update status to let user know options were saved.
	  var status = document.getElementById("status");
	  status.style.display = "block";
  });

}

// Restores state to saved value from localStorage.
function restore_options() {
  chrome.storage.local.get(null, function(items) {	
	var username_ctl = document.getElementById("username");
	var password_ctl = document.getElementById("password");
	username.value = items['username'];
	password.value = items['password'];
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);