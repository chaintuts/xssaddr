/* This script contains code for showing a user's BTC addresses
*
* Author: Josh McIntyre
*/

// Functions for interacting with the document

/* This function will get the userId, and display it on the page
* This function will execute on page load
*/
function fetchAndSetUserId()
{
	var userId = parseUserId();
	setUserIdInDocument(userId);
}

/* This function will get the user address and display it on the page
* This function will execute on a button press
*/
function fetchAndSetAddress()
{
	var userId = document.getElementById("userid").value;

	var address = generateAddress(userId);
	setAddressInDocument(address);
}

/* This function parses the userId from GET params
* This will be the catalyst for the XSS vulnerability
* We can put a malicious script to replace the address with an attacker'savePreferences
* in the GET param part of the URL, which will be placed in the document via the userid
*/
function parseUserId()
{
	var params = new URLSearchParams(window.location.search);
	var userId = params.get("userid");
	
	return userId;
}

// Set the userid value in the document
function setUserIdInDocument(userId)
{
	document.getElementById("userid").innerHTML = userId;
}

// Set the address value in the document
function setAddressInDocument(address)
{
	document.getElementById("addresslabel").innerHTML = "Your deposit address: <br>";
	document.getElementById("address").innerHTML = address;
}
