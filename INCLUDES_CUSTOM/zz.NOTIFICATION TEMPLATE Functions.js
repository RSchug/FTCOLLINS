/*------------------------------------------------------------------------------------------------------/
|  Notification Template Functions (Start)
/------------------------------------------------------------------------------------------------------*/


// Begin Additional Notification Template Functions for Excavation Permits.
// Use this function to send an email with an attached report to the applicant.
// USED FOR EXCAVATION PERMIT NOTIFICATIONS WITH ATTACHMENTS

function sendExcavationPermitIssuedNotificationReport() {

	logDebug("Report Name: " + reportName);
	var rptParams = aa.util.newHashMap();
	rptParams.put("RecordID", capIDString);

	var attachResults = runReportAttachAsync_DEV(capId, reportName, 3000, "RecordID", capIDString);


	if (!matches(reportName, null, undefined, "")) {
		//Call sendNotifcationAsync
		sendNotificationAsync(agencyReplyEmail, emailSendTo, emailStaffCC, emailTemplate, emailParameters, rptParams, reportName);
	}
	else {
		// Call sendNotification if you are not using a report
		sendNotification(agencyReplyEmail, emailSendTo, emailStaffCC, emailTemplate, emailParameters, null);
	}
}

function runReportAttachAsync_DEV(capId, reportName, wait) {
	var scriptName = "RUNREPORTATTACHASYNC_UTIL";
	var envParameters = aa.util.newHashMap();

	var reportParameters = aa.util.newHashMap();
	for (var i = 3; i < arguments.length; i = i + 2) {
		reportParameters.put(arguments[i], arguments[i + 1]);
		logDebug("Report parameter: " + arguments[i] + " = " + arguments[i + 1]);
	}

	envParameters.put("capID", capId);
	envParameters.put("reportName", reportName);
	envParameters.put("wait", wait);
	envParameters.put("reportParameters", reportParameters);

	var result = aa.runAsyncScript(scriptName, envParameters);
}


//Use this function if you are creating a report as an attachment containing fees that we added during the same event.  
function sendNotificationAsync(emailFrom, emailTo, emailCC, templateName, params, reportParams, reportName) {

	var scriptName = "NOTIFICATIONSENDASYNC";
	var envParameters = aa.util.newHashMap();

	envParameters.put("CapID", capId);
	envParameters.put("CustomCapId", capId.getCustomID());
	envParameters.put("ReportUser", currentUserID);
	envParameters.put("ServProvCode", servProvCode);
	envParameters.put("Module", appTypeArray[0]);
	envParameters.put("emailFrom", emailFrom);
	envParameters.put("emailTo", emailTo);
	envParameters.put("emailCC", emailCC);
	envParameters.put("templateName", templateName);
	envParameters.put("params", params);
	envParameters.put("reportParams", reportParams);
	envParameters.put("reportName", reportName);

	var result = aa.runAsyncScript(scriptName, envParameters);
	//if (result.getSuccess()) {
	//    logDebug("Email was succesfully sent")
	//}
	//else {
	//    logDebug("Warning: Email was not sent")
	//}

}

// End Additional Functions for Excavation Permit


function generateReport(aaReportName, parameters, rModule) {
	var reportName = aaReportName;

	report = aa.reportManager.getReportInfoModelByName(reportName);
	report = report.getOutput();

	report.setModule(rModule);
	report.setCapId(capId);

	report.setReportParameters(parameters);

	var permit = aa.reportManager.hasPermission(reportName, currentUserID);

	if (permit.getOutput().booleanValue()) {
		var reportResult = aa.reportManager.getReportResult(report);

		if (reportResult) {
			reportResult = reportResult.getOutput();
			var reportFile = aa.reportManager.storeReportToDisk(reportResult);
			logMessage("Report Result: " + reportResult);
			reportFile = reportFile.getOutput();
			return reportFile
		} else {
			logMessage("Unable to run report: " + reportName + " for Admin" + systemUserObj);
			return false;
		}
	} else {
		logMessage("No permission to report: " + reportName + " for Admin" + systemUserObj);
		return false;
	}
}

function getRecordParams4Notification(params) {
	// pass in a hashtable and it will add the additional parameters to the table

	addParameter(params, "$$altID$$", capIDString);
	addParameter(params, "$$capName$$", capName);
	addParameter(params, "$$capStatus$$", capStatus);
	addParameter(params, "$$fileDate$$", fileDate);
	addParameter(params, "$$workDesc$$", workDescGet(capId));
	addParameter(params, "$$balanceDue$$", "$" + parseFloat(balanceDue).toFixed(2));
	addParameter(params, "$$capTypeAlias$$", aa.cap.getCap(capId).getOutput().getCapType().getAlias());
	/*	if (wfComment != null) {
			addParameter(params, "$$wfComment$$", wfComment);
		}
	*/
	return params;
}

