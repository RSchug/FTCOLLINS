/*------------------------------------------------------------------------------------------------------/
| Program: WorkflowTaskUpdateBefore.js  Trigger: WorkflowTaskUpdateBefore    Client : N/A   SAN# : N/A
| 
| Master Script, documentation: http://intranet/services_eventmgr.htm
|                                                                       
| Version 0.1 - Base Version -							10/13/2005 - John Schomp
| Version 0.5 - Move to Criteria/Action pairs for all entries			10/29/2005 - John Schomp
| Version 1.0 - Added disableTokens functionality, controls "{}[]" replacement  12/12/2005 - John Schomp
|             - Added Task Specific Info to AInfo array
|             - Added elapsed time info to debug
|             - Many new functions for production release candidate
|
/------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------/
|
| START USER CONFIGURABLE PARAMETERS
|
/------------------------------------------------------------------------------------------------------*/
var showMessage = false;			// Set to true to see results in popup window
var showDebug = true;				// Set to true to see debug messages in popup window
var controlString = "WorkflowTaskUpdateBefore"; // Standard choice for control
var cancel = false ; 				// Setting cancel to true in standard choices will cancel the event
var documentOnly = false;			// Document Only -- displays hierarchy of std choice steps
var disableTokens = false;			// turn off tokenizing of App Specific and Parcel Attributes
/*----------------------------------------------------------------------------------------------------/
|
| END USER CONFIGURABLE PARAMETERS
|
/------------------------------------------------------------------------------------------------------*/
var startDate = new Date();
var startTime = startDate.getTime();
var message =	"";					// Message String
var debug = "";
var br = "<BR>";					// Break Tag

if (documentOnly) { 
	doStandardChoiceActions(controlString,false,0); 
	aa.env.setValue("ScriptReturnCode", "0"); 
	aa.env.setValue("ScriptReturnMessage", "Documentation Successful.  No actions executed.");
	aa.abortScript(); 
	}

var wfTSI = aa.env.getValue("TaskSpecificInfoModels");	// Workflow Task Specific Info Array
var wfDate = aa.env.getValue("WorkflowStatusDate");	// Workflow Task Date
var wfTask = aa.env.getValue("WorkflowTask");		// Workflow Task Triggered event
var wfStatus = aa.env.getValue("WorkflowStatus");	// Status of workflow that triggered event
var capId = getCapId();					// CapId object
var cap = aa.cap.getCap(capId).getOutput();		// Cap object
var capDetailObj = aa.cap.getCapDetail(capId).getOutput(); // Detail
var balanceDue = capDetailObj.getBalance();		// Balance Due
var servProvCode = capId.getServiceProviderCode()       // Service Provider Code
var currentUserID = aa.env.getValue("CurrentUserID");   // Current USer
var capIDString = capId.getCustomID();			// alternate cap id string
var appTypeResult = cap.getCapType();			// Get Application Type
var appTypeString = appTypeResult.toString();		// Convert application type to string ("Building/A/B/C")
var appTypeArray = appTypeString.split("/");		// Array of application type string
var AInfo = AppSpecific(capId); loadTaskSpecific();	// Associative array of appspecifc info, add task specific values
var PInfo = ParcelAttribute(capId);			// Associative array of parcel attributes
var systemUserObj = aa.person.getUser(currentUserID).getOutput();  // Current User Object
var sysDate = aa.date.getCurrentDate();
var feeSeqList = new Array();				// invoicing fee list
var paymentPeriodList = new Array();			// invoicing pay periods
var valobj = aa.finance.getContractorSuppliedValuation(capId,null).getOutput();	// Calculated valuation 
var estVal = valobj[0].getEstimatedValue();		// Use Contractor Value
var calcVal = valobj[0].getCalculatedValue();		// Use Calcuated Value

debug+="Cap ID: " + capIDString + br;
debug+="apptypestring = " + appTypeString + br;

/*------------------------------------------------------------------------------------------------------/
| <===========Main=Loop================>
| 
/-----------------------------------------------------------------------------------------------------*/
//
//
//  Get the Standard choices entry we'll use for this App type
//  Then, get the action/criteria pairs for this app
//

