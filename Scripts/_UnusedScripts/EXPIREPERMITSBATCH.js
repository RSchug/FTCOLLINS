/*------------------------------------------------------------------------------------------------------/
| Program: ExpirePermitsBatch.js  Trigger: Batch    Client : Spokane   SAN# : 06SSP-00242
| 
| SPOKANE 06SSP-00242
|                                                                       
| Version 0.1 - Base Version -							10/13/2005 - John Schomp
| Version 0.2 - Added Lock							02/01/2007 - John Schomp
| Version 0.3 - Added Lock only if Closure Task is Active			02/01/2007 - John Schomp
/------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------/
|
| START USER CONFIGURABLE PARAMETERS
|
|
/------------------------------------------------------------------------------------------------------*/
var showMessage = false;			// Set to true to see results in popup window
var showDebug = true;				// Set to true to see debug messages in popup window
var labelSearch = "Permit Expiration Date";		// Label to search for Expiration Date
var statusSet = "Expired"			// Set the app status to this value
var maxSeconds = 4*60;				// number of seconds allowed for batch processing, usually < 5*60
var maxDays = 999;				// Maximum Span to search for scheduled inspections
var emailText = "";
/*----------------------------------------------------------------------------------------------------/
|
| END USER CONFIGURABLE PARAMETERS
|
/------------------------------------------------------------------------------------------------------*/
var systemUserObj = aa.person.getUser("ADMIN").getOutput();  // Current User Object
var ExpireDate = aa.env.getValue("ExpireDate");
var emailAddress = "" + aa.env.getValue("EmailAddress");	// email to send report
var batchJobName = "" + aa.env.getValue("BatchJobName");	// Name of the batch job
/*----------------------------------------------------------------------------------------------------/
|
| END BATCH PARAMETERS
|
/------------------------------------------------------------------------------------------------------*/
var message = "";

var startDate = new Date();

if (!ExpireDate.length())
	var ExpireDate = "" + zeroLeftPad(startDate.getMonth()+1,2) + "/" + zeroLeftPad(startDate.getDate(),2) + "/" + startDate.getFullYear();
	
var startTime = startDate.getTime();			// Start timer

var sysDate = aa.date.getCurrentDate();

var timeExpired = false;
var batchJobID = aa.batchJob.getJobID().getOutput();
var batchJobName = aa.env.getValue("BatchJobName");
var br = "<BR>";				

	
/*------------------------------------------------------------------------------------------------------/
| <===========Main=Loop================>
| 
/-----------------------------------------------------------------------------------------------------*/
logMessage("START","Start of Job");
logMessage("PARAMETER ExpireDate = " + ExpireDate);
logMessage("PARAMETER emailAddress = " + emailAddress);
logMessage("PARAMETER batchJobName = " + batchJobName);

ASIResult = aa.cap.getCapIDsByAppSpecificInfoField(labelSearch, ExpireDate);

if (ASIResult.getSuccess())
	{
	ASIArray = ASIResult.getOutput();
	logMessage("Searching through " + ASIArray.length + " permits.  Elapsed Time : " + elapsed() + " Seconds");
	for (ii in ASIArray)
		{
		if (elapsed() > maxSeconds) // only continue if time hasn't expired
			{ 
			logMessage("A script timeout has caused partial completion of this process.  Please re-run.  " + elapsed() + " seconds elapsed, " + maxSeconds + " allowed.") ;
			logMessage("Looped through " + ii + " records.") ;
			timeExpired = true ;
			break; 
			}
			
		if (ASIArray[ii] == null)
			{
			aa.print("permit #" + ii + " is null");
			continue;
			}
			

		var capObj = ASIArray[ii];
		
		capId = capObj.getCapID();
		
		var altCapId = aa.cap.getCapID(capId.getID1(),capId.getID2(),capId.getID3()).getOutput()
		var altId = altCapId.getCustomID();		
		
		var cap = aa.cap.getCap(capId).getOutput();			
		var capStatus = cap.getCapStatus();
		
		if (capStatus && capStatus.equals(statusSet))
			logMessage(capId.toString() + ": Already at " + statusSet + " status");
		else
			{
			updateAppStatus(statusSet,"Auto-expiration by batch script");
			//if (isTaskActive("Closure")) addAppCondition("Permit","Applied","Close Permit","Auto Close by Batch","Lock");
			}

		}
	}	
		
