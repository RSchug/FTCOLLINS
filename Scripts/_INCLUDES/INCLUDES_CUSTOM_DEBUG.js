aa.print("Loading INCLUDES_CUSTOM_DEBUG");
/*------------------------------------------------------------------------------------------------------/
| Program : INCLUDES_CUSTOM_DEBUG.js
| Event   : N/A
|
| Usage   : From INCLUDES_CUSTOM_GLOBALS add: eval(getScriptText("INCLUDES_CUSTOM_DEBUG"));
|
| Notes   : Added Numerous Global Variables for Debugging & scripting standard.
|
/------------------------------------------------------------------------------------------------------*/
// Set Font colors for EMSE Standard Choice.
stdChoiceCriteriaBeginTrue = "<font color=Blue>";
stdChoiceCriteriaEndTrue = "</font>";
stdChoiceCriteriaBeginFalse = "<font color=LightBlue>";
stdChoiceCriteriaEndFalse = "</font>"
stdChoiceActionBegin = "<font color=BlueViolet>";
stdChoiceActionEnd = "</font>"
stdChoiceDisabledBegin = "<font color=LightGray>";
stdChoiceDisabledEnd = "</font>"
stdChoiceDisabledBegin = ""; // Do not display disabled standard choices.
stdChoiceDisabledBegin = "";

/*------------------------------------------------------------------------------------------------------/
| Custom Parameters
|	Ifchanges are made, please add notes above.
/------------------------------------------------------------------------------------------------------*/
// Define functions if not currently defined. Should only be used if INCLUDES_ACCELA functions do not load properly.
if (typeof (exists) == "undefined") { // Define exists function if it is not defined.
	aa.print("loading function exists")

	function exists(eVal, eArray) {
		for (ii in eArray) {
			if (eArray[ii] == eVal) return true;
		}
		return false;
	}
}
if (typeof (lookup) == "undefined") { // Define exists function if it is not defined.
	aa.print("loading function lookup")

	function lookup(stdChoice, stdValue) {
		var strControl;
		var bizDomScriptResult = aa.bizDomain.getBizDomainByValue(stdChoice, stdValue);
		if (bizDomScriptResult.getSuccess()) {
			var bizDomScriptObj = bizDomScriptResult.getOutput();
			strControl = "" + bizDomScriptObj.getDescription(); // had to do this or it bombs.  who knows why?
			logDebug("lookup(" + stdChoice + "," + stdValue + ") = " + strControl);
		} else {
			logDebug("lookup(" + stdChoice + "," + stdValue + ") does not exist");
		}
		return strControl;
	}
}

// Show starting time of script.
now = new Date();
logDebug("----------");
if (typeof (scriptName) == "undefined" || scriptName == "") scriptName = (typeof (controlString) == "undefined" ? "" : controlString);
if (scriptName == "") scriptName = aa.env.getValue("ScriptCode");
if (scriptName == "") scriptName = aa.env.getValue("ScriptName");
logDebug("Starting" + (typeof (scriptName) == "undefined" || scriptName == "" ? (aa.env.getValue("EventName") == "" ? "" : " Event: " + aa.env.getValue("EventName")) : " Script: " + scriptName) + " @: " + now.toDateString() + " " + now.toTimeString().replace(" ", "," + now.getMilliseconds() + " "));
logDebug("Loading INCLUDES_CUSTOM_GLOBALS");

// User IDs for Development Staff. showDebug is turned on for them
var debugUserIDs = ["CCDCASHIERING", "CPROBASCO", "JMCDONALD", "JB", "LCHARRON", "LWACHT", "MWELLS", "140676", "2004545", "2002485", "500116", "500501", "501716", "206115", "501682", "501703"];
// 2002485 Cory Probasco (Disabled), 500116 Cory Probasco, 500501 Ray Schug, 501716 Michael Becker, 206115 Ben Granados, 501682 Mohsin Shaik,  501703 Anish Mirza
// Email address for Development Staff. AA & ACA Debug Email is directed to them
var debugEmailAddresses = ["darren.russell@denvergov.org", "jose.ramirez3@denvergov.org", "christina.cruz@denvergov.org", "laura.millard@denvergov.org", "rschug@truepointsolutions.com", "ray.schug@denvergov.org"]; // These email addresses need to be in lower case.
var debugEmailAddresses = ["rschug@truepointsolutions.com", "ray.schug@denvergov.org", "michael.becker@denvergov.org","mohsin.shaik@denvergov.org","anish.mirza@denvergov.org"]; // These email addresses need to be in lower case.