doStandardChoiceActions(controlString,true,0);
//
// Check for invoicing of fees
//
if (feeSeqList.length)
	{
	invoiceResult = aa.finance.createInvoice(capId, feeSeqList, paymentPeriodList);
	if (invoiceResult.getSuccess())
		message+="Invoicing assessed fee items is successful." + br;
	else
		message+="ERROR: Invoicing the fee items assessed to app # " + appId + " was not successful.  Reason: " +  invoiceResult.getErrorMessage();
	}
		
/*------------------------------------------------------------------------------------------------------/
| <===========END=Main=Loop================>
/-----------------------------------------------------------------------------------------------------*/

if (debug.indexOf("ERROR") > 0)
	{
	aa.env.setValue("ScriptReturnCode", "1");
	aa.env.setValue("ScriptReturnMessage", debug);
	}
else
	{
	if (cancel)
		{
		aa.env.setValue("ScriptReturnCode", "1");
		if (showMessage) aa.env.setValue("ScriptReturnMessage", "<font color=red><b>Action Cancelled</b></font><br><br>" + message);
		if (showDebug) 	aa.env.setValue("ScriptReturnMessage", "<font color=red><b>Action Cancelled</b></font><br><br>" + debug);
		}
	else
		{
		aa.env.setValue("ScriptReturnCode", "0");
		if (showMessage) aa.env.setValue("ScriptReturnMessage", message);
		if (showDebug) 	aa.env.setValue("ScriptReturnMessage", debug);
		}
	}

/*------------------------------------------------------------------------------------------------------/
| <===========External Functions (used by Action entries)
/------------------------------------------------------------------------------------------------------*/

function addFee(fcode,fsched,fperiod,fqty,finvoice) // Adds a single fee
	{
	assessFeeResult = aa.finance.createFeeItem(capId,fsched,fcode,fperiod,fqty);
	if (assessFeeResult.getSuccess())
		{
		feeSeq = assessFeeResult.getOutput();
		message+="Successfully added Fee " + fcode + ", Qty " + fqty + br;
		debug+="The assessed fee Sequence Number " + feeSeq + br;
		if (finvoice == "Y")
			{
			feeSeqList.push(feeSeq);
			paymentPeriodList.push(fperiod);
			}
		}
	else
		{
		debug+= "ERROR: assessing fee (" + fcode + "): " + assessFeeResult.getErrorMessage() + br;
		}
	}


function addAllFees(fsched,fperiod,fqty,finvoice) // Adds all fees for a given fee schedule
	{
	var arrFees = aa.finance.getFeeItemList(null,fsched,null).getOutput();
	for (xx in arrFees)
		{
		var feeCod = arrFees[xx].getFeeCod();
		assessFeeResult = aa.finance.createFeeItem(capId,fsched,feeCod,fperiod,fqty);
		if (assessFeeResult.getSuccess())
			{
			feeSeq = assessFeeResult.getOutput();
			message+="Added Fee " + feeCod + ", Qty " + fqty + br;
			debug+="The assessed fee Sequence Number " + feeSeq + br;
			if (finvoice == "Y")
			{
				feeSeqList.push(feeSeq);
				paymentPeriodList.push(fperiod);
				}
			}
		else
			{
			debug+= "ERROR: assessing fee (" + feeCod + "): " + assessFeeResult.getErrorMessage() + br;
			}
		} // for xx
	} // function
	
function editAppSpecific(itemName,itemValue)  // optional: itemCap
	{
	var updated = false;
	var i=0;
	itemCap = capId;
	if (arguments.length == 3) itemCap = arguments[2]; // use cap ID specified in args
   	
    	var appSpecInfoResult = aa.appSpecificInfo.getByCapID(itemCap);
	if (appSpecInfoResult.getSuccess())
	 	{
		var appspecObj = appSpecInfoResult.getOutput();
		
		if (itemName != "")
			{
				while (i < appspecObj.length && !updated)
				{
					if (appspecObj[i].getCheckboxDesc() == itemName)
					{
						appspecObj[i].setChecklistComment(itemValue);
						actionResult = aa.appSpecificInfo.editAppSpecInfos(appspecObj);
						if (actionResult.getSuccess()) {
							message += "app spec info item " + itemName + " has been given a value of " + itemValue + br;
							debug += "app spec info item " + itemName + " has been given a value of " + itemValue + br;
						} else {
							debug += "ERROR: Setting the app spec info item " + itemName + " to " + itemValue + " .\nReason is: " +   actionResult.getErrorType() + ":" + actionResult.getErrorMessage();
						}
						updated = true;
						AInfo[itemName] = itemValue;  // Update array used by this script
					}
					i++;
				} // while loop
			} // item name blank
		} // got app specific object	
	} // function
	
	
	