else
	{
	logMessage("ERROR: getting caps: " + ASIResult.getErrorMessage());
	}


logMessage("End of Job: Elapsed Time : " + elapsed() + " Seconds");

if (emailAddress.length) aa.sendMail("noreply@accela.com", emailAddress, "", batchJobName + " Results", emailText);

/*------------------------------------------------------------------------------------------------------/
| <===========END=Main=Loop================>
/-----------------------------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------------------------------/
| <===========Internal Functions and Classes (Used by this script)
/------------------------------------------------------------------------------------------------------*/

function zeroLeftPad(stw,noz)
	{
	if (stw == null) { stw = "" }
	var workstr = "000000000000000000000000000000000000000000000000000" + stw;
	return String(workstr).substring(workstr.length,workstr.length - noz);
	}
	
function updateAppStatus(stat,cmt) // optional cap id
	{
	
	itemCap = capId;
	if (arguments.length == 3) itemCap = arguments[2]; // use cap ID specified in args

	updateStatusResult = aa.cap.updateAppStatus(itemCap,"APPLICATION",stat, sysDate, cmt ,systemUserObj);
	if (updateStatusResult.getSuccess())
		logMessage(altId + ": Updated application status to " + stat + " successfully.");
	else
		logMessage(altId + ": ERROR: application status update to " + stat + " was unsuccessful.  The reason is "  + updateStatusResult.getErrorType() + ":" + updateStatusResult.getErrorMessage());
	}

	
function elapsed() {
	var thisDate = new Date();
	var thisTime = thisDate.getTime();
	return ((thisTime - startTime) / 1000) 
	}
	
function logMessage(edesc) {
	aa.eventLog.createEventLog("INFO", "Batch Process", batchJobName, sysDate, sysDate,"", edesc,batchJobID);
	aa.print(edesc);
	emailText+=edesc + "\n";
	}

function logDebug(edesc) {
	if (showDebug) {
		aa.eventLog.createEventLog("DEBUG", "Batch Process", batchJobName, sysDate, sysDate,"", edesc,batchJobID);
		aa.print("DEBUG : " + edesc);
		emailText+="DEBUG : " + edesc + "\n"; }
	}

function addAppCondition(cType,cStatus,cDesc,cComment,cImpact)
	{
	var addCapCondResult = aa.capCondition.addCapCondition(capId, cType, cDesc, cComment, sysDate, null, sysDate, null,null, cImpact, systemUserObj, systemUserObj, cStatus, "ADMIN", "A")
        if (addCapCondResult.getSuccess())
        	{
		logMessage("Successfully added condition (" + cImpact + ") " + cDesc);
		logDebug("Successfully added condition (" + cImpact + ") " + cDesc);
		}
	else
		{
		logDebug( "ERROR: adding condition (" + cImpact + "): " + addCapCondResult.getErrorMessage());
		}
	}

function isTaskActive(wfstr) // optional process name
	{
	var useProcess = false;
	var processName = "";
	if (arguments.length == 2) 
		{
		processName = arguments[1]; // subprocess
		useProcess = true;
		}

	var workflowResult = aa.workflow.getTasks(capId);
 	if (workflowResult.getSuccess())
  	 	wfObj = workflowResult.getOutput();
  	else
  	  	{ logMessage("ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage()); return false; }
	
	for (i in wfObj)
		{
   		fTask = wfObj[i];
 		if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase())  && (!useProcess || fTask.getProcessCode().equals(processName)))
			if (fTask.getActiveFlag().equals("Y"))
				return true;
			else
				return false;
		}
	}