// define globals if they haven't been defined already.
if (typeof (br) == "undefined") var br = "<BR>";
if (typeof (debug) == "undefined") var debug = "";
if (typeof (debug) == "undefined") var debug = "";
if (typeof (showDebug) == "undefined") var showDebug = false;
if (typeof (adminUserEmail) == "undefined") var adminUserEmail = "ray.schug@denvergov.org"; // Email address(es) for Admin User(s).
if (typeof (debugEmailTo) == "undefined") var debugEmailTo = ""; // Email address where Debug will be sent.
if (typeof (currentUserEmail) == "undefined") var currentUserEmail = ""; // Current User Email: For Public User set to adminUserEmail. 
if (typeof (publicUserEmail) == "undefined") var publicUserEmail = ""; // Public User's Email.
if (typeof (sysFromEmail) == "undefined") var sysFromEmail = "NoReply@DenverGov.org"; // System Mail From address.
if (typeof (licenseState) == "undefined") var licenseState = "CO"; // Licensing State
if (typeof (gisMapService) == "undefined") var gisMapService = "AccelaAutomation"; // GIS Map Service.
if (typeof (lastErrorMsg) == "undefined") var lastErrorMsg = ""; // Used by custom logDebug function for tracking last error.
if (typeof (formatErrorB) == "undefined") var formatErrorB = ""; // formatting for custom error messages
if (typeof (formatErrorE) == "undefined") var formatErrorE = ""; //
if (typeof (hostName) == "undefined") var hostName = java.net.InetAddress.getLocalHost().getHostName(); // Host Name
var systemMailFrom = sysFromEmail;


/// --------------------- GIS UTILS Section
if (typeof (gisMapService) == "undefined") {
	var serviceProviderCode = aa.getServiceProviderCode();
	var parcelBusiness = aa.proxyInvoker.newInstance("com.accela.aa.aamain.parcel.ParcelBusiness").getOutput();
	var gisBusiness = aa.proxyInvoker.newInstance("com.accela.aa.gis.gis.GISBusiness").getOutput();
	var gisMapService = this.gisBusiness.getDefaultGISServiceID(this.serviceProviderCode, "ADMIN"); // Default GIS Map Service ID.
	aa.print("serviceProviderCode: " + serviceProviderCode);
	aa.print("parcelBusiness: " + parcelBusiness);
	aa.print("gisBusiness: " + gisBusiness);
	aa.print("gisMapService: " + gisMapService);


}

var serverName = java.net.InetAddress.getLocalHost().getHostName(); // Host Name
if (typeof (envName) != "undefined") var envName = getEnvironmentName();

// Lookup Values from Standard Choices.
var acaUrl = lookup("ACA_CONFIGS", "ACA_SITE");
if (acaUrl) acaUrl = acaUrl.toLowerCase().replace("/admin", "").replace("/default.aspx", "");

if (typeof (serverName) != "undefined") logDebug("serverName: " + serverName);
if (typeof (envName) != "undefined") logDebug("envName: " + envName + " " + (typeof (envText) == "undefined" ? "" : envText));
logDebug("acaUrl: " + acaUrl);
logDebug("licenseState:" + licenseState);
logDebug("gisMapService:" + gisMapService);
logDebug("sysFromEmail:" + sysFromEmail);

//Log All Environmental Variables as  globals
var params = aa.env.getParamValues();
var keys = params.keys();
var key = null;
while (keys.hasMoreElements()) {
	key = keys.nextElement();
	logDebug("Env Variable: " + key + " = " + aa.env.getValue(key));
}

