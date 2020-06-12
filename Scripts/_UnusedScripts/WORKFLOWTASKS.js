/*------------------------------------------------------------------------------------------------------/
| Program: WorkflowTasks.js               
| Event Trigger: WorkflowTaskUpdateAfter
| Client : Fort Collins CO                    
| Action : 05SSP-00397
| 
| Updates certain workflows based on criteria.
|                                                                       
| Version 0.1 - Base Version - 8/19/2005 - John Schomp
| Version 0.11 Fixed problem with conditions having two OR operators (||) 8/21/2005
| Version 0.2 - Added Controls for 05SSP-00412 (Add Fees)
| Version 0.3 - Changed workflow to Application Type
| Version 0.4 - Had to default some app specific info that may/may not be entered
| Version 0.5 - FF Permit Fee needs to be added with the FF valuation as a parameter (not 1) to calculate fee correctly 1/11/07  Kristi Kreisher
| Version 0.6 - Added His Pres sign-off to New Const in case of historical district
/------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------/
| <===========Configuration=Start================>
| 
| Instructions for implementation consultants...
|
| showmessage = true	 	Displays a window of debug information to help with setting up controls
|
| showmessage = false	Set to false when the configuration is tuned properly.  Messages display only 
|			 		on error.
|
| AddControl(name) : 	 	Adds a new control to the control array.  A control is simply a set of criteria
|			 		along with action(s) that will occur if the all criteria is met.  
|			 		"name" is just used for debugging reference.  This functions returns a control 
|			 		object used to add conditions and update info.
|
| x.criteria.push                 Adds criteria statements to the control.  Each criteria will be evaluated as true
|                                       or false.  If all criteria for a control evaluate to true, the actions will be exectued.
|
| x.workflow.push	 	Adds workflows that will be used in the criteria of this control.  
|                                      *MUST be in upper case*  
|
| x.action.push			If all the criteria added are satisfied, these actions will be performed.  This
|			 		string is evalauated as javascript syntax, and should be the name of a function
|			 		created specificially for this script.
|
| <=============Examples==========================>
| 
| x = AddControl("Example: Update Fee Review when in Historical District");
|	x.criteria.push("s_task.toUpperCase() == \"APPLICATION SUBMITTAL\"");
|	x.criteria.push("s_status.toUpperCase() == \"OK\"");
|      	x.criteria.push("PInfo[\"FLOODPLAIN\"] == \"N\" || PInfo[\"FLOODPLAIN\"] == \"\" || PInfo[\"FLOODPLAIN\"] == null");
|	x.criteria.push("x.checkWorkflow()");
|      	x.criteria.push("AInfo[\"RES SQ FT ADDED\"] < 350");
|	x.workflow.push("RESIDENTIAL MINOR ALTERATION","COMMERCIAL OTHER");
|	x.workflow.push("COMMERCIAL MINOR ALTERATION");	
| 	x.action.push("updateWorkflow(\"SW Eng Review\")");
| 	x.action.push("updateAppSpecificInfo(\"Total Square Feet\"," + eval("AInfo[\"RES SQ FT ADDED\"] + AInfo[\"IND SQ FT ADDED\"]") + ")")
|
/-----------------------------------------------------------------------------------------------------*/
var showMessage = false;		// Set to true to see output window
var MCA = 	new Array();  	// Master Control Array
var x = 	null;		// Temporary Control Object//
var fs = "COMBO PERMIT"; 	// Fee schedule for added fees
var pe = "FINAL";		// Period for added fees

