//var docReqApp = true;			// Document Only -- displays controls by app type in script test window.
/*------------------------------------------------------------------------------------------------------/
| Program: AppSubmitBefore.js               
| Event Trigger: ApplicationSubmitBefore
| Client : FT COLLINS, CO
| SAN# : 05SSP-00495
| 
| Reject Application Submittal based on criteria
|
| This script requires that "AppSpecificInfoModels" be added as an input parameter for this event
|
|                                                                       
| Version 0.1 - Base Version -							10/18/2005 - John Schomp
|
/------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------/
|
| START USER CONFIGURABLE PARAMETERS
|
|	Almost all user configurable parameters are stored in Standard Choices:
|	
|	Application Submittal Script Control : 	Points to Criteria/Action pairs (Standard Choice Entries)
|						by Application Type
|
/------------------------------------------------------------------------------------------------------*/
var showMessage = false;			// Set to true to see results in popup window
var showDebug = false;			// Set to true to see debug messages in popup window
var controlString = "ApplicationSubmitBefore Script Control";  // Standard choice for control
/*------------------------------------------------------------------------------------------------------/
|
| END USER CONFIGURABLE PARAMETERS
|
/------------------------------------------------------------------------------------------------------*/
var message =	"";					// Message String
var debug = "";
var br = "<BR>";					// Break Tag
var appTypeString = aa.env.getValue("ApplicationTypeLevel1") + "/" + aa.env.getValue("ApplicationTypeLevel2") + "/" + aa.env.getValue("ApplicationTypeLevel3") + "/" + aa.env.getValue("ApplicationTypeLevel4");
var doSubmit = true;					// Boolean, do we submit this application?
var AInfo = AppSpecific();				// Associative array of appspecifc info

/*------------------------------------------------------------------------------------------------------/
| <===========Main=Loop================>
| 
/-----------------------------------------------------------------------------------------------------*/
var sControl = getScriptControl(appTypeString);

for (loopx in sControl)
	{
	var sAction = getScriptAction(sControl[loopx]);

	for (loopy in sAction)
		{
		actArray = sAction[loopy].split('^');
		if (actArray.length != 2)
			{
			message+="ERROR: The following Criteria/Message pair is incorrectly formatted.  Two elements separated by a caret (\"^\") are required. " + br + br + sAction[yy] + br;
			}
		else
			{
			actCriteria = token(actArray[0],"[","aa.env.getValue(\"");
			actCriteria = token(actCriteria,"]","\")");
			actCriteria = token(actCriteria,"{","AInfo[\"");
			actCriteria = token(actCriteria,"}","\"]");

			actMessage = actArray[1];
			
			debug += actCriteria + br;
			
			if (eval(actCriteria))
				{
				if (doSubmit) message+= "APPLICATION SUBMITTAL CANCELLED:" + br + br;
				message+=actMessage + br;
				doSubmit = false;
				}

			}
		} // next sAction
	} // next sControl

/*------------------------------------------------------------------------------------------------------/
| <===========END=Main=Loop================>
/-----------------------------------------------------------------------------------------------------*/

if (doSubmit)
	{
	aa.env.setValue("ScriptReturnCode", "0");
	if (showMessage) aa.env.setValue("ScriptReturnMessage", message);
	if (showDebug) 	aa.env.setValue("ScriptReturnMessage", debug);
	}
else
	{
	aa.env.setValue("ScriptReturnCode", "1");
	aa.env.setValue("ScriptReturnMessage", message);
	}

/*------------------------------------------------------------------------------------------------------/
| <===========External Functions (used by Action entries)
/------------------------------------------------------------------------------------------------------*/


/*------------------------------------------------------------------------------------------------------/
| <===========Internal Functions and Classes (Used by this script)
/------------------------------------------------------------------------------------------------------*/
function AppSpecific(myCapId) {
	// 
	// Returns an associative array of App Specific Info
	//
  	appArray = new Array();

	var fAppSpecInfoObj = aa.env.getValue("AppSpecificInfoModels");

	for (loopk in fAppSpecInfoObj)
		{
		appArray[fAppSpecInfoObj[loopk].checkboxDesc] = fAppSpecInfoObj[loopk].checklistComment;
		debug+="AInfo[" + fAppSpecInfoObj[loopk].checkboxDesc + "] = " + fAppSpecInfoObj[loopk].checklistComment + br;
		}

	return appArray;
}

