# University Network Auto-Login Extension

## Description
This Chrome extension is designed to facilitate automatic navigation to the university's network login page (`https://internet.iitb.ac.in/login.php`) when the device is disconnected from the university's internet service. It checks for internet connectivity and, if disconnected, opens the login page. Additionally, it closes the tab once the login process is successful and redirects to the logout page (`https://internet.iitb.ac.in/logout.php`). 

## Features
- Automatically detects when the device is disconnected from the university's internet.
- Opens the login page in a new tab for re-authentication.
- Closes the tab automatically after a successful login.
- Activates only when on the university network.

## Installation
To install this extension in Chrome:
1. Download this repository as a ZIP file and extract it, or clone it using Git.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable 'Developer mode' at the top right corner.
4. Click 'Load unpacked' and select the extracted folder of this repository.

## Usage
Once installed, the extension runs automatically. It checks for an active university network connection every 5 seconds. If the connection is lost, it opens the login page. Upon successful login, the extension automatically closes the login tab.

## Files
- `manifest.json`: Contains extension metadata and configuration settings.
- `background.js`: The core logic for checking network connectivity and handling tab operations.
- `content.js`: A content script for detecting successful login on the university network page.

## Known Issues
- The extension assumes `https://internet.iitb.ac.in/` is only accessible within the university network.
- Frequent checks for internet connectivity may consume additional resources.

## Contributing
Contributions to this project are welcome. Please submit a pull request or create an issue for any bugs or feature suggestions.

## License
[MIT License](LICENSE)

## Contact
For any queries regarding this extension, please reach out to [Your Contact Information].

## Acknowledgments
- University IT Department for the network infrastructure.
- Contributors and testers who have helped in refining this extension.
