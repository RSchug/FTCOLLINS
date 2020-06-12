/*------------------------------------------------------------------------------------------------------/
// run in script test to convert std choices to scripts
// NOT PERFECT!!! please review each script
// branches will need to be converted to functions and manually updated.
/------------------------------------------------------------------------------------------------------*/

var includeEvents = false;							// Include Event Associations.
var includeScripts = false; 						// Include Custom Scripts (Business Rules)
var includeCustomScript = true; 					// Include INCLUDES_CUSTOM Scripts
var includeStdChoices = true;						// Include Standard Choices
var includeStdChoiceLine = true; 					// Include Standard Choice Line as comment in output.

var showMessage = false;		// Set to true to see results in popup window
var showDebug = false;			// Set to true to see debug messages in popup window
var disableTokens = false;		// turn off tokenizing of std choices (enables use of "{} and []")
var useAppSpecificGroupName = false;	// Use Group name when populating App Specific Info Values
var useTaskSpecificGroupName = false;	// Use Group name when populating Task Specific Info Values
var enableVariableBranching = true;	// Allows use of variable names in branching.  Branches are not followed in Doc Only
var maxEntries = 99;			// Maximum number of std choice entries.  Entries must be Left Zero Padded
/*------------------------------------------------------------------------------------------------------/
| END User Configurable Parameters
/------------------------------------------------------------------------------------------------------*/
var GLOBAL_VERSION = 3.22;
var cancel = false;

var servProvCode = aa.getServiceProviderCode();
var startDate = new Date();
var startTime = startDate.getTime();
var message = "";									// Message String
if (typeof debug === 'undefined') {
	var debug = "";									// Debug String, do not re-define if calling multiple
}
var br = "<BR>";									// Break Tag
var br = "\n";
var feeSeqList = new Array();						// invoicing fee list
var paymentPeriodList = new Array();				// invoicing pay periods

var currentUserID = aa.env.getValue("CurrentUserID"); // Current User
var systemUserObj = null;  							// Current User Object
var currentUserGroup = null;						// Current User Group
var publicUserID = null;
var publicUser = false;

if (currentUserID.indexOf("PUBLICUSER") == 0) {
	publicUserID = currentUserID;
	currentUserID = "ADMIN";
	publicUser = true;
}
if (currentUserID != null) {
	systemUserObj = aa.person.getUser(currentUserID).getOutput();  	// Current User Object
}
/*------------------------------------------------------------------------------------------------------/
| END User Configurable Parameters
/------------------------------------------------------------------------------------------------------*/
var SCRIPT_VERSION = 9.0;
var useCustomScriptFile = true;  // if true, use Events->Custom Script and Master Scripts, else use Events->Scripts->INCLUDES_*
var useSA = false;
var SA = null;
var SAScript = null;
var bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS", "SUPER_AGENCY_FOR_EMSE");
if (bzr.getSuccess() && bzr.getOutput().getAuditStatus() != "I") {
	useSA = true;
	SA = bzr.getOutput().getDescription();
	bzr = aa.bizDomain.getBizDomainByValue("MULTI_SERVICE_SETTINGS", "SUPER_AGENCY_INCLUDE_SCRIPT");
	if (bzr.getSuccess()) {
		SAScript = bzr.getOutput().getDescription();
	}
}

var controlFlagStdChoice = "EMSE_EXECUTE_OPTIONS";
var doStdChoices = true; // compatibility default
var doScripts = false;
var bzr = aa.bizDomain.getBizDomain(controlFlagStdChoice).getOutput().size() > 0;
if (bzr) {
	var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "STD_CHOICE");
	doStdChoices = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";
	var bvr1 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "SCRIPT");
	doScripts = bvr1.getSuccess() && bvr1.getOutput().getAuditStatus() != "I";
	var bvr3 = aa.bizDomain.getBizDomainByValue(controlFlagStdChoice, "USE_MASTER_INCLUDES");
	if (bvr3.getSuccess()) { if (bvr3.getOutput().getDescription() == "No") useCustomScriptFile = false };
}

if (SA) {
	eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", SA, useCustomScriptFile));
	//	eval(getScriptText("INCLUDES_ACCELA_GLOBALS", SA,useCustomScriptFile));
	eval(getScriptText(SAScript, SA));
} else {
	eval(getScriptText("INCLUDES_ACCELA_FUNCTIONS", null, useCustomScriptFile));
	//	eval(getScriptText("INCLUDES_ACCELA_GLOBALS",null,useCustomScriptFile));
}

eval(getScriptText("INCLUDES_CUSTOM", null, useCustomScriptFile));