x = AddControl("Condition 1");
	x.criteria.push("s_task.toUpperCase() == \"APPLICATION SUBMITTAL\"");
	x.criteria.push("s_status.toUpperCase() == \"OK\"");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.appType.push("Building/Minor Permit/Sign/NA");
	x.appType.push("Building/Minor Permit/Patio Cover/NA");
	x.appType.push("Building/Minor Permit/Deck/NA");
	x.appType.push("Building/Minor Permit/Fence/NA");
	x.appType.push("Building/Minor Permit/Residential/Pool");
	x.appType.push("Building/Minor Permit/Commercial/Pool");
	x.appType.push("Building/Minor Permit/Storage Shed/NA");
	x.appType.push("Building/Minor Permit/Temporary Structure/NA");
	x.appType.push("Building/OTC/Residential/Basement Finish");
	x.criteria.push("PInfo[\"FLOODPLAIN\"] == \"N\" || PInfo[\"FLOODPLAIN\"] == \"\" || PInfo[\"FLOODPLAIN\"] == null");
	x.action.push("updateWorkflow(\"SW Floodplain Review\")");	
   
x = AddControl("Condition 2");
	x.criteria.push("s_task.toUpperCase() == \"APPLICATION SUBMITTAL\"");
	x.criteria.push("s_status.toUpperCase() == \"OK\"");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.appType.push("Building/New/Residential/Single Family Detached");
	x.appType.push("Building/New/Residential/Manufactured Home");
	x.appType.push("Building/New/Residential/Single Family Attached");
	x.appType.push("Building/New/Residential/Duplex");
	x.appType.push("Building/New/Residential/Multi-Family");
	x.appType.push("Building/Minor Permit/New Mobile Home/NA");
	x.appType.push("Building/OTC/Residential/Mobile Home Installation");
	x.appType.push("Building/New/Residential/Secondary Building");
	x.appType.push("Building/Addition/Residential/NA");
	x.appType.push("Building/Alteration/Residential/General");
	x.appType.push("Building/Alteration/Residential/Minor");
	x.appType.push("Building/Minor Permit/Demolition/NA");
	x.appType.push("Building/New/Commercial/Com-Ind-Mixed-Use Building");
	x.appType.push("Building/Addition/Commercial/NA");
	x.appType.push("Building/Alteration/Commercial/General");
	x.appType.push("Building/Alteration/Commercial/Minor");
	x.criteria.push("PInfo[\"FLOODPLAIN\"] == \"N\" || PInfo[\"FLOODPLAIN\"] == \"\" || PInfo[\"FLOODPLAIN\"] == null");
	x.action.push("updateWorkflow(\"SW Floodplain Review\")");
	x.action.push("updateWorkflow(\"SW Floodplain Final\")");

x = AddControl("Condition 3");
	x.criteria.push("s_task.toUpperCase() == \"APPLICATION SUBMITTAL\"");
	x.criteria.push("s_status.toUpperCase() == \"OK\"");
	x.criteria.push("PInfo[\"HISTORICAL PROPERTY\"] == \"N\" || PInfo[\"HISTORICAL PROPERTY\"] == \"\" || PInfo[\"HISTORICAL PROPERTY\"] == null");
	x.criteria.push("PInfo[\"HISTORICAL DISTRICT\"] == \"\" || PInfo[\"HISTORICAL DISTRICT\"] == null");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.appType.push("Building/Addition/Residential/NA");
	x.appType.push("Building/Alteration/Residential/General");
	x.appType.push("Building/Alteration/Residential/Minor");
	x.appType.push("Building/Minor Permit/Demolition/NA");
	x.appType.push("Building/Addition/Commercial/NA");
	x.appType.push("Building/Alteration/Commercial/General");
	x.appType.push("Building/Alteration/Commercial/Minor");
	x.appType.push("Building/Minor Permit/Awning/NA");
	x.appType.push("Building/Minor Permit/Deck/NA");