//
// exists:  return true if Value is in Array
//
function exists(eVal, eArray) {
	  for (ii in eArray) 
	  	if (eArray[ii] == eVal) return true;
	  return false;
}
			
//
// Get the Four standard choices domain for this application type
//
function getScriptControl(strAppType) 
	{
	var arrControl = new Array();
	capTypeArray = strAppType.split('/');
	var fGroup = capTypeArray[0];
	var fType = capTypeArray[1];
	var fSubType = capTypeArray[2];
	var fCategory = capTypeArray[3];
	// These can be commented out if not used -- they will slow down the event (error finding non-existant rbizdomain)
	arrControl.push(getBizDomainControl("*/*/*/*"));
	arrControl.push(getBizDomainControl(fGroup + "/*/*/*"));
	arrControl.push(getBizDomainControl(fGroup + "/" + fType + "/*/*"));
	arrControl.push(getBizDomainControl(fGroup + "/" + fType + "/" + fSubType + "/*"));
	arrControl.push(getBizDomainControl(fGroup + "/" + fType + "/*/" + fCategory));
	arrControl.push(getBizDomainControl(strAppType));
	return arrControl;
	}	
//
// Get the script control
//
function getBizDomainControl(strAppType) 
	{
	var strControl;
	var bizDomScriptResult = aa.bizDomain.getBizDomainByValue(controlString,strAppType);
	
   	if (bizDomScriptResult.getSuccess())
   		{
		bizDomScriptObj = bizDomScriptResult.getOutput();
		var bizDomObj = bizDomScriptObj.getBizDomain();
		var strControl = "" + bizDomScriptObj.getDescription(); // had to do this or it bombs.  who knows why?
		debug+="Application Type: " + strAppType + br;
		debug+="Action Item: " + strControl + br;
		}
 	
	return strControl;
	}	
//
// Get the standard choices domain for this application type
//
function getScriptAction(strControl) 
	{
	var actArray = new Array();
	for (var count=1; count < 99; count++)  // Must be sequential from 1 up to 99
		{
		var bizDomScriptResult = aa.bizDomain.getBizDomainByValue(strControl,count);
	   	
	   	if (bizDomScriptResult.getSuccess())
	   		{
			bizDomScriptObj = bizDomScriptResult.getOutput();
			var bizDomObj = bizDomScriptObj.getBizDomain();
			if (bizDomScriptObj.getAuditStatus() != 'I')
				{
				var strAction = "" + bizDomScriptObj.getDescription(); // had to do this or it bombs.  who knows why?
				actArray.push(strAction);
				}
			}
		else
			{
			break;
			}
		}
	return actArray;
	}
	
function token(s, t, u) {
  /*
  **  Replace a token in a string
  **    s  string to be processed
  **    t  token to be found and removed
  **    u  token to be inserted
  **  returns new String
  */
  i = s.indexOf(t);
  r = "";
  if (i == -1) return s;
  r += s.substring(0,i) + u;
  if ( i + t.length < s.length)
    r += token(s.substring(i + t.length, s.length), t, u);
  return r;
  }
  
//
// doDocApp() :	Documents controls grouped by application type.
//		Exits the script without doing any logic -- used only for documentation.
//		Execute this script from with the "SCRIPT TEST" window
//
function doDocApp() {
	var cta = aa.cap.getCapTypeList(null).getOutput();
	for (y in cta)
		{
		var ct = cta[y].getCapType();
		var cts = ct.toString();
		var ctControl = getScriptControl("Application Submittal Script Control",cts);
		if (ctControl)
			{
			var ctAction = getScriptAction(ctControl);

			var first = true;
			for (z in ctAction)
				{
				if (first)
					{
					aa.print("************************************************************************")
					aa.print(cts);
					aa.print("  (" + ctControl + ")");
					aa.print("************************************************************************")
					first = false;
					}
				ctArray = ctAction[z].split('^');
				if (ctArray.length != 2)
					{
					message+="ERROR: The following Criteria/Action pair is incorrectly formatted.  Two elements separated by a caret (\"^\") are required. " + br + br + sAction[yy] + br;
					}
				else
					{
					aa.print("Criteria #" + z + " : " + ctArray[0]);
					aa.print("Action   #" + z + " : " + ctArray[1]);
					aa.print(" ");
					}
				}
			}
		} // app type list
	aa.abortScript();
	}