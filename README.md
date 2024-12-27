## General
____________

### Author
* Josh McIntyre

### Website
* jmcintyre.net

### Overview
* XSSAddr is a demo of a cross-site scripting (XSS) vulnerability

## Development
________________

### Git Workflow
* development for bugfixes and new features

### Building
* make build
Build the application
* make clean
Clean the build directory

### Features
* Demonstrates how malicious input can result in a cross-site scripting (XSS) vulnerability in a web application
* Shows how a malicious GET parameter injected into the application can display an attacker address instead of the intended user address
* Take advantage of `<img>` tag `onload` function to craft malicious payload, replacing the `generateAddress` function with attacker's address generator function

### Requirements
* Requires JavaScript

### Platforms
* Chrome
* Firefox
* Edge

## Usage
____________

### Web Browser Usage
* Use URL with a GET parameter for userid, `xssaddr.html?userid=<payload>`
* Use any legitimate number for `userid` to see the intended user sample address
* Enter URL-encoded malicious payload to demonstrate XSS vulnerability, replacing user address with the attacker'sample
* Malicious payload (URL-encoded) - `%3Cimg%20src%3D%22data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjYGRg%2FA8AAQoBAj0TXDIAAAAASUVORK5CYII%3D%22%20onload%3D%22generateAddress%20%3D%20function%28userId%29%7Breturn%20%271maliciousaddresskusZJd4arcHU6ZeH7%27%3B%7D%22%20%2F%3E`
* Malicious payload (human-readable HTML) - `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjYGRg/A8AAQoBAj0TXDIAAAAASUVORK5CYII=" onload="generateAddress = function(userId){return '1maliciousaddresskusZJd4arcHU6ZeH7';}" />`

### Unit Tests
* Open `test_xssaddr.html` and click "Run tests"
* Results are displayed on the page and in the developer console