function getScriptText(vScriptName, servProvCode, useProductScripts) {
	if (!servProvCode) servProvCode = aa.getServiceProviderCode();
	vScriptName = vScriptName.toUpperCase();
	var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
	try {
		if (useProductScripts) {
			var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);
		} else {
			var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");
		}
		return emseScript.getScriptText() + "";
	} catch (err) {
		return "";
	}
}

/*------------------------------------------------------------------------------------------------------/
| Get Event Script Name List
/------------------------------------------------------------------------------------------------------*/
var sysDate = aa.date.getCurrentDate();
var sysDateMMDDYYYY = dateFormatted(sysDate.getMonth(), sysDate.getDayOfMonth(), sysDate.getYear(), "");

logDebug("EMSE Script Framework Versions");
logDebug("SCRIPT VERSION : " + SCRIPT_VERSION);
logDebug("GLOBAL VERSION : " + GLOBAL_VERSION);

/*------------------------------------------------------------------------------------------------------/
| Get Event Script Name List
/------------------------------------------------------------------------------------------------------*/
var eventNameList = new Array();
var eventScriptList = new Array();
var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
var scriptList = new Array();
if (includeEvents) {
	var scriptList = emseBiz.getAllEventScriptBySPC(servProvCode).toArray();
	logDebug("Event scriptList (emseBiz.emseBiz.getAllEventScriptBySPC(servProvCode)): " + scriptList.join("," + br));
}
for (s in scriptList) {
	var emseScript = scriptList[s];
	if (emseScript.auditStatus == "A") {
		eventNameList.push(emseScript.eventName + " : " + emseScript.scriptCode);
		eventScriptList.push(emseScript.scriptCode);
	}
}

// Get List of custom scripts.
var customScriptList = new Array();
var scriptList0 = new Array();
if (includeScripts) {
	var scriptList = emseBiz.getAllEventScriptBySPC(servProvCode).toArray();
	logDebug("Event scriptList (emseBiz.emseBiz.getAllEventScriptBySPC(servProvCode)): " + scriptList.join("," + br));
	var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
	var scriptModelList = emseBiz.getScriptListBySPC(servProvCode, null);
	var scriptList = [];
	for (ss in scriptModelList) scriptList.push(scriptModelList[ss]);
	logDebug("scriptList (emseBiz.getScriptListBySPC(servProvCode, null)): " + scriptList.join("," + br));
	var scriptList = emseBiz.getScriptNameListByServProvCode(servProvCode);
	logDebug("scriptList (emseBiz.getScriptNameListByServProvCode(servProvCode)): " + scriptList.join("," + br));
	var scriptList = emseBiz.getScriptNameListByServProvCode(aa.getServiceProviderCode());
	logDebug("scriptList (emseBiz.getScriptNameListByServProvCode(aa.getServiceProviderCode()): " + scriptList.join("," + br));
	var scriptList0 = scriptList[0];
	logDebug("scriptList (emseBiz.getScriptNameListByServProvCode(aa.getServiceProviderCode()): " + scriptList.join("," + br));
}
for (s in scriptList0) {
	var vScriptName = scriptList0[s];
	logDebug("scriptList [" + s + "]: " + vScriptName);
	try {
		var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");
		if (!matches(emseScript.auditID, "ADMIN", "JSCHOMP")) continue;
		if (emseScript.auditStatus == "A")
			customScriptList.push(vScriptName);
	} catch (err) {
		aa.print("// **--** Script not found: " + err.Message);
	}
	//    if (customScriptList.length > 0) break;
}