try {
	if (typeof (currentUserID) == "undefined") {
		var currentUserID = aa.env.getValue("CurrentUserID"); // Current User
		var systemUserObj = null; // Current User Object
		var currentUserGroup = null; // Current User Group
		if (currentUserID != null) {
			systemUserObj = aa.person.getUser(currentUserID).getOutput(); // Current User Object
		}
	}
	if (typeof (publicUserID) == "undefined") {
		var publicUserID = null;
		var publicUser = false;
		if (currentUserID.indexOf("PUBLICUSER") == 0) {
			publicUserID = currentUserID;
			currentUserID = "ADMIN";
			publicUser = true;
		}
		if (currentUserID != null) {
			systemUserObj = aa.person.getUser(currentUserID).getOutput(); // Current User Object
		}
	}
	if (currentUserID != null) {
		systemUserObj = aa.person.getUser(currentUserID).getOutput(); // Current User Object
	}

	// User Email Addresses
	var systemUserEmail = "";
	if (systemUserObj != null) {
		systemUserEmail = systemUserObj.getEmail();
	} else if (currentUserID != null) {
		systemUserObj = aa.person.getUser(currentUserID).getOutput(); // Current User Object
		if (systemUserObj != null) {
			systemUserEmail = systemUserObj.getEmail().toLowerCase();
		} else {
			logDebug("User not found: " + currentUserID);
		}
	}
	// Get Public User Email Address
	var publicUserEmail = "";
	if (publicUserID) {
		var publicUserModelResult = aa.publicUser.getPublicUserByPUser(publicUserID);
		if (publicUserModelResult.getSuccess() || !publicUserModelResult.getOutput()) {
			publicUserEmail = publicUserModelResult.getOutput().getEmail().toLowerCase();
			logDebug("publicUserEmail: " + publicUserEmail + " for " + publicUserID)
		} else {
			publicUserEmail = null;
			logDebug("publicUserEmail: " + publicUserEmail);
		}
	}
} catch (err) {
	showDebug = 3;
	var context = "INCLUDES_CUSTOM_DEBUG" + (typeof (scriptName) == "undefined" ? "" : "(Script: " + scriptName + ")");
	logDebug("ERROR: An error occured in " + context + " Line " + err.lineNumber + " Error:  " + err.message);
	logDebug("Stack: " + err.stack);
}

// Redirect emails for specific users.
if (systemUserEmail) {
	if (systemUserEmail.toLowerCase() == "ray.schug@denvergov.org") systemUserEmail = "ray.schug@denvergov.org";
}
if (publicUserEmail) {
	if (exists(publicUserEmail.toLowerCase(), ["saheli.paul@denvergov.org", "ray.schug@denvergov.org", "rschug@truepointsolutions.com"])) publicUserEmail = "ray.schug@denvergov.org";
}
if (currentUserID == "ADMIN") systemUserEmail = adminUserEmail;
if (currentUserID == "CCDCASHIERING") systemUserEmail = adminUserEmail;

/*
//	Include the following at the end of the calling script to send Debug Email to Admin/Development Staff.
//	This requires doScriptActions to be on and the custom version below.
*/
/* Enable developer debug email */
showDebug = false;
var debugEmailTo = "";
if (exists(currentUserID, debugUserIDs)) {
	showDebug = 3;
	debugEmailTo = systemUserEmail.toLowerCase();
	logDebug("debugEmailTo for system user (" + currentUserID + "): " + debugEmailTo);
}
if (publicUser && exists(publicUserEmail.toLowerCase(), debugEmailAddresses)) {
	// showDebug = 3;
	debugEmailTo = publicUserEmail.toLowerCase();
	logDebug("debugEmailTo for public user (" + publicUserID + "): " + debugEmailTo);
}
if (typeof (controlString) == "undefined") controlString = "";
//if (!(controlString.indexOf("After") > 0 || controlString == "WorkflowTaskUpdateBefore") || !exists(debugEmailTo, debugEmailAddresses)) { // Don't email script results unless After event.
//	debugEmailTo = ""; 
//}
if (!exists(debugEmailTo, debugEmailAddresses)) { // Don't email script results unless After event.
	debugEmailTo = "";
}
logDebug("adminUserEmail:" + adminUserEmail);
logDebug("currentUserEmail:" + currentUserEmail);
logDebug("debugEmailTo:" + debugEmailTo);

/*------------------------------------------------------------------------------------------------------/
| END Custom Parameters
/------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------/
| Custom Functions use in INCLUDES_CUSTOM_GLOBALS only
/------------------------------------------------------------------------------------------------------*/
/**
 * Returns the environment (DEV, TEST, etc.) based on V360_WEB_ACTION_URL in ACA_CONFIGS Standard Choice.
 * 
 * @returns {String} returns the environment.
 */
