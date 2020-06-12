/*------------------------------------------------------------------------------------------------------/
|  EDR Document Routing Functions (Start)
/------------------------------------------------------------------------------------------------------*/

//Always call with param "E"
function autoRouteReviews(reviewType, initial) {
	//reviewType is "E", no "P" at this time
	// E - Electronic
	// P - Physical
	//initial will be a Y/N, Y if the first time through the review process, because we only want to create the Doc Review Tasks one time.

	logDebug("Inside autoRouteReviews().  Params: " + reviewType + ", " + initial);

	reviewListArray = new Array();
	reviewList = lookup("PLAN REVIEW - REQUIRED REVIEWS", "ALL");	//requiredReviewsStdChoice ... Get Reviews Required by Record Type from Standard Choice
	reviewListArray = reviewList.split(",")

	//logDebug("About to call function setReviewWorkflowTasksByTsiFields(reviewListArray)");

	//setReviewWorkflowTasksByTsiFields(reviewListArray);	//Activate Review Task and set Due Date from TSI.

	// If an electronic review and this is the first pass of Plan Review, create the document review tasks
	if (reviewType == "E" && initial == "Y") {
		logDebug("reviewType is E and initial is Y, get doc category list from standard choice");
		docCategoryArray = new Array();
		docCategoryList = lookup("PLAN REVIEW - DOCUMENT CATEGORIES", "ALL");	//Retrieves a list of Document Categories that are allowed to have Plan Review.
		if (docCategoryList == undefined) {
			logDebug("ERROR: PLAN REVIEW - DOCUMENT CATEGORIES standard choice has no values.  Values are required for the Plan Review process to work.");
		}
		else {
			docCategoryArray = docCategoryList.split(",");
			logDebug("docCategoryArray (list of Categories that can be processed by Plan Review): " + docCategoryArray + ".  Call processDocsForReview()");

			processDocsForReview(docCategoryArray, reviewListArray);
		}
	}
}

function setReviewWorkflowTasksByTsiFields(allTasksArray) {
	// Activate any review tasks where TSI Review field is "Yes", and set the Task Due Date from TSI Review Date field.
	// This assumes all review tasks are parallel, and that the Workflow Task name is synonymous with the TSI field names.  i.e. Task Name = Building Review, 
	//		TSI Review = Building Review, TSI Review Date = Building Review Date
	// Assumes TSI "Review Date" field has been set (by expression)

	logDebug("Inside function setReviewWorkflowTasksByTsiFields.  Params: " + allTasksArray);

	for (ata in allTasksArray) {
		var taskRequired = false;
		var thisTask = allTasksArray[ata];  //For each Review in list (all Review names are in List)

		logDebug("thisTask = " + thisTask + " and AInfo[thisTask] = " + AInfo[thisTask]);

		//If the Review TSI is set to Yes, set Required to True
		if (AInfo[thisTask] == "Yes") {
			taskRequired = true;
			logDebug("taskRequired was set to true");
		}

		if (taskRequired) {
			logDebug("task is required so set Task Due Date");
			activateTask(thisTask);
			//editTaskDueDate(thisTask,AInfo[thisTask + " Due Date"]);	//Set the Task Due Date from the TSI Review Date field
		}

		if (!taskRequired && isTaskActive(thisTask)) {
			logDebug("task not required so deactivate");
			deactivateTask(thisTask);
		}

	}
}

function getDocumentList() {
	// Returns an array of documentmodels if any
	// returns an empty array if no documents

	var docListArray = new Array();

	docListResult = aa.document.getCapDocumentList(capId, currentUserID);

	if (docListResult.getSuccess()) {
		docListArray = docListResult.getOutput();
	}
	return docListArray;
}