//	x.appType.push("Building/Minor Permit/Fence/NA");
	x.appType.push("Building/Minor Permit/Patio Cover/NA");
	x.appType.push("Building/OTC/Residential/Roofing - Re-roofing");
	x.appType.push("Building/Minor Permit/Commercial/Roofing - Re-roofing");
	x.appType.push("Building/Minor Permit/Sign/NA");
	x.appType.push("Building/New/Residential/Single Family Detached");
	x.appType.push("Building/New/Residential/Single Family Attached");
	x.appType.push("Building/New/Residential/Manufactured Home");
	x.appType.push("Building/New/Residential/Duplex");
	x.appType.push("Building/New/Residential/Secondary Building");
	x.appType.push("Building/New/Residential/Multi-Family");
	x.appType.push("Building/New/Commercial/Com-Ind-Mixed-Use Building");
	x.appType.push("Building/Minor Permit/Residential/Pool");
	x.appType.push("Building/Minor Permit/Commercial/Pool");
	x.action.push("updateWorkflow(\"Hist Pres Review\")");

x = AddControl("Condition 4");
	x.criteria.push("s_task.toUpperCase() == \"APPLICATION SUBMITTAL\"");
	x.criteria.push("s_status.toUpperCase() == \"OK\"");
	x.criteria.push("AInfo[\"RES SQ FT ADDED\"] < 350");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.appType.push("Building/New/Residential/Secondary Building");
	x.action.push("updateWorkflow(\"SW Eng Review\")");
	x.action.push("updateWorkflow(\"SW Eng Final\")");
	x.action.push("updateWorkflow(\"SW Fee Review\")");
	
x = AddControl("Condition 5");
	x.criteria.push("s_task.toUpperCase() == \"APPLICATION SUBMITTAL\"");
	x.criteria.push("s_status.toUpperCase() == \"OK\"");
	x.criteria.push("AInfo[\"RES SQ FT ADDED\"] < 350");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.appType.push("Building/Addition/Residential/NA");
	x.appType.push("Building/Minor Permit/Storage Shed/NA");
	x.action.push("updateWorkflow(\"SW Eng Review\")");
	x.action.push("updateWorkflow(\"SW Fee Review\")");

x = AddControl("Condition 6");
	x.criteria.push("s_task.toUpperCase() == \"APPLICATION SUBMITTAL\"");
	x.criteria.push("s_status.toUpperCase() == \"OK\"");
	x.criteria.push("AInfo[\"RES SQ FT ADDED\"] < 350");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.appType.push("Building/Minor Permit/Deck/NA");
	x.appType.push("Building/Minor Permit/Residential/Pool");
	x.appType.push("Building/Minor Permit/Commercial/Pool");
	x.action.push("updateWorkflow(\"SW Fee Review\")");
	
x = AddControl("Condition 15");
	x.criteria.push("s_task.toUpperCase() == \"APPLICATION SUBMITTAL\"");
	x.criteria.push("s_status.toUpperCase() == \"OK\"");
	x.criteria.push("(AInfo[\"RES SQ FT ADDED\"] == \"\" ? 0 : parseInt(AInfo[\"RES SQ FT ADDED\"])) + (AInfo[\"COM SQ FT ADDED\"] == \"\" ? 0 : parseInt(AInfo[\"COM SQ FT ADDED\"])) + (AInfo[\"IND SQ FT ADDED\"] == \"\" ? 0 : parseInt(AInfo[\"IND SQ FT ADDED\"])) < 350");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.appType.push("Building/Addition/Commercial/NA");
	x.action.push("updateWorkflow(\"SW Eng Review\")");
	x.action.push("updateWorkflow(\"SW Fee Review\")");

x = AddControl("Condition 7");
	x.criteria.push("s_task.toUpperCase() == \"APPLICATION SUBMITTAL\"");
	x.criteria.push("s_status.toUpperCase() == \"OK\"");
	x.criteria.push("AInfo[\"FOOD SERVICE, DAY CARE OR INSTITUTION\"] != \"Yes\"");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.appType.push("Building/New/Commercial/Com-Ind-Mixed-Use Building");
	x.appType.push("Building/Addition/Commercial/NA");
	x.appType.push("Building/Alteration/Commercial/General");
	x.appType.push("Building/Alteration/Commercial/Minor");
	x.appType.push("Building/Minor Permit/Commercial/Pool");
	x.appType.push("Building/Minor Permit/Commercial/Water Heater");
	x.appType.push("Building/Minor Permit/Commercial/Plumbing");
	x.appType.push("Building/Minor Permit/Commercial/Electrical");
	x.appType.push("Building/Minor Permit/Commercial/Mechanical");
	x.action.push("updateWorkflow(\"WWW Traps Review\")");
	x.action.push("updateWorkflow(\"Health Dept Review\")");