function getEnvironmentName() {
	var envName = "Unknown";
	var domainName = "";
	var envURL = "";
	envSiteURL = ""; // Define Global 
	envSiteURLx = "";
	var result = aa.bizDomain.getBizDomainByValue("ACA_CONFIGS", "V360_WEB_ACTION_URL");
	if (result.getSuccess()) {
		envURL = result.getOutput().getDescription();
	}
	logDebug("envURL: " + envURL);
	if (envURL != "") {
		envSiteURL = envURL.toLowerCase().replace("/jetspeed", "").replace("/portal", "").replace("/portlets", "");
		logDebug("envSiteURL: " + envSiteURL);
		envSiteURLx = envSiteURL.replace("https://", "").replace("http://", "");
		domainName = envSiteURLx.substr(0, envSiteURLx.indexOf("/"))
		logDebug("domainName: " + domainName);
		hostNameX = hostName.toLowerCase();
		if (hostNameX.indexOf("supp") > 0) envName = "SUPP";
		else if (hostNameX.indexOf("test") > 0) envName = "TEST";
		else if (hostNameX.indexOf("qa") > 0) envName = "QA";
		else if (hostNameX.indexOf("beta") > 0) envName = "BETA";
		else envName = "PROD";
	}
	envText = "";
	switch (envName) {
		case "", "PROD":
			envText = "Production";
			break;
		case "QA":
			envText = "QA";
			break;
		case "TEST":
			envText = "Test";
			break;
		case "DEV":
			envText = "Development";
			break;
		case "BETA":
			envText = "BETA";
			break;
		default:
			envText = "Unknown Environment: " + envName + " " + domainName;
	}
	//	logDebug("envText: " + envText);
	return envName;
}

/*------------------------------------------------------------------------------------------------------/
| Custom Functions from INCLUDES_ACCELA_FUNCTIONS used for Debugging Highlighting Syntax.
/------------------------------------------------------------------------------------------------------*/

function doStandardChoiceActions(stdChoiceEntry, doExecution, docIndent) {
	var thisDate = new Date();
	var thisTime = thisDate.getTime();
	var lastEvalTrue = false;
	stopBranch = false; // must be global scope
	logDebug("Executing : " + stdChoiceEntry + "," + doExecution + "," + docIndent + ", Elapsed Time: " + ((thisTime - startTime) / 1000) + " Seconds (Override)")
	var pairObjArray = getScriptAction(stdChoiceEntry);
	if (!doExecution) docWrite(stdChoiceEntry, true, docIndent);
	try {
		for (xx in pairObjArray) {
			doObj = pairObjArray[xx];
			if (doExecution) {
				if (doObj.enabled) {
					if (stopBranch) {
						stopBranch = false;
						break;
					}
					try {
						stdChoiceCriteriaBegin = stdChoiceCriteriaBeginFalse
						stdChoiceCriteriaEnd = stdChoiceCriteriaEndFalse
						if (eval(token(doObj.cri)) || (lastEvalTrue && doObj.continuation)) {
							stdChoiceCriteriaBegin = stdChoiceCriteriaBeginTrue
							stdChoiceCriteriaEnd = stdChoiceCriteriaEndTrue
						}
						logDebug(aa.env.getValue("CurrentUserID") + " : " + stdChoiceEntry + " : #" + doObj.ID + " : Criteria : " + stdChoiceCriteriaBegin + doObj.cri + stdChoiceCriteriaEnd, 2)
						if (eval(token(doObj.cri)) || (lastEvalTrue && doObj.continuation)) {
							logDebug(aa.env.getValue("CurrentUserID") + " : " + stdChoiceEntry + " : #" + doObj.ID + " : Action : " + stdChoiceActionBegin + doObj.act + stdChoiceActionEnd, 2)
							eval(token(doObj.act));
							lastEvalTrue = true;
						} else {
							if (doObj.elseact) {
								logDebug(aa.env.getValue("CurrentUserID") + " : " + stdChoiceEntry + " : #" + doObj.ID + " : Else : " + stdChoiceActionBegin + doObj.elseact + stdChoiceActionEnd, 2)
								eval(token(doObj.elseact));
							}
							lastEvalTrue = false;
						}
					} catch (err) {
						showDebug = 3;
						logDebug("**ERROR** An error occured in the following standard choice " + stdChoiceEntry + "#" + doObj.ID + "  Error:  " + err.message);
					}
				} else if (stdChoiceDisabledBegin != "") { // Disabled
					logDebug(stdChoiceDisabledBegin + aa.env.getValue("CurrentUserID") + " : " + stdChoiceEntry + " : #" + doObj.ID + " : <DISABLED> : " + doObj.cri + stdChoiceDisabledEnd, 2)
				}
			} else // just document
			{
				docWrite("|  ", false, docIndent);
				var disableString = "";
				if (!doObj.enabled) disableString = "<DISABLED>";
				if (doObj.elseact)
					docWrite("|  " + doObj.ID + " " + disableString + " " + doObj.cri + " ^ " + doObj.act + " ^ " + doObj.elseact, false, docIndent);
				else
					docWrite("|  " + doObj.ID + " " + disableString + " " + doObj.cri + " ^ " + doObj.act, false, docIndent);
				for (yy in doObj.branch) {
					doStandardChoiceActions(doObj.branch[yy], false, docIndent + 1);
				}
			}
		} // next sAction
		if (!doExecution) docWrite(null, true, docIndent);
	} catch (err) {
		showDebug = 3;
		var context = "doStandardChoiceActions (" + stdChoiceEntry + ")";
		logDebug("**ERROR** An error occured in " + context + " Line " + err.lineNumber + " Error:  " + err.message);
		logDebug("Stack: " + err.stack);
	}
	var thisDate = new Date();
	var thisTime = thisDate.getTime();
	logDebug("Finished: " + stdChoiceEntry + ", Elapsed Time: " + ((thisTime - startTime) / 1000) + " Seconds")
}