function getACARecordParam4Notification(params, acaUrl) {
	// pass in a hashtable and it will add the additional parameters to the table

	addParameter(params, "$$acaRecordUrl$$", getACARecordURL(acaUrl));

	return params;
}

function getACADeepLinkParam4Notification(params, acaUrl, pAppType, pAppTypeAlias, module) {
	// pass in a hashtable and it will add the additional parameters to the table

	addParameter(params, "$$acaDeepLinkUrl$$", getDeepLinkUrl(acaUrl, pAppType, module));
	addParameter(params, "$$acaDeepLinkAppTypeAlias$$", pAppTypeAlias);

	return params;
}

function getACADocDownloadParam4Notification(params, acaUrl, docModel) {
	// pass in a hashtable and it will add the additional parameters to the table

	addParameter(params, "$$acaDocDownloadUrl$$", getACADocumentDownloadUrl(acaUrl, docModel));

	return params;
}

function getContactParams4Notification(params, pContact) {
	// pass in a hashtable and it will add the additional parameters to the table
	// pass in contact to retrieve information from

	thisContact = pContact;
	conType = "contact";
	//logDebug("Contact Array: " + thisContact["contactType"] + " Param: " + conType);

	addParameter(params, "$$" + conType + "LastName$$", thisContact["lastName"]);
	addParameter(params, "$$" + conType + "FirstName$$", thisContact["firstName"]);
	addParameter(params, "$$" + conType + "MiddleName$$", thisContact["middleName"]);
	addParameter(params, "$$" + conType + "BusinesName$$", thisContact["businessName"]);
	addParameter(params, "$$" + conType + "ContactSeqNumber$$", thisContact["contactSeqNumber"]);
	addParameter(params, "$$" + conType + "$$", thisContact["contactType"]);
	addParameter(params, "$$" + conType + "Relation$$", thisContact["relation"]);
	addParameter(params, "$$" + conType + "Phone1$$", thisContact["phone1"]);
	addParameter(params, "$$" + conType + "Phone2$$", thisContact["phone2"]);
	addParameter(params, "$$" + conType + "Email$$", thisContact["email"]);
	addParameter(params, "$$" + conType + "AddressLine1$$", thisContact["addressLine1"]);
	addParameter(params, "$$" + conType + "AddressLine2$$", thisContact["addressLine2"]);
	addParameter(params, "$$" + conType + "City$$", thisContact["city"]);
	addParameter(params, "$$" + conType + "State$$", thisContact["state"]);
	addParameter(params, "$$" + conType + "Zip$$", thisContact["zip"]);
	addParameter(params, "$$" + conType + "Fax$$", thisContact["fax"]);
	addParameter(params, "$$" + conType + "Notes$$", thisContact["notes"]);
	addParameter(params, "$$" + conType + "Country$$", thisContact["country"]);
	addParameter(params, "$$" + conType + "FullName$$", thisContact["fullName"]);

	return params;
}

function getPrimaryAddressLineParam4Notification(params) {
	// pass in a hashtable and it will add the additional parameters to the table

	var addressLine = "";

	adResult = aa.address.getPrimaryAddressByCapID(capId, "Y");

	if (adResult.getSuccess()) {
		ad = adResult.getOutput().getAddressModel();

		addParameter(params, "$$addressLine$$", ad.getDisplayAddress());
	}

	return params;
}

function getPrimaryOwnerParams4Notification(params) {
	// pass in a hashtable and it will add the additional parameters to the table

	capOwnerResult = aa.owner.getOwnerByCapId(capId);

	if (capOwnerResult.getSuccess()) {
		owner = capOwnerResult.getOutput();

		for (o in owner) {
			thisOwner = owner[o];
			if (thisOwner.getPrimaryOwner() == "Y") {
				addParameter(params, "$$ownerFullName$$", thisOwner.getOwnerFullName());
				addParameter(params, "$$ownerPhone$$", thisOwner.getPhone);
				break;
			}
		}
	}
	return params;
}


function getACADocumentDownloadUrl(acaUrl, documentModel) {

	//returns the ACA URL for supplied document model

	var acaUrlResult = aa.document.getACADocumentUrl(acaUrl, documentModel);
	if (acaUrlResult.getSuccess()) {
		acaDocUrl = acaUrlResult.getOutput();
		return acaDocUrl;
	}
	else {
		logDebug("Error retrieving ACA Document URL: " + acaUrlResult.getErrorType());
		return false;
	}
}


