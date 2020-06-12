/*------------------------------------------------------------------------------------------------------/
|  3.0 Scripting Functions (Start)
/------------------------------------------------------------------------------------------------------*/
function doStandardChoiceActions(stdChoiceEntry, doExecution, docIndent) {
	if (typeof (stdChoiceCriteriaBeginTrue) == "undefined") {
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
	}

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
	// Modified from INCLUDES_ACCELA_FUNCTIONS v9.3.6
	//  02/13/2020 RS: Check if prefix is defined.
	//  02/13/2020 RS: Includes scripts for prefix:*/*/*/* and prefix:module/*/*/*:wfProcess
	//  02/13/2020 RS: Try to catch script error.
	try {
		if (typeof (vEventName) == "undefined") vEventName = controlString;
		if (typeof (prefix) == "undefined") prefix = lookup("EMSE_VARIABLE_BRANCH_PREFIX", vEventName);
		if (typeof (prefix) == "undefined") { logDebug(vEventName + " is not setup in EMSE_VARIABLE_BRANCH_PREFIX"); return }
		include(prefix + ":" + "*/*/*/*");
		if (typeof (appTypeArray) == "object") {
			include(prefix + ":" + appTypeArray[0] + "/*/*/*");
			if (typeof (wfProcess) != "undefined")
				include(prefix + ":" + appTypeArray[0] + "/*/*/*:" + wfProcess);
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
		logDebug("**ERROR: An error occured in " + context + " Line " + err.lineNumber + " Error:  " + err.message);
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

function include(s) {
	try {
		var thisDate = new Date();
		var thisTime = thisDate.getTime();
		var st = getScriptText(s);
		logDebug("INCLUDES_CUSTOM include: " + s + " " + st.length + br + st);
		if (st && st == "null") st = null;
		if (st && st.length) {
			logDebug("Executing script : " + s + ", Elapsed Time: " + ((thisTime - startTime) / 1000) + " Seconds")
			eval(st);
		}
	} catch (err) {
		showDebug = 3;
		handleError(err, s);
	}
}

function handleError(err, context) {
	var rollBack = true;
	var showError = true;

	if (showError) showDebug = true;
	logDebug((rollBack ? "**ERROR** " : "ERROR: ") + err.message + " In " + context + " Line " + err.lineNumber);
	logDebug("Stack: " + err.stack);
}

function getWFProcessCode() {
	// Get Workflow Process Code from cap
	var itemCap = capId;
	if (arguments.length > 0 && arguments[0]) itemCap = arguments[0];
	var workflowResult = aa.workflow.getProcessRelationByCapID(itemCap, null);
	if (!workflowResult.getSuccess() || workflowResult.getOutput() == null) {
		logDebug("**ERROR: Failed to get workflow object: " + workflowResult.getErrorMessage());
		return false;
	}
	wfObj = workflowResult.getOutput();
	for (i in wfObj) {
		fTask = wfObj[i];
		if (fTask.parentTaskName != null) continue; 	// Ignore Sub Processes.
		if (fTask.parentProcessID != 0) continue; 	// Ignore Sub Processes.
		logDebug("fTask.processID: " + fTask.processID + ", workflowName: " + fTask.workflowName + ", stepNumber: " + fTask.stepNumber + ", processCode: " + fTask.processCode);
		// logDebug("fTask.parentProcessID: " + fTask.parentProcessID + ", parentTaskName: " + fTask.parentTaskName);
		return fTask.processCode;
	}
}

/*------------------------------------------------------------------------------------------------------/
|  3.0 Scripting Functions (End)
/------------------------------------------------------------------------------------------------------*/