aa.print("// ----------");
aa.print("// Agency: " + servProvCode);
aa.print("//   Date: " + startDate);
aa.print("// Event Scripts: ");
aa.print("//       " + eventNameList.join(br + "//       "));
aa.print("// Custom Scripts:");
aa.print("//       " + customScriptList.join(br + "//       "));
aa.print("// ----------");
var includesCustomText = "";
// Process Script List
for (s in customScriptList) {
	try {
		var vScriptName = customScriptList[s];
		// aa.print("scriptList [" + s + "]: " + vScriptName);
		var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");
		if (vScriptName == "INCLUDES_CUSTOM") {
			includesCustomText += "// ----------\n";
			includesCustomText += "// Start Script: Scripts > " + vScriptName + " " + "^" + "`\n";
			includesCustomText += "//       " + emseScript.getAuditDate() + " " + emseScript.getAuditID() + "\n";
			includesCustomText += "// ----------" + "\n";
			includesCustomText += emseScript.getScriptText() + "\n";
			includesCustomText += "// ----------" + "\n";
			includesCustomText += "// End Script: " + vScriptName + " " + "`" + "^" + "\n";
			includesCustomText += "// ----------" + "\n";
			includesCustomText += "" + "\n";
		} else {
			aa.print("// ----------");
			aa.print("// Start Script: " + vScriptName + " " + "^" + "`");
			aa.print("//       " + emseScript.getAuditDate() + " " + emseScript.getAuditID());
			aa.print("// ----------");
			aa.print(emseScript.getScriptText());
			aa.print("// ----------");
			aa.print("// End Script: " + vScriptName + " " + "`" + "^");
			aa.print("// ----------");
			aa.print("");
		}
	} catch (err) {
		aa.print("// **--** Script not found: " + vScriptName + " Reason: " + err.Message);
	}
}
// Process INCLUDES_CUSTOM script.
var vScriptName = "";
if (includeCustomScript) {
	var vScriptName = "INCLUDES_CUSTOM";
}
if (vScriptName) {
	try {
		var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);
		includesCustomText += "// ----------\n";
		includesCustomText += "// Start Script: Custom Script > " + vScriptName + " " + "^" + "`\n";
		includesCustomText += "//       " + emseScript.getAuditDate() + " " + emseScript.getAuditID() + "\n";
		includesCustomText += "// ----------\n";
		includesCustomText += emseScript.getScriptText() + "\n";
		includesCustomText += "// ----------\n";
		includesCustomText += "// End Script: Custom Script > " + vScriptName + " " + "`" + "^" + "\n";
		includesCustomText += "// ----------\n";
		includesCustomText += "\n";
	} catch (err) {
		includesCustomText += "// ----------\n";
		includesCustomText += "// No Custom Script > " + vScriptName + " " + "^" + "`\n";
		includesCustomText += "// ----------\n";
		includesCustomText += "\n";
	}
}

var bl = new Array();
if (includeStdChoices) {
	var b = aa.proxyInvoker.newInstance("com.accela.aa.aamain.systemConfig.BizDomainBusiness").getOutput()
	bl = b.getRBizDomains(aa.getServiceProviderCode()).toArray();
}
branchChoices = new Array();
branches = new Array();
for (i in bl) {
	var exportFlag = false, functionFlag = false;
	if (i == 0) logDebug("bl[0]: " + describe_TPS(bl[0]));
	if (bl[i].getBizDomain().toString().indexOf("ES_") == 0) { exportFlag = true; functionFlag = true; }
	else if (bl[i].getBizDomain().toString().indexOf("EMSE:") == 0) { exportFlag = true; functionFlag = true; }
	else if (bl[i].getType() && bl[i].getType().equals("EMSE")) exportFlag = true
	if (exportFlag) {
		var vScriptName = bl[i].getBizDomain().replace(":", ";").replace("/", "!").replace("*", "~")
		logDebug("Standard Choice: " + bl[i].getBizDomain() + " " + bl[i].getType() + " as " + vScriptName);
		if (bl[i].getBizDomain().toString().indexOf("/*") > 0) functionFlag = false;
		var functionName = bl[i].getBizDomain().toString().split(":").join("_");
		functionName = functionName.split(" ").join("_");
		logDebug(((bl[i].getType() && bl[i].getAuditStatus() == "A") ? "" : "<font color=lightGrey>") + "Standard Choice: " + bl[i].getType() + " " + bl[i].getBizDomain() + " as " + (functionFlag ? "function " + functionName : vScriptName) + ((bl[i].getType() && bl[i].getAuditStatus() == "A") ? "" : "<font color=lightGrey>"));
		if (functionFlag) {
			/*
						includesCustomText += "// ----------\n";
						includesCustomText += "// Start Function: " + functionName + " " + "^" + "`\n";
						includesCustomText += "// ----------\n";
			*/
			includesCustomText += "function " + functionName + "() { // from Standard Choice " + bl[i].getBizDomain().toString() + "\n";
			includesCustomText += convert(bl[i], false) + "\n";
			includesCustomText += "}\n";
			/*
						includesCustomText += "// ----------\n";
						includesCustomText += "// End Function: " + vScriptName + " " + "`" + "^\n";
						includesCustomText += "// ----------\n";
			*/
		} else {
			aa.print("// ----------");
			aa.print("// Start Script: " + vScriptName + " " + "^" + "`");
			aa.print("// ----------");
			aa.print(convert(bl[i]));
			aa.print("// ----------");
			aa.print("// End Script: " + vScriptName + " " + "`" + "^");
			aa.print("// ----------");
		}
		aa.print("");
	} else {
		logDebug(((bl[i].getType() || bl[i].getAuditStatus() != "A") ? "<font color=lightGrey>" : "<font color=orange>") + "Standard Choice: " + bl[i].getType() + " " + bl[i].getBizDomain() + " Skipped" + "</font>");
	}
}
// Output INCLUDES_CUSTOM
aa.print(includesCustomText);

