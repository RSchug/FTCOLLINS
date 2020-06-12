/****** Testing *******/

/****** End Testing *******/
var servProvCode = aa.env.getValue("ServProvCode");			// Service Provider Code
var alternateId = aa.env.getValue("CustomCapId");			// Custom CAP ID
var capId = aa.env.getValue("CapID");
var currentUserID = aa.env.getValue("ReportUser");
var module = aa.env.getValue("Module");
var emailFrom = aa.env.getValue("emailFrom");
var emailTo = aa.env.getValue("emailTo");
var emailCC = aa.env.getValue("emailCC");
var templateName = aa.env.getValue("templateName");
var params = aa.env.getValue("params");
var reportName = aa.env.getValue("reportName");
var reportParams = aa.env.getValue("reportParams");
	
var showDebug = false;
var debug = "";
var error = "";
var br = "<BR/>";
var systemMailFrom = "noreply@accela.com";

try{
  reportPath = generateReport(capId, reportName, module, reportParams);} catch (err){
  aa.sendMail(systemMailFrom, debugEmailTo, "", "Sent notification", "ERROR - " + err.message);
  }
   
fileNames = new Array();
//aa.sendMail(systemMailFrom, debugEmailTo, "", "Sent notification", "FILENAMES1 - " + fileNames);

try{
  fileNames.push(reportPath);} catch (err){
  aa.sendMail(systemMailFrom, debugEmailTo, "", "Sent notification", "ERROR - " + err.message);
  }



try{
 sendNotification()} 
      catch (err){aa.sendMail(systemMailFrom, debugEmailTo, "", "Sent notification", "SEND NOTIFICATION FUNCTION");
	  }


if (showDebug) {

    aa.sendMail(systemMailFrom, debugEmailTo, "", "Sent notification", "Here we are........ Output: " + debug);
}

if (error != "") {

    aa.sendMail(systemMailFrom, errorEmailTo, "", "Sending notification gave an error: " + alternateId, error);
}

function sendNotification() {
    var itemCap = capId;
    if (arguments.length == 7) itemCap = arguments[6]; // use cap ID specified in args
    var id1 = itemCap.ID1;
    var id2 = itemCap.ID2;
    var id3 = itemCap.ID3;
    var capIDScriptModel = aa.cap.createCapIDScriptModel(id1, id2, id3);
    if (!matches(emailTo, null, "", undefined)) {
        var result = null;
        result = aa.document.sendEmailAndSaveAsDocument(emailFrom, emailTo, emailCC, templateName, params, capIDScriptModel, fileNames);
        if (result.getSuccess()) {
            logDebug("Sent email successfully!");
            return true;
        }
        else {
            logDebug("Failed to send mail. - " + result.getErrorType());
            return false;
        }
    } else {
        logDebug("No email address found for logged in user");
        return false;
    }
}

function matches(eVal, argList) {
    for (var i = 1; i < arguments.length; i++)
        if (arguments[i] == eVal)
            return true;

}

function logDebug(dstr) {
    debug += dstr + br;
}

function logError(dstr) {
    error += dstr + br;
    logDebug(dstr);
}

function generateReport(itemCap, reportName, module, parameters) {
    //returns the report file which can be attached to an email.
    var user = "ADMIN";   // Setting the User Name
    var report = aa.reportManager.getReportInfoModelByName(reportName);
    report = report.getOutput();
    report.setModule(module);
    report.setCapId(itemCap);
    report.setReportParameters(parameters);
    report.getEDMSEntityIdModel().setAltId(itemCap.getCustomID());

    var permit = aa.reportManager.hasPermission(reportName, user);

    if (permit.getOutput().booleanValue()) {
        var reportResult = aa.reportManager.getReportResult(report);
        if (reportResult.getSuccess()) {
            reportOutput = reportResult.getOutput();
            var reportFile = aa.reportManager.storeReportToDisk(reportOutput);
            reportFile = reportFile.getOutput();
			
			if (module == "Licenses"){
				//	renameDocuments_EL(capId);
				var docList = aa.document.getDocumentListByEntity(itemCap,"CAP").getOutput().toArray();
				if (docList.length > 0){
					for (y in docList) {
						docObject = aa.document.getDocumentByPK(docList[y].getDocumentNo()).getOutput();
						docName = docObject.getFileName();
						
						if (docName.indexOf(itemCap.getCustomID()) < 0){
							//edit document name in accela
							docObject.setFileName(itemCap.getCustomID() + "-" + docName);
							aa.document.updateDocument(docObject);
						}
					}
				}
			}
            return reportFile;	
        } else {
            logError("System failed get report: " + reportResult.getErrorType() + ":" + reportResult.getErrorMessage());
            return false;
        }
    } else {
        logError("User has no permission." + user);
        return false;
    }
}