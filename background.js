// background.js
chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action === "loggedIn" && sender.tab) {
      console.log('Logged in successfully, closing tab.');
      chrome.tabs.remove(sender.tab.id);
  }
});

function checkInternet() {
  fetch('https://www.google.com', { mode: 'no-cors' })
  .then(() => {
      // No need to check if the login tab is open, as the content script handles it
  })
  .catch(() => {
      console.log('Internet disconnected, navigating to login page');
      chrome.tabs.create({url: 'https://internet.iitb.ac.in/login.php'});
  });
}

// ... rest of the background.js script


// Set up an alarm to check internet connectivity every 5 seconds
chrome.alarms.create('checkInternet', { periodInMinutes: 1 / 12 });

chrome.alarms.onAlarm.addListener((alarm) => {
if (alarm.name === 'checkInternet') {
  checkInternet();
}
});
