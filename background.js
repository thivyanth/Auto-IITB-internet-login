let extensionOpenedTabId = null;
let isAttemptingLogin = false;

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action === "loggedIn" && sender.tab) {
        if (sender.tab.id === extensionOpenedTabId) {
            console.log('Logged in successfully, closing tab.');
            chrome.tabs.remove(sender.tab.id);
            extensionOpenedTabId = null;
            isAttemptingLogin = false;
        }
    }
});

function resetLoginAttempt() {
    isAttemptingLogin = false;
    extensionOpenedTabId = null;
    console.log('Resetting login attempt flag due to timeout or user action.');
}

function checkUniversityNetwork() {
    fetch('https://internet.iitb.ac.in/', { mode: 'no-cors' })
    .then(() => {
        console.log('On university network, activating extension functionality.');
        checkInternet();
    })
    .catch(() => {
        console.log('Not on university network, extension functionality is inactive.');
        resetLoginAttempt();
    });
}

function checkInternet() {
    if (isAttemptingLogin) {
        console.log('Login attempt already in progress.');
        return;
    }

    fetch('https://www.google.com', { mode: 'no-cors' })
    .then(() => {
        isAttemptingLogin = false;
    })
    .catch(() => {
        console.log('Internet disconnected, navigating to login page');
        isAttemptingLogin = true;
        chrome.tabs.create({url: 'https://internet.iitb.ac.in/login.php'}, (tab) => {
            extensionOpenedTabId = tab.id;

            // Set a timeout to reset the login attempt flag
            setTimeout(resetLoginAttempt, 300000); // 30 seconds timeout
        });
    });
}

// Set up an alarm to check university network connectivity
chrome.alarms.create('checkUniversityNetwork', { periodInMinutes: (1/60)*20 });
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'checkUniversityNetwork') {
        checkUniversityNetwork();
    }
});

// Listener for tab closure, to reset the login attempt flag if the user closes the tab manually
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    if (tabId === extensionOpenedTabId) {
        resetLoginAttempt();
    }
});
