/*------------------------------------------------------------------------------------------------------/
|  UpdateChildTasks Function (Start)
/------------------------------------------------------------------------------------------------------*/

function updateChildTasks(wfstr, wfstat, wfcomment, wfnote, wfActivate, wfAction) // optional process name
{
	//
	// wfActive = true/false.  If true, activate child task
	// wfAction = "U" Unchanged, "B" Branch "L" Loop "Y" Close

	var validActions = "UBLY";

	if (validActions.indexOf(wfAction) < 0) wfAction = "U";  // default

	var childResult = aa.cap.getChildByMasterID(capId);  // children array

	if (childResult.getSuccess())
		childArray = childResult.getOutput();
	else { message += "ERROR: Failed to get child apps: " + childResult.getErrorMessage() + br; return false; }

	for (thisChild in childArray) {
		var childId = childArray[thisChild].getCapID();
		var useProcess = false;
		var processName = "";
		if (arguments.length == 5) {
			processName = arguments[4]; // subprocess
			useProcess = true;
		}

		var workflowResult = aa.workflow.getTasks(childId);
		if (workflowResult.getSuccess())
			wfObj = workflowResult.getOutput();
		else { message += "ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage() + br; return false; }

		if (!wfstat) wfstat = "NA";

		for (i in wfObj) {
			fTask = wfObj[i];

			//if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase())  && (!useProcess || fTask.getProcessCode().equals(processName)))
			//
			// Custom for Ft Collins.  Only update if the child status <> "OK"
			//
			if (fTask.getDisposition() != "OK" && fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase()) && (!useProcess || fTask.getProcessCode().equals(processName))) {
				dispositionDate = aa.date.getCurrentDate();
				stepnumber = fTask.getStepNumber();
				processID = fTask.getProcessID();


				if (useProcess) {
					if (wfActivate) aa.workflow.adjustTask(childId, stepnumber, processID, "Y", "N", null, null);
					aa.workflow.handleDisposition(childId, stepnumber, processID, wfstat, dispositionDate, wfnote, wfcomment, systemUserObj, "U");
				}
				else {
					if (wfActivate) aa.workflow.adjustTask(childId, stepnumber, "Y", "N", null, null);
					aa.workflow.handleDisposition(childId, stepnumber, wfstat, dispositionDate, wfnote, wfcomment, systemUserObj, "U");
				}

				message += "Updating Child:" + childId.toString() + ", Workflow Task: " + wfstr + " with status " + wfstat + " with comment " + wfcomment + br;
				debug += "Updating Child:" + childId.toString() + ",  Workflow Task: " + wfstr + " with status " + wfstat + " with comment " + wfcomment + br;
			}
		}
	}
}
/*------------------------------------------------------------------------------------------------------/
|  Update ChildTask Functions (End)
/------------------------------------------------------------------------------------------------------*/
