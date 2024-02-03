// background.js
chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action === "loggedIn" && sender.tab) {
      console.log('Logged in successfully, closing tab.');
      chrome.tabs.remove(sender.tab.id);
  }
});

function checkUniversityNetwork() {
  fetch('https://internet.iitb.ac.in/', { mode: 'no-cors' })
  .then(() => {
      console.log('On university network, activating extension functionality.');
      checkInternet();
  })
  .catch(() => {
      console.log('Not on university network, extension functionality is inactive.');
  });
}

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

// Set up an alarm to check university network connectivity
chrome.alarms.create('checkUniversityNetwork', { periodInMinutes: 1/12 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'checkUniversityNetwork') {
    checkUniversityNetwork();
  }
});