x = AddControl("Condition 10");
	x.criteria.push("s_task.toUpperCase() == \"APPLICATION SUBMITTAL\"");
	x.criteria.push("s_status.toUpperCase() == \"OK\"");
	x.criteria.push("AInfo[\"AUTO REPAIR OR AUTO SERVICE\"] != \"Yes\"");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.appType.push("Building/New/Commercial/Com-Ind-Mixed-Use Building");
	x.appType.push("Building/Addition/Commercial/NA");
	x.appType.push("Building/Alteration/Commercial/General");
	x.action.push("updateWorkflow(\"WWW Traps Review\")");
	
x = AddControl("Condition 12");
	x.criteria.push("s_task.toUpperCase() == \"APPLICATION SUBMITTAL\"");
	x.criteria.push("s_status.toUpperCase() == \"OK\"");
	x.criteria.push("AInfo[\"CHANGE OF USE\"] == \"No\" || AInfo[\"CHANGE OF USE\"] == \"\" || AInfo[\"CHANGE OF USE\"] == null");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.appType.push("Building/Addition/Commercial/NA");
	x.appType.push("Building/Alteration/Commercial/General");
	x.action.push("updateWorkflow(\"Street Oversizing Review\")");
	
x = AddControl("Condition 13");
	x.criteria.push("s_task.toUpperCase() == \"APPLICATION SUBMITTAL\"");
	x.criteria.push("s_status.toUpperCase() == \"OK\"");
	x.criteria.push("AInfo[\"CHANGE OF USE\"] == \"No\" || AInfo[\"CHANGE OF USE\"] == \"\" || AInfo[\"CHANGE OF USE\"] == null");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.appType.push("Building/Minor Permit/Change Of Use/NA");
	x.action.push("updateWorkflow(\"Zoning Review\")");
	x.action.push("updateWorkflow(\"Zoning Final\")");
	
x = AddControl("Condition 14");
	x.criteria.push("s_task.toUpperCase() == \"APPLICATION SUBMITTAL\"");
	x.criteria.push("s_status.toUpperCase() == \"OK\"");
	x.criteria.push("AInfo[\"CHANGE OF OCCUPANCY\"] == \"No\" || AInfo[\"CHANGE OF OCCUPANCY\"] == \"\" || AInfo[\"CHANGE OF OCCUPANCY\"] == null");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.appType.push("Building/Minor Permit/Change Of Use/NA");
	x.action.push("updateWorkflow(\"Bldg Insp Plan Review\")");
	x.action.push("updateWorkflow(\"Fire Authority Review\")");
	x.action.push("updateWorkflow(\"Fire Authority Final\")");
	x.action.push("updateWorkflow(\"Bldg Dept Req Docs Rcvd\")");
	
x = AddControl("05SSP-00412 Condition 1");
	x.criteria.push("s_task.toUpperCase() == \"PARTIAL PERMIT ISSUANCE\"");
	x.criteria.push("s_status.toUpperCase() == \"FF\"");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.appType.push("Building/New/Residential/Single Family Detached");
	x.appType.push("Building/New/Residential/Manufactured Home");
	x.action.push("addFee(\"BPF-FF2\",fs,pe,1)");
	
