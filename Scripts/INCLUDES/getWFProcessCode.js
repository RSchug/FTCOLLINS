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