/*------------------------------------------------------------------------------------------------------/
| <===========END=Main=Loop================>
/-----------------------------------------------------------------------------------------------------*/
aa.env.setValue("ScriptReturnCode", "0");
aa.env.setValue("ScriptReturnMessage", debug.replace(/\n/g, "<BR>").replace(/\r/g, "<BR>"));

/*------------------------------------------------------------------------------------------------------/
| <=========== Functions ================>
/-----------------------------------------------------------------------------------------------------*/
function getScriptAction(strControl) {
	var actArray = new Array();
	var maxLength = String("" + maxEntries).length;

	var bizDomScriptResult = aa.bizDomain.getBizDomain(strControl);

	if (bizDomScriptResult.getSuccess()) {
		bizDomScriptArray = bizDomScriptResult.getOutput().toArray()

		for (var i in bizDomScriptArray) {
			// this list is sorted the same as the UI, no reason to re-sort

			var myObj = new pairObj(bizDomScriptArray[i].getBizdomainValue());
			myObj.load(bizDomScriptArray[i].getDescription());
			if (bizDomScriptArray[i].getAuditStatus() == 'I') myObj.enabled = false;
			actArray.push(myObj);
		}
	}

	return actArray;
}

function convert(strControl) {
	var incStdChoiceLine = includeStdChoiceLine;
	if (arguments.length > 1) incStdChoiceLine = arguments[1];
	var fMsg = "";
	var bizDomScriptResult = aa.bizDomain.getBizDomain(strControl.getBizDomain());
	if (bizDomScriptResult.getSuccess()) {
		bizDomScriptArray = bizDomScriptResult.getOutput().toArray()

		var disableTokens = false;
		var ifStatement = false;
		for (var i in bizDomScriptArray) {
			if (bizDomScriptArray[i].getDescription()) {
				l = bizDomScriptArray[i].getDescription().trim().split("\\^");
				if (l[0].length() && ifStatement) {
					ifStatement = false;
					fMsg += "\t}\n";  // finish continuation
				}

				// Include line being converted.
				//	if (incStdChoiceLine) fMsg += "// " + " #" + bizDomScriptArray[i].getBizdomainValue() + ": " + bizDomScriptArray[i].getDescription() + "\n";
				if (incStdChoiceLine) {
					fMsg += "// " + strControl.getBizDomain().trim()
						+ " #" + bizDomScriptArray[i].getBizdomainValue() + ": "
						+ (bizDomScriptArray[i].getAuditStatus() == 'I' ? "// (Disabled)" : "")
						+ bizDomScriptArray[i].getDescription() + "\n";
				}

				if (l[0].length() && l[0] != "true" && l[0] != "true ") {
					ifStatement = true;
					if (!disableTokens) {
						l[0] = l[0].replace("{", 'AInfo["');
						l[0] = l[0].replace("}", '"]');
					}
					fMsg += "if (" + l[0].trim() + ") {" + "\n";
				} else {
					if (l[0].length()) ifStatement = false;
				}

				if (l[1]) {
					if (l[1].indexOf("disableTokens=true")) disableTokens = true;
					if (l[1].indexOf("disableTokens=false")) disableTokens = false;
					lt = l[1].trim().split(";");
					for (var j in lt) {
						if (!disableTokens) {
							lt[j] = lt[j].replace("{", 'AInfo["');
							lt[j] = lt[j].replace("}", '"]');
						}
						fMsg += (ifStatement ? "\t" : "") + replaceBranch(lt[j].trim()) + ";" + "\n";
					}
				}

				if (ifStatement && l[2]) {
					fMsg += "\t} else {" + "\n";
					if (l[2].indexOf("disableTokens=true")) disableTokens = true;
					if (l[2].indexOf("disableTokens=false")) disableTokens = false;
					lt = l[2].trim().split(";");
					for (var j in lt) {
						if (!disableTokens) {
							lt[j] = lt[j].replace("{", 'AInfo["');
							lt[j] = lt[j].replace("}", '"]');
						}
						fMsg += "\t" + replaceBranch(lt[j].trim()) + ";" + "\n";
					}
				}
			}
		}
		if (ifStatement) fMsg += "\t}" + "\n";
	}
	return fMsg;
}