x = AddControl("05SSP-00412 Condition 2");
	x.criteria.push("s_task.toUpperCase() == \"PARTIAL PERMIT ISSUANCE\"");
	x.criteria.push("s_status.toUpperCase() == \"FF\"");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.appType.push("Building/New/Residential/Single Family Attached");
	x.appType.push("Building/New/Residential/Duplex");
	x.appType.push("Building/New/Residential/Multi-Family");
	x.appType.push("Building/New/Residential/Secondary Building");
	x.appType.push("Building/Addition/Residential/NA");
	x.appType.push("Building/New/Commercial/Com-Ind-Mixed-Use Building");
	x.appType.push("Building/Addition/Commercial/NA");
	x.action.push("removeFee(\"BPF-SUB\")");
	x.action.push("removeFee(\"CST\")");
	x.action.push("removeFee(\"CT\")");
	x.action.push("addFee(\"BPF-FF1\",fs,pe,AInfo[\"FF VALUATION\"])");
	x.action.push("addFee(\"CT-FF\",fs,pe,1)");
	x.action.push("addFee(\"CST-FF\",fs,pe,1)");
	/// is jobval calculated or estimated?  uncomment the corrent line below "var jobval=..."
	x.action.push("addFee(\"BPF-WFF\",fs,pe,jobval-AInfo[\"FF VALUATION\"])");
	x.action.push("addFee(\"CST-WFF\",fs,pe,jobval-AInfo[\"FF VALUATION\"])");
	x.action.push("addFee(\"CT-WFF\",fs,pe,jobval-AInfo[\"FF VALUATION\"])");
	
/*------------------------------------------------------------------------------------------------------/
| <=========== END Configuration================>
/-----------------------------------------------------------------------------------------------------*/
//
// Obtain the Workflow Information
//
s_task = aa.env.getValue("WorkflowTask");
s_status = aa.env.getValue("WorkflowStatus");
userID = aa.env.getValue("CurrentUserID");
userObj = aa.person.getUser(userID).getOutput();
//
// Set some variables
//
var message =	"";		// Message String
var returnval = null;		// Boolean return value
var br = 	"<BR>";		// Break Tag
//
// Get the Cap, CapID objects
//
var capId = 	getCapId();				//CapId object
var cap = 	aa.cap.getCap(capId).getOutput();	//Cap object
var capIDString = capId.getCustomID();			//alternate cap id string
var appTypeResult = cap.getCapType();
var appTypeString = appTypeResult.toString();

var valobj = aa.finance.getContractorSuppliedValuation(capId,null).getOutput();	// Calculated valuation 
var jobval = valobj[0].getEstimatedValue();		// Use Contractor Value
message+="jobval = " + jobval + br;
//var jobval = valobj[0].getCalculatedValue();		// Use Calcuated Value

var wfObj = 	null;					//Workflow Object used for updating
var AInfo = 	AppSpecific(capId);			//Associative array of appspecifc info
var PInfo = 	ParcelAttribute(capId);			//Associative array of parcel attributes
var WInfo = 	Workflows(capId);			//Associative array of active workflows

message+="apptypestring = " + appTypeString + br;

/*------------------------------------------------------------------------------------------------------/
| <===========Main=Loop================>
| 
| For each control, check criteria.  If all are met, execute the update
| 
/-----------------------------------------------------------------------------------------------------*/
message+="Cap ID: " + capIDString + br;
message+="apptypestring = " + appTypeString + br;
for (y in MCA)
	{
	x =MCA[y];
	//
	// Check the criteria
	//
	if (x.checkCriteria())
		x.process();
	}			
/*------------------------------------------------------------------------------------------------------/
| <===========END=Main=Loop================>
/-----------------------------------------------------------------------------------------------------*/

if (message.indexOf("ERROR") > 0)
	{
	aa.env.setValue("ScriptReturnCode", "1");
	aa.env.setValue("ScriptReturnMessage", message);
	}
else
	{
	aa.env.setValue("ScriptReturnCode", "0");
	if (showMessage) aa.env.setValue("ScriptReturnMessage", message);
	}