function lookup(stdChoice,stdValue) 
	{
	var strControl;
	var bizDomScriptResult = aa.bizDomain.getBizDomainByValue(stdChoice,stdValue);
	
   	if (bizDomScriptResult.getSuccess())
   		{
		bizDomScriptObj = bizDomScriptResult.getOutput();
		var strControl = "" + bizDomScriptObj.getDescription(); // had to do this or it bombs.  who knows why?
		debug+="getStandardChoice(" + stdChoice + "," + stdValue + ") = " + strControl + br;
		}
	else
		{
		debug+="getStandardChoice(" + stdChoice + "," + stdValue + ") does not exist" + br;
		}
	return strControl;
	}
	
function branch(stdChoice)
	{
	doStandardChoiceActions(stdChoice,true,0);
	}
	
function appMatch(ats) 
	{
	var isMatch = true;
	var ata = ats.split("/");
	if (ata.length != 4)
		debug+="ERROR in appMatch.  The following Application Type String is incorrectly formatted: " + ats + br;
	else
		for (xx in ata)
			if (!ata[xx].equals(appTypeArray[xx]) && !ata[xx].equals("*"))
				isMatch = false;
	return isMatch;
	}	

function comment(cstr)
	{
	if (showDebug) debug+=cstr + br;
	if (showMessage) message+=cstr + br;
	}
	
function feeExists(feestr)
	{
	feeResult=aa.fee.getFeeItems(capId);
	if (feeResult.getSuccess())
		{ feeObjArr = feeResult.getOutput(); }
	else
		{ debug+= "ERROR: getting fee items: " + capContResult.getErrorMessage() + br; return false }
	
	for (ff in feeObjArr)
		if (feestr.equals(feeObjArr[ff].getFeeCod()))
			return true;
			
	return false;
	}
	
function dateAdd(td,amt) 
	// perform date arithmetic on a string 
	// td can be "mm/dd/yyyy" (or any string that will convert to JS date)
	// amt can be positive or negative (5, -3) days 
	{
	if (!td) 
		dDate = new Date();
	else
		dDate = new Date(td);

	aa.print(dDate.getTime());
	dDate.setTime(dDate.getTime() + (1000 * 60 * 60 * 24 * amt));
	return (dDate.getMonth()+1) + "/" + dDate.getDate() + "/" + dDate.getFullYear();
	}

function taskStatus(wftask)
	{
	// returns true if the workflow has the indicated status
	taskResult = aa.workflow.getTask(capId,wftask);
	if (taskResult.getSuccess())
		{ taskObj = taskResult.getOutput(); }
	else
		{ debug+= "ERROR: getting task item " + wftask + " : " + taskResult.getErrorMessage() + br; return false }

	if (taskObj != null)
		return taskObj.getDisposition()
		
	}

function activateTask(wfstr) 
	{

	var workflowResult = aa.workflow.getTasks(capId);
 	if (workflowResult.getSuccess())
  	 	wfObj = workflowResult.getOutput();
  	else
  	  	{ message+="ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage() + br; return false; }
	
	for (i in wfObj)
		{
   		fTask = wfObj[i];
 		if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase()))
			{
			stepnumber = fTask.getStepNumber();

			aa.workflow.adjustTask(capId, stepnumber, "Y", "N", null, null)

			message+="Activating Workflow Task: " + wfstr + br;
			debug+="Activating Workflow Task: " + wfstr + br;
			}			
		}
	}		
	