/*
var branches = new Array();
aa.print(replaceBranch('	for (x in rentalChildrenCapId) branch("ES_ACA_REG_HOUSING_RENTAL_PROP_PARCEL_LP");'));
aa.print(replaceBranch('	branch("esTDtest");'));
aa.print(replaceBranch('	branch("ES_Notification_Params_Building_DT");'));
*/
function replaceBranch(aStatement) {
	var branchObj = { Found: false, Name: "", Token: "", Call: "" }

	var branchFound = false;
	var branchName = "";
	var branchToken = "";
	var branchCall = "";
	var newStatement = aStatement;
	if (!(aStatement.indexOf('branch("') >= 0)) return newStatement;
	//	aa.print("replaceBranch(" + aStatement + ") <<1>> " + String(aStatement).split('"').join(" | "));
	var xStatementArray = aStatement.split('"');
	for (branchToken in branches) {
		//		aa.print("T: " + branchToken);
		if (aStatement.indexOf(branchToken) >= 0) {
			newStatement = newStatement.replace(branchToken, branches[branchToken].call);
			return newStatement;
		}
	}
	//	aa.print("replaceBranch(" + aStatement + ") <<2>> " + String(aStatement).split('"').join(" | "));
	for (x in xStatementArray) {
		xStatement = xStatementArray[x];
		if (branchFound) {
			if (xStatement.indexOf(")") >= 0) {
				branchFound = false;
				branchToken = 'branch("' + branchName + '")';
				branchCall = branchName + '()' // call ' + branchToken;
				newStatement = newStatement.replace(branchToken, branchCall);
				branches[branchToken] = { name: branchName, token: branchToken, call: branchCall };
			} else {
				branchName = xStatement;
			}
		}
		if (xStatement.indexOf("branch(") >= 0) { branchFound = true; branchName = ""; }
		//		aa.print(x + " " + xStatement + ": " + branchFound + " " + branchName + " --> " + branchToken + " >> " + branchCall);
	}
	return newStatement;
}

function getCustomScripts() {
	var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
	try {
		var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");
		return emseScript.getScriptText() + "";
	} catch (err) {
		return "";
	}
}

function getScriptText(vScriptName, servProvCode, useProductScripts) {
	if (!servProvCode)
		servProvCode = aa.getServiceProviderCode();
	vScriptName = vScriptName.toUpperCase();
	var emseBiz = aa.proxyInvoker.newInstance("com.accela.aa.emse.emse.EMSEBusiness").getOutput();
	try {
		if (useProductScripts) {
			var emseScript = emseBiz.getMasterScript(aa.getServiceProviderCode(), vScriptName);
		} else {
			var emseScript = emseBiz.getScriptByPK(aa.getServiceProviderCode(), vScriptName, "ADMIN");
		}
		return emseScript.getScriptText() + "";
	} catch (err) { return ""; }
}


//
// matches:  returns true if value matches any of the following arguments
//
function matches(eVal, argList) {
	for (var i = 1; i < arguments.length; i++) {
		if (arguments[i] == eVal) {
			return true;
		}
	}
	return false;
}

function describe_TPS(obj) {
	// Modified from describe to also include typeof & class of object; seperate Properties from Functions; Sort them; additional arguments.
	var newLine = "\n";
	var newLine = br;
	var newLine = "<BR>";
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
		ret += "typeof(): " + typeof (obj) + (obj && obj.getClass ? ", class: " + obj.getClass() : "") + newLine;
		var oPropArray = new Array();
		var oFuncArray = new Array();
		if (oType == null) oType = "*";
		for (var i in obj) {
			if (oNameRegEx && !oNameRegEx.test(i)) { continue; }
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
			oName = (verbose ? oDef : "function:" + n + "()");                              // Include full definition of function if verbose
			oValue = ((n.toString().indexOf("get") == 0 && x > 0) ? obj[n]() : "");  // Get function value if "Get" function and no parameters.
			if (oValue && oValue.getClass) {
				//				logDebug(n + " " + oValue.getClass());
				if (oValue.getClass().toString().equals("class com.accela.aa.emse.dom.ScriptDateTime")) oValue += " " + (new Date(oValue.getEpochMilliseconds()));
				if (oValue.getClass().toString().equals("class com.accela.aa.emse.util.ScriptDateTime")) oValue += " " + (new Date(oValue.getEpochMilliseconds()));
				// if (oValue.getClass().toString().equals("class java.util.Date")) oValue += " " + convertDate(oValue);
			}
			ret += oName + " = " + oValue + newLine;
		}
	} catch (err) {
		logDebug("Error in describe_TPS() at line " + err.lineNumber + " : " + err.message);
		logDebug("Stack: " + err.stack);
	}
	return ret;
}
// JavaScript source code