/*------------------------------------------------------------------------------------------------------/
| <===========Functions and Classes================>
/-----------------------------------------------------------------------------------------------------*/

function Controller(name) {

	this.name = name;
	this.workflow = new Array();
	this.appType = new Array();
	this.criteria = new Array();
	this.action = new Array();
	
       
         this.checkWorkflow = function() { 
         	//
         	// checkWorkflow(): returns true if all the workflows are present
         	//
         	var workflowtest = true;
         	for (z in this.workflow)
         		if (!WInfo[this.workflow[z]]) workflowtest=false;
         		else message+=this.name + " Matched Workflow Condition: " + this.workflow[z] + br;
         	return workflowtest
         	}
         	
         this.checkCriteria = function() { 
         	//
         	// checkCriteria: eval all criteria elements and return true if all are true
         	//
         	var passed = true;
         	for (z in this.criteria)
         		{
         		if (!eval(this.criteria[z]))
         			passed = false;
         		else
         			message+=this.name + " Passed Criteria " + z + " : " + this.criteria[z] + br;
         		}
         	return passed;
         	}
         	
         	
         this.process = function() { 
         	//
         	// process() : executes all the update strings for this object
         	//
         	for (z in this.action)
         		{
         		message+=this.name +":passed, executing " + this.action[z] + br;
         		eval(this.action[z]);
         		}
  		}
} 

function AddControl(name){ 
	MCA[MCA.length] = new Controller(name);
	return MCA[MCA.length-1];
}

function AppSpecific(myCapId) {
	// 
	// Returns an associative array of App Specific Info
	//
  	appArray = new Array();
    	var appSpecInfoResult = aa.appSpecificInfo.getByCapID(myCapId);
	if (appSpecInfoResult.getSuccess())
	 	{
		var fAppSpecInfoObj = appSpecInfoResult.getOutput();

		for (loopk in fAppSpecInfoObj)
			{
			appArray[fAppSpecInfoObj[loopk].checkboxDesc.toUpperCase()] = fAppSpecInfoObj[loopk].checklistComment;
			message+="App Specific: " + fAppSpecInfoObj[loopk].checkboxDesc.toUpperCase() + " = " + fAppSpecInfoObj[loopk].checklistComment + br;
			}
		//  Added to keep script from aborting due to no values
		
		if (!appArray["RES SQ FT ADDED"]) appArray["RES SQ FT ADDED"] = 0;
		if (!appArray["COM SQ FT ADDED"]) appArray["COM SQ FT ADDED"] = 0;
		if (!appArray["IND SQ FT ADDED"]) appArray["IND SQ FT ADDED"] = 0;
		
		}
	return appArray;
}

function ParcelAttribute(myCapId) {
	//
	// Returns an associative array of Parcel Attributes
	//
	parcelArray = new Array();
	fcapParcelObj = null;
   	capParcelResult = aa.parcel.getParcelandAttribute(myCapId, null);
   	if (capParcelResult.getSuccess())
   		fcapParcelObj = capParcelResult.getOutput().toArray();
  	 else
     		message+="ERROR: Failed to get Parcel object: " + capParcelResult.getErrorType() + ":" + capParcelResult.getErrorMessage() + br;
  	
  	for (i in fcapParcelObj)
  		{
  		parcelAttrObj = fcapParcelObj[i].getParcelAttribute().toArray();
  		for (z in parcelAttrObj)
  			{
			parcelArray[parcelAttrObj[z].getB1AttributeName().toUpperCase()]=parcelAttrObj[z].getB1AttributeValue();
			message+="ParcelAttribute: " + parcelAttrObj[z].getB1AttributeName() + " = " + parcelAttrObj[z].getB1AttributeValue() + br;
			}
			
		if (!parcelArray["RES SQ FT ADDED"]) parcelArray["RES SQ FT ADDED"] = 0;
		//if (!parcelArray["COM SQ FT ADDED"]) parcelArray["COM SQ FT ADDED"] = 0;
		//if (!parcelArray["IND SQ FT ADDED"]) parcelArray["IND SQ FT ADDED"] = 0;
  		}
  		
 	return parcelArray;
 }
 
  