function licenseObject(licnumber)
	{
	// available statuses (from various R1_SERVER_CONSTANT values
	var licenseStatus = new Array("","Active","About To Expire","Delinquent","Expired","Invalid","Pending");
	
	this.refProf = null;		// licenseScriptModel (reference licensed professional)
	this.b1Exp = null;		// b1Expiration record (renewal status on application)
	this.licNum = licnumber;	// License Number

	// Load the reference License Professional if we're linking the two
	if (licnumber) // we're linking
		{
		refLicenseResult = aa.licenseScript.getRefLicensesProfByLicNbr(servProvCode,this.licNum)
		if (refLicenseResult.getSuccess())
			{
			refArray = refLicenseResult.getOutput()
			if (refArray)
				for (xxx in refArray)
					{
					this.refProf = refArray[xxx];
					debug+="Loaded reference license professional" + br;
					}
			}
		else
			{ debug+="ERROR: Getting Licensed Professional Record.  Reason is: " + refLicenseResult.getErrorType() + ":" + gisObjResult.getErrorMessage() ; return false }
		}	
   		
   	// Load the renewal info (B1 Expiration)
   	// The only way to pull up a renewal is to supply a status.  I don't understand since it has a 1 to 1 relationship with b1permit, but oh well.
   	// the silly thing returns a blank record, so have to check the B1expirationModel to see if it's valid
   	
   	for (myStatus in licenseStatus)
   		{
   		b1ExpResult = aa.expiration.getLicensesByCapID(capId,licenseStatus[myStatus]);
   		if (b1ExpResult.getSuccess())
   			{
   			this.b1Exp = b1ExpResult.getOutput();
   			exptest = this.b1Exp.getB1Expiration();
   			if (exptest) {debug+="Found renewal record of status : " + licenseStatus[myStatus] + br ; break}
			}
		else
			{ debug+="ERROR: Getting B1Expiration Object for Cap.  Reason is: " + b1ExpResult.getErrorType() + ":" + gisObjResult.getErrorMessage() ; return false }
		}

   	
   	this.setExpiration = function(expDate)
   		// Update expiration date
   		{
   		var expAADate = aa.date.parseDate(expDate);
  		
   		if (this.refProf) {
   			this.refProf.setLicenseExpirationDate(expAADate);
   			aa.licenseScript.editRefLicenseProf(this.refProf);
   			debug+="Updated reference license expiration to " + expDate + br; }
   			
   		if (this.b1Exp)  {
 				this.b1Exp.setExpDate(expAADate);
				aa.expiration.editB1Expiration(this.b1Exp.getB1Expiration());
				debug+="Updated renewal to " + expDate + br; } 			
   		}
   	
	this.setIssued = function(expDate)
		// Update Issued date
		{
		var expAADate = aa.date.parseDate(expDate);
		
		if (this.refProf) {
			this.refProf.setLicenseIssueDate(expAADate);
			aa.licenseScript.editRefLicenseProf(this.refProf);
			debug+="Updated reference license issued to " + expDate + br; }
			
		}	
	this.setLastRenewal = function(expDate)
		// Update expiration date
		{
		var expAADate = aa.date.parseDate(expDate)

		if (this.refProf) {
			this.refProf.setLicenseLastRenewalDate(expAADate);
			aa.licenseScript.editRefLicenseProf(this.refProf);
			debug+="Updated reference license issued to " + expDate + br; }
		}
		
	this.setStatus = function(licStat)
		// Update expiration status
		{
		if (this.b1Exp)  {
			this.b1Exp.setExpStatus(licStat);
			aa.expiration.editB1Expiration(this.b1Exp.getB1Expiration()); 
			debug+="Updated renewal to status " + licStat + br; }  			
		}
		
	this.getStatus = function()
		// Get Expiration Status
		{
		if (this.b1Exp) {
			return this.b1Exp.getExpStatus();
			}
		}
	}
   		
	
   
