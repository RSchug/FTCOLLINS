/*
    Script Name: RUNREPORTATTACHASYNC_UTIL 
    File Name: RUNREPORTATTACHASYNC_UTIL.JS
    Purpose: A utility script to run the runReportAttach Script Asynchronously.
    Author: 
    Example Usage: 
    Arguments: 
        capId (capId) = a CapId object
        reportName (String) = the name of the report
        wait (int) = the number to wait in milliseconds (1000 = 1 second)
        parameter pairs = 
        example: runReportAttachAsync_Util(capId,"ReportName", 3000, "RecordID",capId.getCustomID(),"months","12");
    
    function runReportAttachAsync_Util(capId, reportName, wait) {
        var scriptName = "RUNREPORTATTACHASYNC_UTIL";
        var envParameters = aa.util.newHashMap();
        
        var reportParameters = aa.util.newHashMap();              
	    for (var i = 3; i < arguments.length ; i = i+2)
		{
		    reportParameters.put(arguments[i],arguments[i+1]);
		    logDebug("Report parameter: " + arguments[i] + " = " + arguments[i+1]);
		}
  
        envParameters.put("capID",capId);
        envParameters.put("reportName", reportName);
        envParameters.put("wait", wait);
        envParameters.put("reportParameters", reportParameters);

        var result = aa.runAsyncScript(scriptName, envParameters);
    }

*/

// Load local variables from environment variables
var capId = aa.env.getValue("capID");
var reportName = aa.env.getValue("reportName");
var reportParameters = aa.env.getValue("reportParameters");
var currentUserID = "ADMIN";
var iWait = aa.env.getValue("wait");
var isSendMess = false;

try {

    if (iWait != null || iWait != "" || iWait != undefined) {
        var wait = parseInt(iWait);
        waitSeconds(wait);
    }

    runReportAttach(capId, reportName, reportParameters);
    
} catch (error) {
    isSendMess = true;
    sendMess("ERROR1 -  " + capId.getCustomID() + " " + error);

}

// function to make script wait the specified amount of time.
function waitSeconds(iMilliSeconds) {
    var counter= 0
        , start = new Date().getTime()
        , end = 0;
    while (counter < iMilliSeconds) {
        end = new Date().getTime();
        counter = end - start;
    }
}

function runReportAttach(itemCapId,aaReportName,reportParams)
	{
        // optional parameters are report parameter pairs
        // for example: runReportAttach(capId,"ReportName","altid",capId.getCustomID(),"months","12");

        var reportName = aaReportName;

        reportResult = aa.reportManager.getReportInfoModelByName(reportName);

        if (!reportResult.getSuccess())
            { 
                var errMess = "ERROR2 -  **WARNING** couldn't load report " + reportName + " " + reportResult.getErrorMessage();
                isSendMess = true;
                sendMess(errMess); 
                return false; 
            }

        var report = reportResult.getOutput(); 

        var itemCap = aa.cap.getCap(itemCapId).getOutput();
        appTypeResult = itemCap.getCapType();
        appTypeString = appTypeResult.toString(); 
        appTypeArray = appTypeString.split("/");

        report.setModule(appTypeArray[0]); 
        report.setCapId(itemCapId.getID1() + "-" + itemCapId.getID2() + "-" + itemCapId.getID3()); 
        report.getEDMSEntityIdModel().setAltId(itemCapId.getCustomID());
        report.setReportParameters(reportParams);

        var permit = aa.reportManager.hasPermission(reportName,currentUserID); 

        if(permit.getOutput().booleanValue()) 
            { 
            var reportResult = aa.reportManager.getReportResult(report); 

            sendMess("INFO3 -  Report " + aaReportName + " has been run for " + appTypeArray[0] + " " + itemCapId.getCustomID());

			if (appTypeArray[0] == "Licenses"){
                reportFile = reportResult.getOutput();
			    reportFileName = reportFile.getName();
				//	renameDocuments_EL(capId);
				var docList = aa.document.getDocumentListByEntity(itemCapId,"CAP").getOutput().toArray();
				if (docList.length > 0){                    
                    for (y in docList) {
						docObject = aa.document.getDocumentByPK(docList[y].getDocumentNo()).getOutput();
						docName = docObject.getFileName();

						if (docName == reportFileName){
							docObject.setFileName(itemCapId.getCustomID() + "-" + docName);
							aa.document.updateDocument(docObject);
					    }
                    }
                    
                    if (appTypeArray[2] == "Update Contact Info"){
                        useAppSpecificGroupName = false; 
                        parentCapIdString = getAppSpecific("Business File Number"); 
                        useAppSpecificGroupName = true; 
                        parentCapId = aa.cap.getCapID(parentCapIdString); 
                        parentCapId = parentCapId.getOutput();

                        aa.cap.copyRenewCapDocument(capId, parentCapId,currentUserID);
                        //removeDocumentByPK(java.lang.String docSeq, java.lang.String userName, java.lang.String password, java.lang.String moduleName) 
                        var entityModel = aa.proxyInvoker.newInstance("com.accela.v360.document.EntityModel").getOutput();
                        entityModel.setServiceProviderCode('FTCOLLINS');
                        entityModel.setEntityType("CAP");
                        entityModel.setEntityID(capId);
                        
                        var documentlist = aa.document.getDocumentListByEntity(capId, 'CAP').getOutput();
                        var documentBiz = aa.proxyInvoker.newInstance("com.accela.aa.ads.ads.DocumentBusiness").getOutput();

                        for (var d = 0; d < documentlist.size(); d ++ ){
                            var documentItem = documentlist.get(d);
                            documentBiz.removeDocument4Partial(entityModel, 'FTCOLLINS', documentItem.getDocumentNo());
                        }
                    }
				}
			}

            }
        else {
            isSendMess = true;
            sendMess("ERROR4 -  No permission to report: "+ reportName + " for user: " + currentUserID);
        }
    }

function sendMess(theBody) {
    if (isSendMess) {
        aa.sendMail("cprobasco@truepointsolutions.com", "cprobasco@truepointsolutions.com", "", "Sent notification from RUNREPORTATTACHASYNC_UTIL", theBody);
    }
}

function getAppSpecific(itemName)  // optional: itemCap
{
	var updated = false;
	var i=0;
	var itemCap = capId;
	if (arguments.length == 2) itemCap = arguments[1]; // use cap ID specified in args
   	
	if (useAppSpecificGroupName)
	{
		if (itemName.indexOf(".") < 0)
			{ logDebug("**WARNING: editAppSpecific requires group name prefix when useAppSpecificGroupName is true") ; return false }
		
		
		var itemGroup = itemName.substr(0,itemName.indexOf("."));
		var itemName = itemName.substr(itemName.indexOf(".")+1);
	}
	
    var appSpecInfoResult = aa.appSpecificInfo.getByCapID(itemCap);
	if (appSpecInfoResult.getSuccess())
 	{
		var appspecObj = appSpecInfoResult.getOutput();
		
		if (itemName != "")
		{
			for (i in appspecObj)
				if( appspecObj[i].getCheckboxDesc() == itemName && (!useAppSpecificGroupName || appspecObj[i].getCheckboxType() == itemGroup) )
				{
					return appspecObj[i].getChecklistComment();
					break;
				}
		} // item name blank
	} 
	else
		{ logDebug( "**ERROR: getting app specific info for Cap : " + appSpecInfoResult.getErrorMessage()) }
}