function associateDoc2TaskAndReviewerDept(docs2Review, allTasksArray) {
	// creates the document review task for each required review, associate it to the
	// appropriate workflow task and assign to the user/dept on the workflow task

	logDebug("Inside associateDoc2TaskAndReviewerDept().  Params: docs2Review = " + docs2Review + ", allTasksArray = " + allTasksArray);

	for (rta in allTasksArray) {

		thisTask = allTasksArray[rta];

		logDebug("Checking " + thisTask);
		if (isTaskActive(thisTask)) {

			var reviewerList = aa.util.newArrayList();

			var taskItemResult = aa.workflow.getTask(capId, thisTask);

			if (taskItemResult.getSuccess()) {
				taskItem = taskItemResult.getOutput().getTaskItem();
				sysUserModel = taskItem.getAssignedUser();
				//logDebug("Assigned User: " + sysUserModel);
				reviewerList.add(sysUserModel);
				var associateResult = aa.document.associateReviewer2Doc(docs2Review, reviewerList, taskItem);

				if (associateResult.getSuccess()) {
					logDebug("Added document review: " + thisTask);
					//If due dates need set
					//updateReviewTaskDueDate(dueDateStdChoice,requiredTasksArray[rta],true);
				} else {
					logDebug("Couldn't associate document review: " + thisTask);
				}
			}
			else {
				logDebug("Couldn't retrieve task: " + thisTask);
			}
		}
	}
}

function processDocsForReview(docCategories, allTasksArray) {
	//3/13/2013 - Updated to set the Document REC_STATUS db record value to "A", otherwise there are problems.
	//review each attached document and determine if it should be routed for review

	logDebug("Inside function processDocsForReview().  Params: docCategories: " + docCategories + ", allTasksArray: " + allTasksArray);

	var docsList = new Array();

	docsList = getDocumentList();	//Get all Documents on a Record

	var assignDocList = aa.util.newArrayList();

	for (dl in docsList) {
		logDebug("Looping through docList.  Iterator = " + dl);

		var thisDocument = docsList[dl];

		logDebug("DEBUG: Doc Status | Doc Category: " + thisDocument.getDocStatus() + " | " + thisDocument.getDocCategory());

		if (thisDocument.getDocCategory() != null && thisDocument.getDocStatus().equals("Uploaded") && exists(thisDocument.getDocCategory().toUpperCase(), docCategories)) {
			assignDocList.add(thisDocument);
			logDebug("Adding document to list to be processed.  Doc Status and Category met criteria.");
		}
		else {
			logDebug("Document either did not have a status of Uploaded, or, document category does not exist in docCategories list ");
		}

		logDebug("Number of Docs found to assign: " + assignDocList.size());
	}

	if (assignDocList.size() > 0) {
		logDebug("There is at least one document to review.  Call associateDoc2TaskAndReviewerDept()");

		//12/2016: CP - temporarily commented out as Building does not want to create doc review tasks associateDoc2TaskAndReviewerDept(assignDocList,allTasksArray);
		for (i = 0; i < assignDocList.size(); i++) {
			var documentModel = assignDocList.get(i);
			documentModel.setDocStatus("Routed for Review");
			documentModel.setRecStatus("A");
			documentModel.setSource(getVendor(documentModel.getSource(), documentModel.getSourceName()));
			updateDocResult = aa.document.updateDocument(documentModel);
			if (updateDocResult.getSuccess())
				logDebug(documentModel.getDocName() + " status updated to Routed for Review");
			else
				logDebug("Error updating " + documentModel.getDocName() + " to a status status of Routed for Review");
		}
	}
	else {
		logDebug("No documents met the doc status and doc category for review.");
		return false;
	}
}

function getVendor(sourceValue, sourceName) {
	var _sourceVal = "STANDARD";
	if (sourceValue != null && sourceValue != '') {
		logDebug("sourceValue was not null or empty string.");
		_sourceVal = sourceValue;
	}
	else if (sourceName != null && sourceName != '') {
		logDebug("sourceName was not null or empty string.");
		var bizDomScriptResult = aa.bizDomain.getBizDomainByValue("EDMS", sourceName.toUpperCase());

		if (bizDomScriptResult.getSuccess()) {
			logDebug("bizDomScriptResult is successful.");
			bizDomScriptObj = bizDomScriptResult.getOutput();
			var bizDescStr = bizDomScriptObj.getDescription();
			var startPos = bizDescStr.indexOf("EDMS_VENDOR=");
			var endPos = bizDescStr.indexOf(";", startPos);
			if (startPos > -1 && endPos > -1) {
				_sourceVal = bizDescStr.substring(startPos + 12, endPos).trim();
				logDebug("_sourceVal set to " + _sourceVal);
			}
		}
		else
			logDebug("bizDomScriptResult.getSuccess() was false.  Will not attempt to search for Vendor.");
	}

	logDebug("Function getVendor returns a value of " + _sourceVal);

	return _sourceVal;
}


/*------------------------------------------------------------------------------------------------------/
|  EDR Document Routing Functions (End)
/------------------------------------------------------------------------------------------------------*/