function closeTask(wfstr,wfstat,wfcomment,wfnote) 
	{

	var workflowResult = aa.workflow.getTasks(capId);
 	if (workflowResult.getSuccess())
  	 	wfObj = workflowResult.getOutput();
  	else
  	  	{ message+="ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage() + br; return false; }
	
	if (!wfstat) wfstat = "NA";
	
	for (i in wfObj)
		{
   		fTask = wfObj[i];
 		if (fTask.getTaskDescription().toUpperCase().equals(wfstr.toUpperCase()))
			{
			dispositionDate = aa.date.getCurrentDate();
			stepnumber = fTask.getStepNumber();

			aa.workflow.handleDisposition(capId,stepnumber,wfstat,dispositionDate, wfnote,wfcomment,systemUserObj ,"Y");
			message+="Closing Workflow Task: " + wfstr + " with status " + wfstat + br;
			debug+="Closing Workflow Task: " + wfstr + " with status " + wfstat + br;
			}			
		}
	}
		
function adjustTask(wfstr,wfstat) 
	{
	aa.workflow.adjustTask(capId,wfstr,wfstat,null);
	message+="adjusting Workflow Task: " + wfstr + " with status " + wfstat + br;
	debug+="adjusting Workflow Task: " + wfstr + " with status " + wfstat + br;
	}

function proximity(svc,layer,numDistance)  // optional: distanceType
	{
	// returns true if the app has a gis object in proximity
	//

	var distanceType = "feet"
	if (arguments.length == 4) distanceType = arguments[3]; // use distance type in arg list
   	
	bufferTargetResult = aa.gis.getGISType(svc,layer); // get the buffer target
	if (bufferTargetResult.getSuccess())
		{
		buf = bufferTargetResult.getOutput();
		buf.addAttributeName(layer + "_ID");
		}
	else
		{ debug+="ERROR: Getting GIS Type for Buffer Target.  Reason is: " + bufferTargetResult.getErrorType() + ":" + bufferTargetResult.getErrorMessage() ; return false }
			
	gisObjResult = aa.gis.getCapGISObjects(capId); // get gis objects on the cap
	if (gisObjResult.getSuccess()) 	
		fGisObj = gisObjResult.getOutput();
	else
		{ debug+="ERROR: Getting GIS objects for Cap.  Reason is: " + gisObjResult.getErrorType() + ":" + gisObjResult.getErrorMessage() ; return false }

	for (a1 in fGisObj) // for each GIS object on the Cap
		{
		bufchk = aa.gis.getBufferByRadius(fGisObj[a1], numDistance, distanceType, buf);

		if (bufchk.getSuccess())
			proxArr = bufchk.getOutput();
		else
			{ debug+="ERROR: Retrieving Buffer Check Results.  Reason is: " + bufchk.getErrorType() + ":" + bufchk.getErrorMessage() ; return false }	
		
		for (a2 in proxArr)
			{
			proxObj = proxArr[a2].getGISObjects();  // if there are GIS Objects here, we're done
			if (proxObj.length) 
				{
				return true;
				}
			}
		}
	}

function createChild(grp,typ,stype,cat,desc) 
//
// creates the new application and returns the capID object
//
	{

	debug +=" here " ;
	var appCreateResult = aa.cap.createApp(grp,typ,stype,cat,desc);
	
	debug+="creating cap " + grp + "/" + typ + "/" + stype + "/" + cat + br;
	if (appCreateResult.getSuccess())
		{
		var newId = appCreateResult.getOutput();
		debug+="cap " + grp + "/" + typ + "/" + stype + "/" + cat + " created successfully " + br;
		var newObj = aa.cap.getCap(newId).getOutput();	//Cap object
		result = aa.cap.createAppHierarchy(capId, newId); 
		if (result.getSuccess())
			debug+="Child application successfully linked" + br;
		else
			debug+="Could not link applications" + br;

/* Get Licenses Prof  -- Work in progress
			capLicenseResult = aa.licenseScript.getLicenseProf(capId);
			if (capLicenseResult.getSuccess())
				{
				License = capLicenseResult.getOutput();
				for (yy in License)
					{
					newLicense = aa.licenseScript.createLicenseScriptModel();
					newLicense.
*/
		// Copy Parcels

		var capParcelResult = aa.parcel.getParcelandAttribute(capId,null);
		if (capParcelResult.getSuccess())
			{
			var Parcels = capParcelResult.getOutput().toArray();
			for (zz in Parcels)
				{
				debug+="adding parcel #" + zz + " = " + Parcels[zz].getParcelNumber() + br;
				var newCapParcel = aa.parcel.getCapParcelModel().getOutput();
				newCapParcel.setParcelModel(Parcels[zz]);
				newCapParcel.setCapIDModel(newId);
				newCapParcel.setL1ParcelNo(Parcels[zz].getParcelNumber());
				newCapParcel.setParcelNo(Parcels[zz].getParcelNumber());
				aa.parcel.createCapParcel(newCapParcel);
				}
			}



		// Copy Contacts
		capContactResult = aa.people.getCapContactByCapID(capId);
		if (capContactResult.getSuccess())
			{
			Contacts = capContactResult.getOutput();
			for (yy in Contacts)
				{
				var newContact = Contacts[yy].getCapContactModel();
				newContact.setCapID(newId);
				aa.people.createCapContact(newContact);
				debug+="added contact" + br;
				}
			}	

		// Copy Addresses
		capAddressResult = aa.address.getAddressByCapId(capId);
		if (capAddressResult.getSuccess())
			{
			Address = capAddressResult.getOutput();
			for (yy in Address)
				{
				newAddress = Address[yy];
				newAddress.setCapID(newId);
				aa.address.createAddress(newAddress);
				debug+="added address" + br;
				}
			}
		
		return newId;
		}
	else
		{
		debug+= "ERROR: adding child App: " + appCreateResult.getErrorMessage() + br;
		}
	}
	
function copyAppSpecific(newCap) // copy all App Specific info into new Cap
	{
	for (asi in AInfo)
	  	editAppSpecific(asi,AInfo[asi],newCap)
	}
	
function createRefLicProc(lpLic,lpType,lpContactType)
	{
	var uP;  // people object to copy

	// Abort if a reference version already exists
	refLicenseResult = aa.licenseScript.getRefLicensesProfByLicNbr(servProvCode,lpLic);
	if (refLicenseResult.getSuccess())  {
		refLicenseObj = refLicenseResult.getOutput();
		if (refLicenseObj) {
			debug+="Can't create Reference License, already exists" + br; 
			return false; 
			}
		}

	// Get Applicant Info
	contObj = aa.people.getCapContactByCapID(capId).getOutput();
	
	for (i in contObj)
		{
		uC = contObj[i]; uP = uC.getPeople();
		if  (uP.getContactType().equals(lpContactType))
			break;
		}

	// Eject if no person found
	if (!uP) {
		debug+="Can't find people of type " + lpContactType + " to copy to license professional" + br ; 
		return false }
	
	//
	// Create a new license professional and copy data
	//
	newLic = aa.licenseScript.createLicenseScriptModel();
	
	newLic.setAddress1(uP.getCompactAddress().getAddressLine1());
	newLic.setAddress2(uP.getCompactAddress().getAddressLine2());
	newLic.setAddress3(uP.getCompactAddress().getAddressLine3());
	newLic.setAgencyCode(uC.getServiceProviderCode);
	newLic.setAuditStatus(uP.getAuditStatus());
	newLic.setAuditID(uP.getAuditID());
	newLic.setAuditDate(sysDate);
	newLic.setBusinessName(uP.getBusinessName());
	newLic.setCity(uP.getCompactAddress().getCity());
	newLic.setContactFirstName(uC.getFirstName());
	newLic.setContactLastName(uC.getLastName());
	newLic.setContryCode(uP.getCompactAddress().getCountryCode());
	newLic.setCountry(uP.getCompactAddress().getCountry());
	newLic.setEMailAddress(uC.getEmail());
	newLic.setFax(uP.getFax());
	newLic.setLicState(uP.getCompactAddress().getState());
	newLic.setLicenseType(lpType);
	newLic.setPhone2(uP.getPhone2());
	newLic.setPhone1(uP.getPhone1());
	newLic.setStateLicense(lpLic); 
	newLic.setState(uP.getCompactAddress().getState());
	newLic.setZip(uP.getCompactAddress().getZip());
	
	createResult = aa.licenseScript.createRefLicenseProf(newLic);
	if (createResult.getSuccess())
		debug+="Successfully added license professional: " + lpLic + br;
	else
		debug+="ERROR: can't create ref lic prof: " + createResult.getErrorMessage() + br;;

	}	
	
function updateAppStatus(stat,cmt)
	{
	updateStatusResult = aa.cap.updateAppStatus(capId,"APPLICATION",stat, sysDate, cmt ,systemUserObj);
	if (updateStatusResult.getSuccess())
		debug+="Updated application status to " + stat + " successfully." + br;
	else
		debug+="ERROR: application status update to " + stat + " was unsuccessful.  The reason is "  + updateStatusResult.getErrorType() + ":" + updateStatusResult.getErrorMessage() + br;
	}
	
/*------------------------------------------------------------------------------------------------------/
| <===========Internal Functions and Classes (Used by this script)
/------------------------------------------------------------------------------------------------------*/

function AppSpecific() {
	// 
	// Returns an associative array of App Specific Info
	//
  	appArray = new Array();
    	var appSpecInfoResult = aa.appSpecificInfo.getByCapID(capId);
	if (appSpecInfoResult.getSuccess())
	 	{
		var fAppSpecInfoObj = appSpecInfoResult.getOutput();

		for (loopk in fAppSpecInfoObj)
			{
			appArray[fAppSpecInfoObj[loopk].checkboxDesc] = fAppSpecInfoObj[loopk].checklistComment;
			debug+="{" + fAppSpecInfoObj[loopk].checkboxDesc + "} = " + fAppSpecInfoObj[loopk].checklistComment + br;
			}
		}
	return appArray;
}

function ParcelAttribute() {
	//
	// Returns an associative array of Parcel Attributes
	//
	parcelArray = new Array();
	fcapParcelObj = null;
   	capParcelResult = aa.parcel.getParcelandAttribute(capId, null);
   	if (capParcelResult.getSuccess())
   		fcapParcelObj = capParcelResult.getOutput().toArray();
  	 else
     		debug+="ERROR: Failed to get Parcel object: " + capParcelResult.getErrorType() + ":" + capParcelResult.getErrorMessage() + br;
  	
  	for (i in fcapParcelObj)
  		{
  		parcelAttrObj = fcapParcelObj[i].getParcelAttribute().toArray();
  		for (z in parcelAttrObj)
  			{
			parcelArray[parcelAttrObj[z].getB1AttributeName()]=parcelAttrObj[z].getB1AttributeValue();
			debug+="[" + parcelAttrObj[z].getB1AttributeName() + "] = " + parcelAttrObj[z].getB1AttributeValue() + br;
			}
  		}
  		
 	return parcelArray;
 }
 
 function loadTaskSpecific() {
 	// 
 	// Appends the Task Specific Info to App Specific Array
 	//
 
 	var workflowResult = aa.workflow.getTasks(capId);
 	if (workflowResult.getSuccess())
 		wfObj = workflowResult.getOutput();
 	else
 		{ message+="ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage() + br; return false; }
 
 	for (i in wfObj)
 		{
 		fTask = wfObj[i];
 		stepnumber = fTask.getStepNumber();
 		processID = fTask.getProcessID();
 		TSIResult = aa.taskSpecificInfo.getTaskSpecificInfoByTask(capId, processID, stepnumber)
 		if (TSIResult.getSuccess())
 			{
 			TSI = TSIResult.getOutput();
 			for (a1 in TSI)
 				{
 				AInfo[TSI[a1].getCheckboxDesc()] = TSI[a1].getChecklistComment();
 				debug+="TSI {" + TSI[a1].getCheckboxDesc() + "} = " + TSI[a1].getChecklistComment() + br;
 				}
 			}
 		}
}
  
function getCapId()  {

    var s_id1 = aa.env.getValue("PermitId1");
    var s_id2 = aa.env.getValue("PermitId2");
    var s_id3 = aa.env.getValue("PermitId3");

    var s_capResult = aa.cap.getCapID(s_id1, s_id2, s_id3);
    if(s_capResult.getSuccess())
      return s_capResult.getOutput();
    else
    {
      message+="ERROR: Failed to get capId: " + s_capResult.getErrorMessage() + br;
      return null;
    }
  }
  
  
// 
// matches:  returns true if value matches any of the following arguments
//
function matches(eVal,argList) {
   for (var i=1; i<arguments.length;i++)  
   	if (arguments[i] == eVal)
   		return true;

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
// Get the standard choices domain for this application type
//
function getScriptAction(strControl) 
	{
	var actArray = new Array();
		
	for (var count=1; count < 99; count++)  // Must be sequential from 01 up to 99
		{
		var countstr = count < 10 ? "0" + count : count;
		var bizDomScriptResult = aa.bizDomain.getBizDomainByValue(strControl,countstr);
	   	
	   	if (bizDomScriptResult.getSuccess())
	   		{
			bizDomScriptObj = bizDomScriptResult.getOutput();
			var myObj= new pairObj(bizDomScriptObj.getBizdomainValue());
			myObj.load(bizDomScriptObj.getDescription());
			if (bizDomScriptObj.getAuditStatus() == 'I') myObj.enabled = false;
			actArray.push(myObj);
			}
		else
			{
			break;
			}
		}
	return actArray;
	}
	
function doStandardChoiceActions(stdChoiceEntry,doExecution,docIndent) 
	{
	var thisDate = new Date();
	var thisTime = thisDate.getTime();
	debug+="Executing: " + stdChoiceEntry + ", Elapsed Time: "  + ((thisTime - startTime) / 1000) + " Seconds" + br;
	
	var pairObjArray = getScriptAction(stdChoiceEntry);
	if (!doExecution) docWrite(stdChoiceEntry,true,docIndent);
	for (xx in pairObjArray)
		{
		doObj = pairObjArray[xx];
		if (doExecution && doObj.enabled)
			{
			if (eval(token(doObj.cri)))
				{
				debug+="TRUE: " + doObj.cri + br;
				eval(token(doObj.act));
				}
			}
		else // just document
			{
			docWrite("|  ",false,docIndent);
			if (!doObj.enabled) docWrite("|  " + doObj.ID + " DISABLED!",false,docIndent);
			docWrite("|  " + doObj.ID + " criteria: " + doObj.cri,false,docIndent);
			docWrite("|  " + doObj.ID + " action  : " + doObj.act,false,docIndent);
			
			for (yy in doObj.branch)
				{
				doStandardChoiceActions(doObj.branch[yy],false,docIndent+1);
				}
			}
		} // next sAction
	if (!doExecution) docWrite(null,true,docIndent);
	var thisDate = new Date();
	var thisTime = thisDate.getTime();
	debug+="Finished: " + stdChoiceEntry + ", Elapsed Time: "  + ((thisTime - startTime) / 1000) + " Seconds" + br;
	}	

function docWrite(dstr,header,indent)
	{
	var istr = "";
	for (i = 0 ; i < indent ; i++)
		istr+="|  ";
	if (header && dstr)
		aa.print(istr + "------------------------------------------------");
	if (dstr) aa.print(istr + dstr);
	if (header)
		aa.print(istr + "------------------------------------------------");
	}
	
	
function token(tstr)
	{
	if (!disableTokens)
		{
		re = new RegExp("\\[","g") ; tstr = String(tstr).replace(re,"PInfo[\"");
		re = new RegExp("\\]","g") ; tstr = String(tstr).replace(re,"\"]");
		re = new RegExp("\\{","g") ; tstr = String(tstr).replace(re,"AInfo[\"");
		re = new RegExp("\\}","g") ; tstr = String(tstr).replace(re,"\"]");
		}
	return String(tstr);
  	}
  	
function pairObj(actID)
	{
	this.ID = actID;
	this.cri = null;
	this.act = null;
	this.enabled = true;
	this.branch = new Array();
	
	this.load = function(loadStr) { 
		//
		// load() : tokenizes and loades the criteria and action
		//
		loadArr = loadStr.split("\\^");
		if (loadArr.length != 2)
			{
			message+="ERROR: The following Criteria/Action pair is incorrectly formatted.  Two elements separated by a caret (\"^\") are required. " + br + br + loadStr + br;
			}
		else
			{
			this.cri = loadArr[0];
			this.act = loadArr[1];
			
			var a = loadArr[1];
			var bb = a.indexOf("branch");
			while (bb >= 0)
			  {
			  var cc = a.substring(bb);
			  var dd = cc.indexOf("\")");
			  this.branch.push(cc.substring(8,dd));
			  a = cc.substring(dd);
			  bb = a.indexOf("branch");
			  }
			  
			}
		}
	}	
