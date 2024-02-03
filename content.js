// content.js
if (window.location.href === 'https://internet.iitb.ac.in/logout.php') {
    chrome.runtime.sendMessage({ action: "loggedIn" });
}
