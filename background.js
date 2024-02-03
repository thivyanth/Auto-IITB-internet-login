function checkInternet() {
    fetch('https://www.google.com', { mode: 'no-cors' })
    .then(() => {
        console.log('Internet is connected');
    })
    .catch(() => {
        console.log('Internet disconnected, navigating to login page');
        chrome.tabs.create({url: 'https://internet.iitb.ac.in/login.php'});
    });
}

chrome.alarms.create('checkInternet', { periodInMinutes: 1 });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'checkInternet') {
    checkInternet();
  }
});