function getACARecordURL(acaUrl) {

	var acaRecordUrl = "";
	var id1 = capId.ID1;
	var id2 = capId.ID2;
	var id3 = capId.ID3;

	acaRecordUrl = acaUrl + "/urlrouting.ashx?type=1000";
	acaRecordUrl += "&Module=" + cap.getCapModel().getModuleName();
	acaRecordUrl += "&capID1=" + id1 + "&capID2=" + id2 + "&capID3=" + id3;
	acaRecordUrl += "&agencyCode=" + aa.getServiceProviderCode();

	return acaRecordUrl;
}

function getDeepLinkUrl(acaUrl, appType, module) {
	var acaDeepLinkUrl = "";

	acaDeepLinkUrl = acaUrl + "/Cap/CapApplyDisclaimer.aspx?CAPType=";
	acaDeepLinkUrl += appType;
	acaDeepLinkUrl += "&Module=" + module;

	return acaDeepLinkUrl;
}

/*
 * add parameter to a hashtable, for use with notifications.
 */
function addParameter(parameters, key, value) {
	if (key != null) {
		if (value == null) {
			value = "";
		}
		parameters.put(key, value);
		aa.print(key + " = " + value);
	}
}

/*
 * Send notification
 */
function sendNotification(emailFrom, emailTo, emailCC, templateName, params, reportFile) {
	var id1 = capId.ID1;
	var id2 = capId.ID2;
	var id3 = capId.ID3;

	var capIDScriptModel = aa.cap.createCapIDScriptModel(id1, id2, id3);


	var result = null;
	result = aa.document.sendEmailAndSaveAsDocument(emailFrom, emailTo, emailCC, templateName, params, capIDScriptModel, reportFile);
	if (result.getSuccess()) {
		logDebug("Sent email successfully!");
		return true;
	}
	else {
		logDebug("Failed to send mail. - " + result.getErrorType());
		return false;
	}
}

function getAssignedToStaff() // option CapId
{
	var itemCap = capId
	if (arguments.length > 1) itemCap = arguments[1]; // use cap ID specified in args

	var cdScriptObjResult = aa.cap.getCapDetail(itemCap);
	if (!cdScriptObjResult.getSuccess()) {
		logDebug("**ERROR: No cap detail script object : " + cdScriptObjResult.getErrorMessage());
		return false;
	}

	var cdScriptObj = cdScriptObjResult.getOutput();

	if (!cdScriptObj) {
		logDebug("**ERROR: No cap detail script object");
		return false;
	}

	cd = cdScriptObj.getCapDetailModel();

	//cd.setCompleteDept(iName.getDeptOfUser());
	var returnValue = cd.getAsgnStaff();
	//cdScriptObj.setCompleteDate(sysDate);

	//logDebug("Returning Assigned To Staff value: " + returnValue);

	return returnValue;
}

function getDocumentURL4AA() {
	aa.print("-- inside getDocURL4AA");
	var baseURL = "https://avtest.gwinnettcounty.com/portlets/document/documentList.do?mode=list&entityType=CAP&entry=yes&from=&module=";

	var url_SPC = servProvCode; aa.print(url_SPC);
	var url_id1 = capId.getID1(); aa.print(url_id1);
	var url_id2 = capId.getID2(); aa.print(url_id2);
	var url_id3 = capId.getID3(); aa.print(url_id3);

	var capResult = aa.cap.getCap(url_id1, url_id2, url_id3);
	var cap = capResult.getOutput().getCapModel();

	var url_module = cap.getModuleName(); aa.print(url_module);
	var docURL = baseURL + url_module + "&serviceProviderCode=" + url_SPC + "&ID1=" + url_id1 + "&ID2=" + url_id2 + "&ID3=" + url_id3

	return docURL;
}

function getDocumentInfo() {
	aa.print("-- inside getDocumentInfo");
	var docModelList = aa.env.getValue("DocumentModelList");
	var docInfoString = "";
	var docCount = 0;
	var documentList = aa.util.newArrayList();
	var it = docModelList.iterator();
	var s_CaseNo = "";
	var s_ProjectName = "";

	while (it.hasNext()) {
		docCount++;
		var docModel = it.next();
		aa.print("Document getSourceName " + docModel.getSourceName());
		aa.print("Document getSource " + docModel.getSource());
		aa.print("Document getDocCategory " + docModel.getDocCategory());
		aa.print("Document getFileUploadDate " + docModel.getFileUpLoadDate());
		aa.print("Document getFileSize " + docModel.getFileSize());

		aa.print("Document " + docCount + ":");
		aa.print("  File Name     :" + docModel.getFileName());
		docInfoString += " File " + docCount + " : " + docModel.getFileName() + "\n";
	}

	aa.print("-- docInfoString = " + docInfoString);
	return docInfoString;
}


/*------------------------------------------------------------------------------------------------------/
|  Notification Template Functions (End)
/------------------------------------------------------------------------------------------------------*/