function doScriptActions() {
	var showDebug = 3;
	logDebug("Overriding doScriptActions() from INCLUDES_ACCELA_FUNCTIONS with Debug Email Version");
	try {
		include(prefix + ":" + "*/*/*/*");
		if (typeof (appTypeArray) == "object") {
			include(prefix + ":" + appTypeArray[0] + "/*/*/*");
			include(prefix + ":" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/*");
			include(prefix + ":" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/*");
			include(prefix + ":" + appTypeArray[0] + "/*/" + appTypeArray[2] + "/*");
			include(prefix + ":" + appTypeArray[0] + "/*/" + appTypeArray[2] + "/" + appTypeArray[3]);
			include(prefix + ":" + appTypeArray[0] + "/*/*/" + appTypeArray[3]);
			include(prefix + ":" + appTypeArray[0] + "/" + appTypeArray[1] + "/*/" + appTypeArray[3]);
			include(prefix + ":" + appTypeArray[0] + "/" + appTypeArray[1] + "/" + appTypeArray[2] + "/" + appTypeArray[3]);
		}
	} catch (err) {
		showDebug = 3;
		var context = "doScriptActions (include)";
		logDebug("**ERROR** An error occured in " + context + " Line " + err.lineNumber + " Error:  " + err.message);
		logDebug("Stack: " + err.stack);
	}

	// Send Debug Email
	try {
		if (typeof (debugEmailTo) == "undefined") {
			debugEmailTo = "";
		}
		if (typeof (controlString) == "undefined") {
			controlString = "";
		}
		if (debugEmailTo != "") {
			var environment = (typeof (envName) == "undefined" ? "" : (envName == "PROD" ? "" : envName));
			var reportPopup = (showMessage && message.indexOf("/portlets/reports/reportShow.do?") >= 0); // Report Popup in message?
			var debugError = (debug.indexOf("**" + "ERROR") > 0); // Error in debug?
			var capIDMsg = (typeof (capIDString) == "undefined" ? "" : capIDString + " ") + (typeof (capId) == "undefined" ? "" : capId + " ");
			logDebug("showMessage (" + showMessage + ") " + (reportPopup ? " with Report Popup" : "") + " " + message.replace("/portlets/reports/reportShow.do?", "").split("**" + "ERROR").join("** ERROR"));
			logDebug("debug (" + showDebug + ") " + (debugError ? " with ERROR" : "") + ", debugEmailTo: " + debugEmailTo);
			result = aa.sendMail(sysFromEmail, debugEmailTo, "", environment + " DEBUG: " + capIDMsg + controlString + (debugError ? " - Failed" : ""), debug);
			if (result.getSuccess()) {
				logDebug(environment + " DEBUG Email sent to " + debugEmailTo);
				if (reportPopup && !debugError) {
					showDebug = false;
					aa.print(String("===== DEBUG =====<BR>" + debug).replace(/<BR>/g, "\r"));
				} // Allow Popup to show so showDebug must be false;
				if (publicUser && !debugError) {
					showDebug = false;
				} // Don't display debug message in ACA unless ERROR. So debug does prevent page from advancing.
			} else {
				logDebug("Failed to send DEBUG Email to " + debugEmailTo);
			}
			if (debugError) showDebug = true;
		}
	} catch (err) {
		showDebug = 3;
		var context = "doScriptActions (sendDebugEmail)";
		logDebug("ERROR: An error occured in " + context + " Line " + err.lineNumber + " Error:  " + err.message);
		logDebug("Stack: " + err.stack);
	}
}

function logDebug(dstr) {
	if (typeof (formatErrorB) == "undefined") formatErrorB = "";
	if (typeof (formatErrorE) == "undefined") formatErrorE = "";
	if (typeof (lastErrorMsg) == "undefined") lastErrorMsg = "";
	var formatErrB = "";
	var formatErrE = "";
	dstr = "" + dstr;
	if (String(dstr).indexOf("ERROR:") >= 0) {
		formatErrB = formatErrorB;
		formatErrE = formatErrorE;
		aa.print(dstr);
		dstr = formatErrB + dstr + formatErrE;
		lastErrorMsg += dstr + br;
	}
	vLevel = 1
	if (arguments.length > 1)
		vLevel = arguments[1];
	if ((showDebug & vLevel) == vLevel || vLevel == 1)
		debug += dstr + br;
	if ((showDebug & vLevel) == vLevel)
		aa.debug(aa.getServiceProviderCode() + " : " + aa.env.getValue("CurrentUserID"), dstr);
}

function describe_TPS(obj) {
	// Modified from describe to also include typeof & class of object; seperate Properties from Functions; Sort them; additional arguments.
	var newLine = "\n";
	//	var newLine = br;
	//	var newLine = "<BR>";
	var ret = "";
	var oType = null;
	var oNameRegEx = /(^set.*$)/; // find set functions
	var oNameRegEx = /(^get.*$)/; // find get functions
	var oNameRegEx = null;
	var verbose = false;
	if (arguments.length > 1) oType = arguments[1];
	if (arguments.length > 2) oNameRegEx = arguments[2];
	if (arguments.length > 3) verbose = arguments[3];
	if (obj == null) {
		ret += ": null";
		return ret;
	}
	try {
		//		ret += "typeof(): " + typeof (obj) + (obj && obj.getClass ? ", class: " + obj.getClass() : "") + newLine;
		var oPropArray = new Array();
		var oFuncArray = new Array();
		if (oType == null) oType = "*";
		for (var i in obj) {
			if (oNameRegEx && !oNameRegEx.test(i)) {
				continue;
			}
			if ((oType == "*" || oType == "function") && typeof (obj[i]) == "function") {
				oFuncArray.push(i);
			} else if ((oType == "*" || oType == "property") && typeof (obj[i]) != "function") {
				oPropArray.push(i);
			}
		}
		// List Properties
		oPropArray.sort();
		for (var i in oPropArray) {
			n = oPropArray[i];
			oValue = obj[n];
			if (oValue && oValue.getClass) {
				//				logDebug(n + " " + oValue.getClass());
				if (oValue.getClass().toString().equals("class com.accela.aa.emse.dom.ScriptDateTime")) oValue += " " + (new Date(oValue.getEpochMilliseconds()));
				if (oValue.getClass().toString().equals("class com.accela.aa.emse.util.ScriptDateTime")) oValue += " " + (new Date(oValue.getEpochMilliseconds()));
				// if (oValue.getClass().toString().equals("class java.util.Date")) oValue += " " + convertDate(oValue);
			}
			ret += "property:" + n + " = " + oValue + newLine;
		}
		// List Functions
		oFuncArray.sort();
		for (var i in oFuncArray) {
			n = oFuncArray[i];
			oDef = String(obj[n]).replace("\n", " ").replace("\r", " ").replace(String.fromCharCode(10), " ").replace(String.fromCharCode(10), " ")
			x = oDef.indexOf(n + "()", n.length + 15);
			if (x > 15) x = x + n.length + 1;
			oName = (verbose ? oDef : "function:" + n + "()"); // Include full definition of function if verbose
			oValue = ((n.toString().indexOf("get") == 0 && x > 0) ? obj[n]() : ""); // Get function value if "Get" function and no parameters.
			if (oValue && oValue.getClass) {
				//				logDebug(n + " " + oValue.getClass());
				if (oValue.getClass().toString().equals("class com.accela.aa.emse.dom.ScriptDateTime")) oValue += " " + (new Date(oValue.getEpochMilliseconds()));
				if (oValue.getClass().toString().equals("class com.accela.aa.emse.util.ScriptDateTime")) oValue += " " + (new Date(oValue.getEpochMilliseconds()));
				// if (oValue.getClass().toString().equals("class java.util.Date")) oValue += " " + convertDate(oValue);
			}
			ret += oName + " = " + oValue + newLine;
		}
	} catch (err) {
		showDebug = 3;
		var context = "describe_TPS(" + obj + ")";
		logDebug("ERROR: An error occured in " + context + " Line " + err.lineNumber + " Error:  " + err.message);
		logDebug("Stack: " + err.stack);
	}
	return ret;
}