function Workflows(myCapId) {
	var workflowArray = new Array();
	
   	workflowResult = aa.workflow.getTasks(myCapId);
 	 if (workflowResult.getSuccess())
  	 	wfObj = workflowResult.getOutput();
  	 else
  	  	message+="ERROR: Failed to get workflow object: " + s_capResult.getErrorMessage() + br;
   
   	
   	for (i in wfObj)
   		{
   		fTask = wfObj[i];
   		if (fTask.getActiveFlag() == "Y")
   			{
   			message+="Adding Workflow : " + fTask.getTaskDescription().toUpperCase() + br;
   			workflowArray[fTask.getTaskDescription().toUpperCase()] = true;
   			}
   		}
   		
 	return workflowArray;
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
  
function updateWorkflow(wfstr) {

   	for (i in wfObj)
		{
   		fTask = wfObj[i];
   		message+="Comparing Workflows, does "+ fTask.getTaskDescription().toUpperCase() + " = " + wfstr.toUpperCase() + " Complete? " + fTask.getCompleteFlag() + br;
		if (fTask.getTaskDescription().toUpperCase() == wfstr.toUpperCase())
			editTask(fTask,wfstr);
		}
	}

function editTask(fTask,taskName) {

	dispositionDate = aa.date.getCurrentDate();
	dispositionNote = "System Generated";
	dispositionComment = "System Generated NA based on parcel data, square footage or app spec info";
	dispositionStatus = "NA";
	stepnumber = fTask.getStepNumber();
	
	if (fTask.getCompleteFlag() == "N")
		{
		message+="Attempting to adjust task : " + taskName + " Step Number="+stepnumber + br;
		aa.workflow.handleDisposition(capId,stepnumber,dispositionStatus,dispositionDate, dispositionNote,dispositionComment,userObj , 'Y');
		}
	else
		message+="Attempting to adjust task : " + taskName + " But it is already complete" + br;
	
	}
	
	
//
//
//
function addFee(fcode,fsched,fperiod,fqty) {
	
	if (fqty > 0)
		{
		assessFeeResult = aa.finance.createFeeItem(capId,fsched,fcode,fperiod,fqty);
		if (assessFeeResult.getSuccess())
			{
			feeSeq = assessFeeResult.getOutput();
			message+="Added Fee " + fcode + ", Qty " + fqty + br;
			message+="The assessed fee Sequence Number " + feeSeq + br;
			}
		else
			{
			message+= "ERROR: assessing fee (" + fcode + "): " + assessFeeResult.getErrorMessage() + br;
			}
		}
	else
		{
		message+="Could not add fee " + fcode + ", due to Qty " + fqty + br;
		}
}


function removeFee(rFee) {
	
	var feelist = aa.finance.getFeeItemByCapID(capId).getOutput()
	
	for (zzz in feelist)
		{
		var cFee = feelist[zzz];
		var cCode =  cFee.getFeeCod();
		var cStat = cFee.getFeeitemStatus();
		var cSeq = cFee.getFeeSeqNbr();
		if (cCode == rFee && cStat == "NEW")     // Matched the fee, not invoiced
			{
			removeFeeResult = aa.finance.removeFeeItem(capId, cSeq) 
           		if (!removeFeeResult.getSuccess())
	   			message+= "ERROR: removing fee (" + cCode + "): " + removeFeeResult.getErrorMessage() + br;
			}
		}
}

//
// exists:  return true if Value is in Array
//
function exists(eVal, eArray) {
	  for (ii in eArray) 
	  	if (eArray[ii] == eVal) return true;
	  return false;
}
