// WTUA:Building\*\*\*
//  #01: matches(currentUserID,"MHELVICK","CPROBASCO","JGUEST","ADMIN","RSCHUG") ^ showDebug = 3;
if (matches(currentUserID, "MHELVICK", "KKREISHER", "CPROBASCO", "JGUEST", "ADMIN", "RSCHUG")) {
	showDebug = 3;
}
//  #02: wfTask.equals("Application Submittal") && wfStatus.equals("OK") && appMatch("Building/*/*/*") && !appMatch("Building/Project/*/*") && !matches(wfProcess,lookup("BUILDING EDR WORKFLOWS",wfProcess)) && !matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) ^  branch("ApplicationSubmit:DeactivateTask")
if (wfTask.equals("Application Submittal") && wfStatus.equals("OK") && appMatch("Building/*/*/*") && !appMatch("Building/Project/*/*") && !matches(wfProcess,lookup("BUILDING EDR WORKFLOWS",wfProcess)) && !matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess))) {
	DeactivateTaskBLDReviews(); // ApplicationSubmit:DeactivateTask
}

// WTUA:Building\Project\*\*
//  #03: appMatch("Building/Project/*/*")  && wfStatus.equals("Hold") && matches(wfTask,"Fire Authority Final","SW Erosion Review","WWW Fee Review","Zoning Review","Engineering Review")  ^ updateChildTasks(wfTask,wfStatus,wfComment,wfNote,true,"U")
//  #04: appMatch("Building/Project/*/*")  && wfStatus.equals("Hold") && matches(wfTask,"Fire Authority Review","Nat Res Review","SW Erosion Final")  ^ updateChildTasks(wfTask,wfStatus,wfComment,wfNote,true,"U")
//  #05: appMatch("Building/Project/*/*")  && wfStatus.equals("Hold") && matches(wfTask,"WWW Gen Backflow Final","Zoning Final","Engineering Final","Electric Eng Review")  ^ updateChildTasks(wfTask,wfStatus,wfComment,wfNote,true,"U")
//  #06: appMatch("Building/Project/*/*")  && wfStatus.equals("OK") && matches(wfTask,"Fire Authority Final","SW Erosion Review","WWW Fee Review","Zoning Review","Engineering Review")  ^ updateChildTasks(wfTask,"Comments",wfComment,wfNote,false,"U")
//  #07: appMatch("Building/Project/*/*")  && wfStatus.equals("OK") && matches(wfTask,"Fire Authority Review","Nat Res Review","SW Erosion Final")  ^ updateChildTasks(wfTask,"Comments",wfComment,wfNote,false,"U")
//  #08: appMatch("Building/Project/*/*")  && wfStatus.equals("OK") && matches(wfTask,"WWW Gen Backflow Final","Zoning Final","Engineering Final","Electric Eng Review")  ^ updateChildTasks(wfTask,"Comments",wfComment,wfNote,false,"U")
//  #11: appMatch("Building/Project/*/*")  && wfStatus.equals("Hold") && matches(wfTask,"SW Eng Review","WWW Eng Review","SW Eng Final","NonCity WWW Fee Review")  ^ updateChildTasks(wfTask,wfStatus,wfComment,wfNote,true,"U")
//  #12: appMatch("Building/Project/*/*")  && wfStatus.equals("OK") && matches(wfTask,"SW Eng Review","WWW Eng Review","SW Eng Final","NonCity WWW Fee Review")  ^ updateChildTasks(wfTask,"Comments",wfComment,wfNote,false,"U")
//  #13: wfTask.equals("Application Submittal") && wfStatus.equals("OK") && appMatch("Building/*/*/*") && !appMatch("Building/Project/*/*")  && !matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) ^  branch("ApplicationSubmit:Subdivision")
//  #14: wfTask.equals("Full Permit Issuance") && (wfStatus.equals("OK") || wfStatus.equals("Re-Issue")) && appMatch("Building/*/*/*") && !appMatch ("Building/Project/*/*")  ^  editAppSpecific("Permit Expiration Date", dateAdd(null,180)); //closeTask("Partial Permit Issuance","NA","Updated Via Script", "Updated Via Script - Full Permit Issued");
//  #15: wfTask.equals("Partial Permit Issuance") && (wfStatus.equals("FF") || wfStatus.equals("FF+") || wfStatus.equals("Re-Issue FF") || wfStatus.equals("Re-Issue FF+")) && appMatch("Building/*/*/*") && !appMatch ("Building/Project/*/*")  ^  editAppSpecific("Permit Expiration Date", dateAdd(null,180))
//  #16: wfTask.equals("Partial Permit Issuance") && wfStatus.equals("Revocable") && appMatch("Building/*/*/*") && !appMatch ("Building/Project/*/*")  ^  editAppSpecific("Permit Expiration Date", dateAdd(null,180))
if (appMatch("Building/Project/*/*")) {
	if (wfStatus.equals("Hold")) {
		if (matches(wfTask, "Fire Authority Final", "SW Erosion Review", "WWW Fee Review", "Zoning Review", "Engineering Review")) {
			updateChildTasks(wfTask, wfStatus, wfComment, wfNote, true, "U");
		}
		if (matches(wfTask, "Fire Authority Review", "Nat Res Review", "SW Erosion Final")) {
			updateChildTasks(wfTask, wfStatus, wfComment, wfNote, true, "U");
		}
		if (matches(wfTask, "WWW Gen Backflow Final", "Zoning Final", "Engineering Final", "Electric Eng Review")) {
			updateChildTasks(wfTask, wfStatus, wfComment, wfNote, true, "U");
		}
		if (matches(wfTask, "SW Eng Review", "WWW Eng Review", "SW Eng Final", "NonCity WWW Fee Review")) {
			updateChildTasks(wfTask, wfStatus, wfComment, wfNote, true, "U");
		}
	}
	if (wfStatus.equals("OK")) {
		if (matches(wfTask, "Fire Authority Final", "SW Erosion Review", "WWW Fee Review", "Zoning Review", "Engineering Review")) {
			updateChildTasks(wfTask, "Comments", wfComment, wfNote, false, "U");
		}
		if (matches(wfTask, "Fire Authority Review", "Nat Res Review", "SW Erosion Final")) {
			updateChildTasks(wfTask, "Comments", wfComment, wfNote, false, "U");
		}
		if (matches(wfTask, "WWW Gen Backflow Final", "Zoning Final", "Engineering Final", "Electric Eng Review")) {
			updateChildTasks(wfTask, "Comments", wfComment, wfNote, false, "U");
		}
		if (matches(wfTask, "SW Eng Review", "WWW Eng Review", "SW Eng Final", "NonCity WWW Fee Review")) {
			updateChildTasks(wfTask, "Comments", wfComment, wfNote, false, "U");
		}
	}
} else {
	if (wfTask.equals("Application Submittal") && wfStatus.equals("OK") && !matches(wfProcess, lookup("BUILDING BLD2 EDR WORKFLOWS", wfProcess))) {
		ASA_Subdivision(); // ApplicationSubmit:Subdivision
	}
	if (wfTask.equals("Full Permit Issuance") && (wfStatus.equals("OK") || wfStatus.equals("Re-Issue"))) {
		editAppSpecific("Permit Expiration Date", dateAdd(null, 180));
		//closeTask("Partial Permit Issuance","NA","Updated Via Script", "Updated Via Script - Full Permit Issued");
	}
	if (wfTask.equals("Partial Permit Issuance") && (wfStatus.equals("FF") || wfStatus.equals("FF+") || wfStatus.equals("Re-Issue FF") || wfStatus.equals("Re-Issue FF+"))) {
		editAppSpecific("Permit Expiration Date", dateAdd(null,180));
	}
	if (wfTask.equals("Partial Permit Issuance") && wfStatus.equals("Revocable")) {
		editAppSpecific("Permit Expiration Date", dateAdd(null,180));
	}
}
//  #17: wfTask.equals("Partial Permit Issuance") && (wfStatus.equals("FF") || wfStatus.equals("FF+")) && appMatch("Building/*/*/*")  ^  branch("WorkflowTaskUpdateAfter: Partial Permit Issuance")
if (wfTask.equals("Partial Permit Issuance") && (wfStatus.equals("FF") || wfStatus.equals("FF+")) && appMatch("Building/*/*/*")) {
	WTUA_Partial_Permit_Issuance();
}
//  #19: wfTask.equals("Bldg Insp Plan Review") && wfStatus.equals("OK") && !isTaskStatus("Application Submittal", "OK") ^  deactivateTask("Full Permit Issuance")
if (wfTask.equals("Bldg Insp Plan Review") && wfStatus.equals("OK") && !isTaskStatus("Application Submittal", "OK")) {
	deactivateTask("Full Permit Issuance");
}
//  #22: wfTask.equals("Application Submittal") && wfStatus.equals("OK") && appMatch("Building/*/*/*") && !matches(wfProcess,lookup("BUILDING EDR WORKFLOWS",wfProcess)) && !matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) ^  branch("WorkflowTaskUpdateAfter: AppSubmitOK")
if (!matches(wfProcess,lookup("BUILDING EDR WORKFLOWS",wfProcess)) && !matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess))) {
	if (wfTask.equals("Application Submittal") && wfStatus.equals("OK")) {
		WTUA_AppSubmitOK(); // WorkflowTaskUpdateAfter:AppSubmitOK
	}
}
//  #41: appMatch("Building/*/*/*")  ^  branch("WorkflowTaskUpdateAfter:Building");
if (appMatch("Building/*/*/*")) {
	WTUA_Building();	// WorkflowTaskUpdateAfter:Building
}

//  #53: appMatch("Building/New/*/*") && wfTask.equals("Document Check In") && (wfStatus.equals("Approved") || wfStatus.equals("Resubmittal Required")) ^ branch("DocumentUploadAfter:Contact Notification CheckIn");
if (appMatch("Building/New/*/*") && wfTask.equals("Document Check In") && (wfStatus.equals("Approved") || wfStatus.equals("Resubmittal Required"))) {
	DUA_Contact_Notification_CheckIn(); // DocumentUploadAfter:Contact Notification CheckIn
}

//  #54: !matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) && wfTask.equals("Land Use Code Compliance Review") && (wfStatus.equals("OK") || wfStatus.equals("OK with Conditions") || wfStatus.equals("Resubmittal Required") || wfStatus.equals("Approved Stock Plan")) && matches(wfProcess,lookup("BUILDING EDR WORKFLOWS",wfProcess)) ^ branch("ApplicationSubmit:DeactivateTask")
//  #55: !matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) && wfTask.equals("Land Use Code Compliance Review") && (wfStatus.equals("OK") || wfStatus.equals("OK with Conditions") || wfStatus.equals("Resubmittal Required") || wfStatus.equals ("Approved Stock Plan")) && matches(wfProcess,lookup("BUILDING EDR WORKFLOWS",wfProcess)) ^  branch("WorkflowTaskUpdateAfter: AppSubmitOK")
if (!matches(wfProcess, lookup("BUILDING BLD2 EDR WORKFLOWS", wfProcess))) {
	if (wfTask.equals("Land Use Code Compliance Review") && (wfStatus.equals("OK") || wfStatus.equals("OK with Conditions") || wfStatus.equals("Resubmittal Required") || wfStatus.equals("Approved Stock Plan")) && matches(wfProcess, lookup("BUILDING EDR WORKFLOWS", wfProcess))) {
		DeactivateTaskBLDReviews() // ApplicationSubmit:DeactivateTask;
	}
	if (wfTask.equals("Land Use Code Compliance Review") && (wfStatus.equals("OK") || wfStatus.equals("OK with Conditions") || wfStatus.equals("Resubmittal Required") || wfStatus.equals("Approved Stock Plan")) && matches(wfProcess, lookup("BUILDING EDR WORKFLOWS", wfProcess))) {
		WTUA_AppSubmitOK();
	}
}

//  #61: true ^ TaskNote = "Updated via Script";
TaskNote = "Updated via Script";
//  #62: !matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) && matches(wfTask,"Land Use Code Compliance Review") && matches(wfStatus, "OK", "OK with Conditions","Resubmittal Required","Approved Stock Plan") ^ updateTask("Cust Svc Meter Verif","Hold","Access is needed to all units and all units must be clearly marked and identified. All Meters must be tagged with the corresponding units.  Lights and or outlets in every unit must be energized.   A valid building permit/permits must be provided at time of Meter Verification Request.  Meter Verification requests must be received at least 1 week prior to the release of the Certificate of Occupancy.   Contact Utility Services 970-224-6093.", TaskNote);
if (!matches(wfProcess, lookup("BUILDING BLD2 EDR WORKFLOWS", wfProcess))) {
	if (matches(wfTask, "Land Use Code Compliance Review") && matches(wfStatus, "OK", "OK with Conditions", "Resubmittal Required", "Approved Stock Plan")) {
		updateTask("Cust Svc Meter Verif", "Hold", "Access is needed to all units and all units must be clearly marked and identified. All Meters must be tagged with the corresponding units.  Lights and or outlets in every unit must be energized.   A valid building permit/permits must be provided at time of Meter Verification Request.  Meter Verification requests must be received at least 1 week prior to the release of the Certificate of Occupancy.   Contact Utility Services 970-224-6093.", TaskNote);
	}
}

//  #63: wfTask.equals("Application Submittal") && wfStatus.equals("Building Code Review") && appMatch("Building/*/*/*") && !matches(wfProcess,lookup("BUILDING EDR WORKFLOWS",wfProcess))  ^  activateTask("Bldg Insp Plan Review"); branch("WorkflowTaskUpdateAfter:Building:SetDatesBuildingCodeReview");
//  #64: wfTask.equals("Application Submittal") && wfStatus.equals("Building Code Review") && matches(wfProcess,lookup("BUILDING EDR WORKFLOWS",wfProcess)) ^  setTask("Land Use Code Compliance Review", "Y", "N"); setTask("Bldg Insp Plan Review", "Y", "N"); branch("WorkflowTaskUpdateAfter:Building:SetDatesBuildingCodeReview");
if (wfTask.equals("Application Submittal") && wfStatus.equals("Building Code Review")) {
	if (!matches(wfProcess, lookup("BUILDING EDR WORKFLOWS", wfProcess))) {
		activateTask("Bldg Insp Plan Review");
		WTUA_Building_SetDatesBuildingCodeReview();
	} else {
		setTask("Land Use Code Compliance Review", "Y", "N");
		setTask("Bldg Insp Plan Review", "Y", "N");
		WTUA_Building_SetDatesBuildingCodeReview();
	}
}

//  #66: (matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) || matches(wfProcess,lookup("BUILDING EDR WORKFLOWS",wfProcess)) || matches(wfProcess,lookup("BUILDING PLAN REVIEW WORKFLOWS",wfProcess))) && wfTask.equals("Application Submittal") && wfStatus.equals("OK") ^ reviewListArray = new Array(); reviewList = lookup("PLAN REVIEW - REQUIRED REVIEWS","ALL BLD"); reviewListArray = reviewList.split(","); docCatList = lookup("PLAN REVIEW - DOCUMENT CATEGORIES","BLD SFA"); docCatListArray = docCatList.split(",");  processDocsForReview(docCatListArray,reviewListArray); //activateTask("Application Submittal");
if ((matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) || matches(wfProcess,lookup("BUILDING EDR WORKFLOWS",wfProcess)) || matches(wfProcess,lookup("BUILDING PLAN REVIEW WORKFLOWS",wfProcess)))) {
	if (wfTask.equals("Application Submittal") && wfStatus.equals("OK")) {
		reviewListArray = new Array();
		reviewList = lookup("PLAN REVIEW - REQUIRED REVIEWS","ALL BLD");
		reviewListArray = reviewList.split(",");
		docCatList = lookup("PLAN REVIEW - DOCUMENT CATEGORIES","BLD SFA");
		docCatListArray = docCatList.split(",");
		processDocsForReview(docCatListArray,reviewListArray);
		//activateTask("Application Submittal");
	}
}

//  #58: appMatch("Building/New/Residential/Single Family Attached") && wfTask.equals("Application Submittal") && wfStatus.equals("OK") ^ branch("Fees: Building/New/Residential/Single Family Attached");
//  #67: appMatch("Building/New/Residential/Duplex") && wfTask.equals("Application Submittal") && wfStatus.equals("OK") ^ branch("Fees: Building/New/Residential/Duplex");
//  #68: appMatch("Building/New/Residential/Single Family Detached")  && wfTask.equals("Application Submittal") && wfStatus.equals("OK") ^  branch("Fees: Building/New/Residential/Single Family Detached")
//  #69: appMatch("Building/New/Residential/Multi-Family")  && wfTask.equals("Application Submittal") && wfStatus.equals("OK") ^  branch("Fees: Building/New/Residential/Multi-Family")
//  #70: appMatch("Building/New/Commercial/Com-Ind-Mixed-Use Building") && wfTask.equals("Application Submittal") && wfStatus.equals("OK")  ^  branch("Fees: Building/New/Commercial/Com-Ind-Mixed-Use Building")
//  #71: appMatch("Building/New/Commercial/Secondary Building") && wfTask.equals("Application Submittal") && wfStatus.equals("OK") ^  branch("Fees: Building/New/Commercial/Secondary Building");
//  #72: appMatch("Building/New/Residential/Manufactured Home") && wfTask.equals("Application Submittal") && wfStatus.equals("OK") ^ branch("Fees: Building/New/Residential/Manufactured Home")
//  #73: appMatch("Building/New/Residential/Secondary Building") && wfTask.equals("Application Submittal") && wfStatus.equals("OK") ^  branch("Fees: Building/New/Residential/Secondary Building")
if (wfTask.equals("Application Submittal") && wfStatus.equals("OK")) {
	// Fee Script
	var feeScriptName = null;
	//if (appMatch("Building/New/Commercial/*")) feeScriptName = "Fees:Building/New/Commercial/*";
	//if (appMatch("Building/New/Residential/*")) feeScriptName = "Fees:Building/New/Residential/*";
	if (appMatch("Building/New/Commercial/Com-Ind-Mixed-Use Building")) feeScriptName = "Fees:Building/New/Commercial/*";
	if (appMatch("Building/New/Commercial/Secondary Building")) feeScriptName = "Fees:Building/New/Commercial/*";
	if (appMatch("Building/New/Residential/Single Family Attached")) feeScriptName = "Fees:Building/New/Residential/*";
	if (appMatch("Building/New/Residential/Single Family Detached")) feeScriptName = "Fees:Building/New/Residential/*";
	if (appMatch("Building/New/Residential/Duplex")) feeScriptName = "Fees:Building/New/Residential/*";
	if (appMatch("Building/New/Residential/Multi-Family")) feeScriptName = "Fees:Building/New/Residential/*";
	if (appMatch("Building/New/Residential/Manufactured Home")) feeScriptName = "Fees:Building/New/Residential/*";
	if (appMatch("Building/New/Residential/Secondary Building")) feeScriptName = "Fees:Building/New/Residential/*";
	if (feeScriptName) include(feeScriptName);
}

//  #74: matches(wfProcess, "PATIO COVER") && !isTaskComplete("Building Insp Completed") && isTaskActive("Occupancy Doc Issuance") ^ deactivateTask("Occupancy Doc Issuance");
if (matches(wfProcess, "PATIO COVER") && !isTaskComplete("Building Insp Completed") && isTaskActive("Occupancy Doc Issuance")) {
	deactivateTask("Occupancy Doc Issuance");
}
//  #77: matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) ^ stdmsg = "System Generated NA based on parcel data or square footage or building use"; TaskNote = "Updated via Script";
//  #78: matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) && (wfTask == "Application Submittal" && wfStatus == "OK") && {ParcelAttribute.FLOODPLAIN} == "N" ^ closeTask("Floodplain Code Compliance Review","NA",stdmsg,TaskNote);
//  #79: matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) && wfProcess != "BLD2_DEMOLITIONS" && (wfTask == "Application Submittal" && wfStatus == "OK")  && ({ParcelAttribute.HISTORICAL DISTRICT} == null || {ParcelAttribute.HISTORICAL DISTRICT} == "" || {ParcelAttribute.HISTORICAL DISTRICT} == "None") && ({ParcelAttribute.DESIGNATED LANDMARK} == null || {ParcelAttribute.DESIGNATED LANDMARK} == "N" || {ParcelAttribute.DESIGNATED LANDMARK} =="") ^ closeTask("Historic Code Compliance Review","NA",stdmsg,TaskNote);
//  #79a: matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) && wfProcess == "BLD2_DEMOLITIONS" && (wfTask == "Application Submittal" && wfStatus == "OK")  && ({ParcelAttribute.HISTORICAL PROPERTY} == null || {ParcelAttribute.HISTORICAL PROPERTY} == "" || {ParcelAttribute.HISTORICAL PROPERTY} == "N") && ({ParcelAttribute.HISTORICAL DISTRICT} == null || {ParcelAttribute.HISTORICAL DISTRICT} == "" || {ParcelAttribute.HISTORICAL DISTRICT} == "None") && ({ParcelAttribute.DESIGNATED LANDMARK} == null || {ParcelAttribute.DESIGNATED LANDMARK} == "N" || {ParcelAttribute.DESIGNATED LANDMARK} =="") ^ closeTask("Historic Code Compliance Review","NA",stdmsg,TaskNote);
//  #80: matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) && matches(wfTask,"Floodplain Code Compliance Review", "Historic Code Compliance Review", "Land Use Code Compliance Review") && matches(wfStatus,"NA","OK","Information Needed") && (isTaskStatus("Floodplain Code Compliance Review","NA") || isTaskStatus("Floodplain Code Compliance Review","OK") || isTaskStatus("Floodplain Code Compliance Review","Information Needed")) && (isTaskStatus("Historic Code Compliance Review","NA") || isTaskStatus("Historic Code Compliance Review","OK") || isTaskStatus("Historic Code Compliance Review","Information Needed")) && (isTaskStatus("Land Use Code Compliance Review","NA") || isTaskStatus("Land Use Code Compliance Review","OK") || isTaskStatus("Land Use Code Compliance Review","Information Needed")) ^ closeTask("Initial Review Coordination","NA","Closed via script","Closed via script"); branch("WorkflowTaskUpdateAfter: AppSubmitOK");
if (matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess))) {
	stdmsg = "System Generated NA based on parcel data or square footage or building use";
	TaskNote = "Updated via Script";
	if ((wfTask == "Application Submittal" && wfStatus == "OK")) {
		if (AInfo["ParcelAttribute.FLOODPLAIN"] == "N") {
			closeTask("Floodplain Code Compliance Review","NA",stdmsg,TaskNote);
		}
		if (wfProcess != "BLD2_DEMOLITIONS" 
		&& (matches(AInfo["ParcelAttribute.HISTORICAL DISTRICT"], null,"","None")) 
		&& (matches(AInfo["ParcelAttribute.DESIGNATED LANDMARK"], null, "", "N"))) {
			closeTask("Historic Code Compliance Review","NA",stdmsg,TaskNote);
		}
		if (wfProcess == "BLD2_DEMOLITIONS" 
		&& (matches(AInfo["ParcelAttribute.HISTORICAL PROPERTY"], null, "", "N")) 
		&& (matches(AInfo["ParcelAttribute.HISTORICAL DISTRICT"], null, "", "None")) 
		&& (matches(AInfo["ParcelAttribute.DESIGNATED LANDMARK"], null, "", "N"))) {
			closeTask("Historic Code Compliance Review","NA",stdmsg,TaskNote);
		}
	}
	if (matches(wfTask,"Floodplain Code Compliance Review", "Historic Code Compliance Review", "Land Use Code Compliance Review") 
	&&  matches(wfStatus,"NA","OK","Information Needed")) {
		if ((isTaskStatus("Floodplain Code Compliance Review","NA") || isTaskStatus("Floodplain Code Compliance Review","OK") || isTaskStatus("Floodplain Code Compliance Review","Information Needed")) && (isTaskStatus("Historic Code Compliance Review","NA") || isTaskStatus("Historic Code Compliance Review","OK") || isTaskStatus("Historic Code Compliance Review","Information Needed")) && (isTaskStatus("Land Use Code Compliance Review","NA") || isTaskStatus("Land Use Code Compliance Review","OK") || isTaskStatus("Land Use Code Compliance Review","Information Needed"))) {
			closeTask("Initial Review Coordination","NA","Closed via script","Closed via script");
			WTUA_AppSubmitOK();
		}
	}
}

//  #81: ^ emailTemplate = "BUILDING_INITIAL_REVIEWS_COMPLETE"; branch("WorkflowTaskUpdateAfter:Building:AutomatedNotifications");
sendNotificationContact("BUILDING_INITIAL_REVIEWS_COMPLETE");

//  #82: matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) && wfTask == "Initial Review Coordination" && wfStatus == "Resubmittal Received" ^ branch("WorkflowTaskUpdateAfter:Building:InitialReviewCoordination"); setTask("Initial Review Coordination","N","Y");
//  #83: matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) && matches(wfTask,"Floodplain Code Compliance Review","Historic Code Compliance Review","Land Use Code Compliance Review") && wfStatus == "Resubmittal Required" ^ branch("WorkflowTaskUpdateAfter:Building:InitialReviewCoordination");
//  #84: matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess))  && !appMatch("Building/New/Residential/Stock Plan") && wfTask.equals("Land Use Code Compliance Review") && wfStatus.equals("Information Needed") ^ branch("WorkflowTaskUpdateAfter:Building:UpdateZoningReview"); //closeTask("Zoning Review","Resubmittal Required", wfComment,"Updated via script");
//  #85: matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess))  && !appMatch("Building/New/Residential/Stock Plan") && wfTask.equals("Land Use Code Compliance Review")  && wfStatus.equals("OK") ^ branch("WorkflowTaskUpdateAfter:Building:UpdateZoningReview"); updateTask("Zoning Review","OK", wfComment,"Updated via script"); setTask("Zoning Review","N","Y");
//  #86: matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) && wfTask == "Land Use Code Compliance Review" && wfStatus == "Information Needed" ^ updateTask("Zoning Review","In Progress",wfComment,"");
//  #87: matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) && wfTask == "Floodplain Code Compliance Review" && wfStatus == "Information Needed" ^ updateTask("SW Floodplain Review","In Progress",wfComment,"");
//  #87a: matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) && wfTask == "Floodplain Code Compliance Review" && wfStatus == "OK" ^ updateTask("SW Floodplain Review","OK",wfComment,"");
//  #87b: matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) && wfTask == "Floodplain Code Compliance Review" && wfStatus == "NA" ^ updateTask("SW Floodplain Review","NA",wfComment,"");
//  #88: matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) && wfTask == "Historic Code Compliance Review" && wfStatus == "Information Needed" ^ updateTask("Hist Pres Review","In Progress",wfComment,"");
//  #89: matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) && wfTask == "Initial Review Coordination" && (wfStatus == "NA" || wfStatus == "OK") ^branch("WorkflowTaskUpdateAfter:Building:AppSubmitOK");
//  #90: matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) && (wfTask == "Application Submittal" && wfStatus == "OK") ^ emailTemplate = "BUILDING_PERMIT_INITIATED"; branch("WorkflowTaskUpdateAfter:Building:AutomatedNotifications");
//  #92: matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) && wfTask == "Initial Review Coordination" && wfStatus == "Requested Resubmittal" ^ setTask("Initial Review Coordination","N","N"); branch("WorkflowTaskUpdateAfter:Building:ReviewCoordination");
if (matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess))) {
	if (wfTask == "Initial Review Coordination" && wfStatus == "Resubmittal Received") {
		WTUA_Building_InitialReviewCoordination();
		setTask("Initial Review Coordination","N","Y");
	}
	if (matches(wfTask,"Floodplain Code Compliance Review","Historic Code Compliance Review","Land Use Code Compliance Review") && wfStatus == "Resubmittal Required") {
		WTUA_Building_InitialReviewCoordination();
	}
	if (!appMatch("Building/New/Residential/Stock Plan")) {
		if (wfTask.equals("Land Use Code Compliance Review") && wfStatus.equals("Information Needed")) {
			WTUA_Building_UpdateZoningReview();
			//closeTask("Zoning Review","Resubmittal Required", wfComment,"Updated via script");
		}
		if (wfTask.equals("Land Use Code Compliance Review")  && wfStatus.equals("OK")) {
			WTUA_Building_UpdateZoningReview();
			updateTask("Zoning Review","OK", wfComment,"Updated via script");
			setTask("Zoning Review","N","Y");
		}
	}
	if (wfTask == "Land Use Code Compliance Review" && wfStatus == "Information Needed") {
		updateTask("Zoning Review","In Progress",wfComment,"");
	}
	if (wfTask == "Floodplain Code Compliance Review" && wfStatus == "Information Needed") {
		updateTask("SW Floodplain Review","In Progress",wfComment,"");
	}
	if (wfTask == "Floodplain Code Compliance Review" && wfStatus == "OK") {
		updateTask("SW Floodplain Review","OK",wfComment,"");
	}
	if (wfTask == "Floodplain Code Compliance Review" && wfStatus == "NA") {
		updateTask("SW Floodplain Review","NA",wfComment,"");
	}
	if (wfTask == "Historic Code Compliance Review" && wfStatus == "Information Needed") {
		updateTask("Hist Pres Review","In Progress",wfComment,"");
	}
	if (wfTask == "Initial Review Coordination" && matches(wfStatus,"NA","OK")) {
		WTUA_Building_AppSubmitOK();
	}
	if (wfTask == "Application Submittal" && wfStatus == "OK") {
		sendNotificationContact("BUILDING_PERMIT_INITIATED");
	}
	if (wfTask == "Initial Review Coordination" && wfStatus == "Requested Resubmittal") {
		setTask("Initial Review Coordination","N","N");
		WTUA_Building_ReviewCoordination();
	}
}

/*------------------------------------------------------------------------------------------------------/
| Supporting functions from associated EMSE standard choices
/------------------------------------------------------------------------------------------------------*/
function DeactivateTaskBLDReviews() { // From Standard Choice: ApplicationSubmit:DeactivateTask
	logDebug("DeactivateTaskBLDReviews");
	// #01: true  ^  stdmsg = "System Generated NA.  Task not applicable unless activated by Dept"; TaskNote = "Updated via Script";
	// #02: matches(currentUserID,"MHELVICK","KKREISHER","CPROBASCO","JGUEST") ^ showDebug = 3;
	stdmsg = "System Generated NA.  Task not applicable unless activated by Dept";
	TaskNote = "Updated via Script";

	// #03: appMatch("Building/Addition/Commercial/NA")  ^  closeTask("NonCity WWW Final","NA",stdmsg,TaskNote); closeTask("NonCity WWW Fee Review","NA",stdmsg,TaskNote); closeTask("SW Eng Final","NA",stdmsg,TaskNote); closeTask("WWW Gen Backflow Final","NA",stdmsg,TaskNote); closeTask("Zoning Final","NA",stdmsg,TaskNote);
	// #04: appMatch("Building/Addition/Residential/NA")  ^  closeTask("NonCity WWW Fee Review","NA", stdmsg,TaskNote); closeTask("SW Eng Final","NA", stdmsg ,TaskNote);
	// #05: appMatch("Building/Alteration/Commercial/General") || appMatch("Building/Alteration/Commercial/CFB") ^  closeTask("NonCity WWW Fee Review","NA",stdmsg,TaskNote); closeTask("SW Eng Final","NA",stdmsg,TaskNote); closeTask("SW Eng Review","NA",stdmsg,TaskNote); closeTask("SW Erosion Final","NA",stdmsg,TaskNote); closeTask("SW Erosion Review","NA",stdmsg,TaskNote); closeTask("SW Fee Review","NA",stdmsg,TaskNote); closeTask("WWW Gen Backflow Final","NA",stdmsg ,TaskNote);  closeTask("NonCity WWW Final","NA",stdmsg,TaskNote); closeTask("Water Meters Final","NA",stdmsg ,TaskNote);
	// #06: appMatch("Building/Alteration/Commercial/General")  && {Photovoltaic System} == "Yes" ^  closeTask("WWW Fee Review","NA",stdmsg,TaskNote);
	// #07: appMatch("Building/Alteration/Commercial/General")  && {Photovoltaic System} != "Yes" ^  closeTask("Utilities Energy Review","NA",stdmsg,TaskNote);
	// #08: appMatch("Building/Alteration/Residential/General")   ^  closeTask("NonCity WWW Fee Review","NA",stdmsg,TaskNote); closeTask("SW Eng Final","NA",stdmsg,TaskNote); closeTask("SW Eng Review","NA",stdmsg,TaskNote); closeTask("SW Fee Review","NA",stdmsg,TaskNote);
	// #09: appMatch("Building/Alteration/Residential/General")  && {Photovoltaic System} == "Yes" ^  closeTask("WWW Fee Review","NA",stdmsg,TaskNote);
	// #10: appMatch("Building/Alteration/Residential/General")  && {Photovoltaic System} != "Yes" ^  closeTask("Utilities Energy Review","NA",stdmsg,TaskNote);
	// #11: appMatch("Building/Alteration/Commercial/Minor")  ^  closeTask("SW Eng Final","NA",stdmsg,TaskNote); closeTask("Zoning Final","NA",stdmsg,TaskNote); closeTask("SW Eng Review","NA",stdmsg,TaskNote); closeTask("SW Fee Review","NA",stdmsg,TaskNote); closeTask("Engineering Final","NA",stdmsg,TaskNote); closeTask("Fire Authority Review","NA",stdmsg,TaskNote); closeTask("WWW Gen Backflow Final","NA",stdmsg,TaskNote);
	// #12: appMatch("Building/New/Residential/Secondary Building")  ^  closeTask("Zoning Final","NA",stdmsg,TaskNote);  closeTask("NonCity WWW Fee Review","NA",stdmsg,TaskNote); closeTask("Nat Res Review","NA",stdmsg,TaskNote); closeTask("SW Erosion Final","NA",stdmsg,TaskNote); closeTask("SW Erosion Review","NA",stdmsg,TaskNote);
	// #13: appMatch("Building/Alteration/Residential/Minor")  ^  closeTask("SW Erosion Review","NA",stdmsg,TaskNote); closeTask("Zoning Final","NA",stdmsg,TaskNote); closeTask("SW Eng Review","NA",stdmsg,TaskNote); closeTask("SW Fee Review","NA",stdmsg,TaskNote); closeTask("SW Eng Final","NA",stdmsg,TaskNote); closeTask("SW Erosion Final","NA",stdmsg,TaskNote);
	// #14: appMatch("Building/Minor Permit/Demolition/NA")  ^  closeTask("SW Eng Review","NA",stdmsg,TaskNote); closeTask("Zoning Final","NA",stdmsg,TaskNote); closeTask("SW Eng Final","NA",stdmsg,TaskNote); closeTask("SW Erosion Final","NA",stdmsg,TaskNote);
	// #15: appMatch("Building/New/Commercial/Com-Ind-Mixed-Use Building")  ^  closeTask("NonCity WWW Final","NA",stdmsg,TaskNote); closeTask("NonCity WWW Fee Review","NA",stdmsg,TaskNote); closeTask("WWW Eng Review","NA",stdmsg,TaskNote); closeTask("WWW Gen Backflow Final","NA",stdmsg,TaskNote); closeTask("Nat Res Review","NA",stdmsg,TaskNote);
	// #16: appMatch("Building/New/Residential/Single Family Detached")  ^  closeTask("WWW Gen Backflow Final","NA",stdmsg,TaskNote); closeTask("NonCity WWW Final","NA",stdmsg,TaskNote); closeTask("NonCity WWW Fee Review","NA",stdmsg,TaskNote); closeTask("Nat Res Review","NA",stdmsg,TaskNote); closeTask("SW Erosion Final","NA",stdmsg,TaskNote); closeTask("WWW Eng Review","NA",stdmsg,TaskNote); closeTask("SW Eng Review","NA",stdmsg,TaskNote); closeTask("Fire Authority Final","NA",stdmsg,TaskNote); closeTask("Fire Authority Review","NA",stdmsg,TaskNote);
	// #17: appMatch("Building/New/Residential/Manufactured Home")  ^  closeTask("WWW Gen Backflow Final","NA",stdmsg,TaskNote); closeTask("NonCity WWW Fee Review","NA",stdmsg,TaskNote); closeTask("Nat Res Review","NA",stdmsg,TaskNote); closeTask("SW Erosion Final","NA", stdmsg,TaskNote); closeTask("WWW Eng Review","NA",stdmsg,TaskNote); closeTask("SW Eng Review","NA",stdmsg,TaskNote); closeTask("SW Erosion Review","NA",stdmsg,TaskNote);
	// #18: appMatch("Building/Minor Permit/Commercial/Electrical") ^ closeTask("Fire Authority Review","NA",stdmsg,TaskNote);
	// #19: appMatch("Building/Minor Permit/Commercial/Mechanical") ^ closeTask("Fire Authority Review","NA",stdmsg,TaskNote); closeTask("Fire Authority Final","NA",stdmsg,TaskNote); closeTask("Zoning Final","NA",stdmsg,TaskNote);
	// #20: appMatch("Building/Minor Permit/Commercial/Plumbing") ^ closeTask("Fire Authority Review","NA",stdmsg,TaskNote); closeTask("WWW Gen Backflow Final","NA",stdmsg,TaskNote);
	// #21: appMatch("Building/Minor Permit/Commercial/Water Heater") ^ closeTask("Fire Authority Review","NA",stdmsg,TaskNote);
	// #22: appMatch("Building/Minor Permit/Change Of Use/NA") ^ closeTask("Engineering Final","NA",stdmsg,TaskNote);
	// #23: appMatch("Building/New/Residential/Single Family Attached")  ^  closeTask("NonCity WWW Final","NA",stdmsg ,TaskNote); closeTask("NonCity WWW Fee Review","NA",stdmsg ,TaskNote); closeTask("Fire Authority Final","NA",stdmsg ,TaskNote); closeTask("Fire Authority Review","NA",stdmsg ,TaskNote); closeTask("WWW Gen Backflow Final","NA",stdmsg ,TaskNote); closeTask("SW Erosion Final","NA", stdmsg ,TaskNote); closeTask("Nat Res Review","NA",stdmsg ,TaskNote); closeTask("WWW Backflow Review","NA",stdmsg ,TaskNote);
	// #24: appMatch("Building/New/Residential/Duplex")  ^  closeTask("NonCity WWW Final","NA",stdmsg,TaskNote); closeTask("NonCity WWW Fee Review","NA",stdmsg,TaskNote); closeTask("WWW Gen Backflow Final","NA",stdmsg ,TaskNote); closeTask("SW Erosion Final","NA",stdmsg ,TaskNote); closeTask("Fire Authority Final","NA",stdmsg ,TaskNote); closeTask("Fire Authority Review","NA",stdmsg ,TaskNote); closeTask("Nat Res Review","NA",stdmsg ,TaskNote); closeTask("WWW Backflow Review","NA",stdmsg ,TaskNote);
	// #25: appMatch("Building/New/Residential/Multi-Family")  ^  closeTask("NonCity WWW Final","NA",stdmsg,TaskNote); closeTask("NonCity WWW Fee Review","NA",stdmsg,TaskNote); closeTask("Nat Res Review","NA",stdmsg,TaskNote);  closeTask("SW Erosion Final","NA",stdmsg,TaskNote); closeTask("WWW Gen Backflow Final","NA",stdmsg,TaskNote);
	// #26: appMatch("Building/OTC/Residential/Roofing - Re-roofing")  ^  closeTask("Bldg Insp Plan Review","NA",stdmsg,TaskNote);
	// #27: appMatch("Building/Minor Permit/Fence/NA")  ^  closeTask("SW Eng Review","NA",stdmsg,TaskNote);
	// #28: appMatch("Building/New/Residential/Boarding House Attached")  ^  closeTask("Fire Authority Final","NA",stdmsg,TaskNote);  closeTask("Fire Authority Review","NA",stdmsg,TaskNote); closeTask("Nat Res Review","NA",stdmsg,TaskNote); closeTask("NonCity WWW Fee Review","NA",stdmsg,TaskNote); closeTask("SW Erosion Final","NA",stdmsg,TaskNote); closeTask("SW Erosion Review","NA",stdmsg,TaskNote);
	// #29: appMatch("Building/New/Residential/Boarding House Detached")  ^  closeTask("Nat Res Review","NA",stdmsg,TaskNote); closeTask("NonCity WWW Fee Review","NA",stdmsg,TaskNote); closeTask("SW Eng Review","NA",stdmsg,TaskNote); closeTask("SW Erosion Final","NA",stdmsg,TaskNote); closeTask("SW Erosion Review","NA",stdmsg,TaskNote); closeTask("WWW Eng Review","NA",stdmsg,TaskNote); closeTask("WWW Gen Backflow Final","NA",stdmsg,TaskNote);
	// #30: appMatch("Building/New/Commercial/Secondary Building")  ^  closeTask("NonCity WWW Fee Review","NA",stdmsg,TaskNote); closeTask("WWW Backflow Review","NA",stdmsg,TaskNote); closeTask("Street Oversizing Review","NA",stdmsg,TaskNote); closeTask("Electric Eng Review","NA",stdmsg,TaskNote);
	// #31: appMatch("Building/Minor Permit/New Mobile Home/NA")  ^  closeTask("NonCity WWW Fee Review","NA",stdmsg,TaskNote);  closeTask("SW Erosion Review","NA",stdmsg,TaskNote);
	// #32: appMatch("Building/Minor Permit/Commercial/Pool")  ^  closeTask("NonCity WWW Fee Review","NA",stdmsg,TaskNote); closeTask("Fire Authority Review","NA",stdmsg,TaskNote);
	// #33: appMatch("Building/Minor Permit/Sales Trailer/NA")  ^  closeTask("NonCity WWW Fee Review","NA",stdmsg,TaskNote);
	// #34: appMatch("Building/Minor Permit/Commercial/Sprinkler")  ^  closeTask("NonCity WWW Fee Review","NA",stdmsg,TaskNote);
	// #35: appMatch("Building/OTC/Residential/Basement Finish")  ^  closeTask("Fire Authority Final","NA",stdmsg,TaskNote);
	if (appMatch("Building/Addition/Commercial/NA")) {
		closeTask("NonCity WWW Final", "NA", stdmsg, TaskNote);
		closeTask("NonCity WWW Fee Review", "NA", stdmsg, TaskNote);
		closeTask("SW Eng Final", "NA", stdmsg, TaskNote);
		closeTask("WWW Gen Backflow Final", "NA", stdmsg, TaskNote);
		closeTask("Zoning Final", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/Addition/Residential/NA")) {
		closeTask("NonCity WWW Fee Review", "NA", stdmsg, TaskNote);
		closeTask("SW Eng Final", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/Alteration/Commercial/General") || appMatch("Building/Alteration/Commercial/CFB")) {
		closeTask("NonCity WWW Fee Review", "NA", stdmsg, TaskNote);
		closeTask("SW Eng Final", "NA", stdmsg, TaskNote);
		closeTask("SW Eng Review", "NA", stdmsg, TaskNote);
		closeTask("SW Erosion Final", "NA", stdmsg, TaskNote);
		closeTask("SW Erosion Review", "NA", stdmsg, TaskNote);
		closeTask("SW Fee Review", "NA", stdmsg, TaskNote);
		closeTask("WWW Gen Backflow Final", "NA", stdmsg, TaskNote);
		closeTask("NonCity WWW Final", "NA", stdmsg, TaskNote);
		closeTask("Water Meters Final", "NA", stdmsg, TaskNote);
		if (appMatch("Building/Alteration/Commercial/General")) {
			if (AInfo["Photovoltaic System"] == "Yes") {
				closeTask("WWW Fee Review", "NA", stdmsg, TaskNote);
			} else {
				closeTask("Utilities Energy Review", "NA", stdmsg, TaskNote);
			}
		}
	} else if (appMatch("Building/Alteration/Residential/General")) {
		closeTask("NonCity WWW Fee Review", "NA", stdmsg, TaskNote);
		closeTask("SW Eng Final", "NA", stdmsg, TaskNote);
		closeTask("SW Eng Review", "NA", stdmsg, TaskNote);
		closeTask("SW Fee Review", "NA", stdmsg, TaskNote);
		if (appMatch("Building/Alteration/Commercial/General")) {
			if (AInfo["Photovoltaic System"] == "Yes") {
				closeTask("WWW Fee Review", "NA", stdmsg, TaskNote);
			} else {
				closeTask("Utilities Energy Review", "NA", stdmsg, TaskNote);
			}
		}
	} else if (appMatch("Building/Alteration/Commercial/Minor")) {
		closeTask("SW Eng Final", "NA", stdmsg, TaskNote);
		closeTask("Zoning Final", "NA", stdmsg, TaskNote);
		closeTask("SW Eng Review", "NA", stdmsg, TaskNote);
		closeTask("SW Fee Review", "NA", stdmsg, TaskNote);
		closeTask("Engineering Final", "NA", stdmsg, TaskNote);
		closeTask("Fire Authority Review", "NA", stdmsg, TaskNote);
		closeTask("WWW Gen Backflow Final", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/New/Residential/Secondary Building")) {
		closeTask("Zoning Final", "NA", stdmsg, TaskNote);
		closeTask("NonCity WWW Fee Review", "NA", stdmsg, TaskNote);
		closeTask("Nat Res Review", "NA", stdmsg, TaskNote);
		closeTask("SW Erosion Final", "NA", stdmsg, TaskNote);
		closeTask("SW Erosion Review", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/Alteration/Residential/Minor")) {
		closeTask("SW Erosion Review", "NA", stdmsg, TaskNote);
		closeTask("Zoning Final", "NA", stdmsg, TaskNote);
		closeTask("SW Eng Review", "NA", stdmsg, TaskNote);
		closeTask("SW Fee Review", "NA", stdmsg, TaskNote);
		closeTask("SW Eng Final", "NA", stdmsg, TaskNote);
		closeTask("SW Erosion Final", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/Minor Permit/Demolition/NA")) {
		closeTask("SW Eng Review", "NA", stdmsg, TaskNote);
		closeTask("Zoning Final", "NA", stdmsg, TaskNote);
		closeTask("SW Eng Final", "NA", stdmsg, TaskNote);
		closeTask("SW Erosion Final", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/New/Commercial/Com-Ind-Mixed-Use Building")) {
		closeTask("NonCity WWW Final", "NA", stdmsg, TaskNote);
		closeTask("NonCity WWW Fee Review", "NA", stdmsg, TaskNote);
		closeTask("WWW Eng Review", "NA", stdmsg, TaskNote);
		closeTask("WWW Gen Backflow Final", "NA", stdmsg, TaskNote);
		closeTask("Nat Res Review", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/New/Residential/Single Family Detached")) {
		closeTask("WWW Gen Backflow Final", "NA", stdmsg, TaskNote);
		closeTask("NonCity WWW Final", "NA", stdmsg, TaskNote);
		closeTask("NonCity WWW Fee Review", "NA", stdmsg, TaskNote);
		closeTask("Nat Res Review", "NA", stdmsg, TaskNote);
		closeTask("SW Erosion Final", "NA", stdmsg, TaskNote);
		closeTask("WWW Eng Review", "NA", stdmsg, TaskNote);
		closeTask("SW Eng Review", "NA", stdmsg, TaskNote);
		closeTask("Fire Authority Final", "NA", stdmsg, TaskNote);
		closeTask("Fire Authority Review", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/New/Residential/Manufactured Home")) {
		closeTask("WWW Gen Backflow Final", "NA", stdmsg, TaskNote);
		closeTask("NonCity WWW Fee Review", "NA", stdmsg, TaskNote);
		closeTask("Nat Res Review", "NA", stdmsg, TaskNote);
		closeTask("SW Erosion Final", "NA", stdmsg, TaskNote);
		closeTask("WWW Eng Review", "NA", stdmsg, TaskNote);
		closeTask("SW Eng Review", "NA", stdmsg, TaskNote);
		closeTask("SW Erosion Review", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/Minor Permit/Commercial/Electrical")) {
		closeTask("Fire Authority Review", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/Minor Permit/Commercial/Mechanical")) {
		closeTask("Fire Authority Review", "NA", stdmsg, TaskNote);
		closeTask("Fire Authority Final", "NA", stdmsg, TaskNote);
		closeTask("Zoning Final", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/Minor Permit/Commercial/Plumbing")) {
		closeTask("Fire Authority Review", "NA", stdmsg, TaskNote);
		closeTask("WWW Gen Backflow Final", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/Minor Permit/Commercial/Water Heater")) {
		closeTask("Fire Authority Review", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/Minor Permit/Change Of Use/NA")) {
		closeTask("Engineering Final", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/New/Residential/Single Family Attached")) {
		closeTask("NonCity WWW Final", "NA", stdmsg, TaskNote);
		closeTask("NonCity WWW Fee Review", "NA", stdmsg, TaskNote);
		closeTask("Fire Authority Final", "NA", stdmsg, TaskNote);
		closeTask("Fire Authority Review", "NA", stdmsg, TaskNote);
		closeTask("WWW Gen Backflow Final", "NA", stdmsg, TaskNote);
		closeTask("SW Erosion Final", "NA", stdmsg, TaskNote);
		closeTask("Nat Res Review", "NA", stdmsg, TaskNote);
		closeTask("WWW Backflow Review", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/New/Residential/Duplex")) {
		closeTask("NonCity WWW Final", "NA", stdmsg, TaskNote);
		closeTask("NonCity WWW Fee Review", "NA", stdmsg, TaskNote);
		closeTask("WWW Gen Backflow Final", "NA", stdmsg, TaskNote);
		closeTask("SW Erosion Final", "NA", stdmsg, TaskNote);
		closeTask("Fire Authority Final", "NA", stdmsg, TaskNote);
		closeTask("Fire Authority Review", "NA", stdmsg, TaskNote);
		closeTask("Nat Res Review", "NA", stdmsg, TaskNote);
		closeTask("WWW Backflow Review", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/New/Residential/Multi-Family")) {
		closeTask("NonCity WWW Final", "NA", stdmsg, TaskNote);
		closeTask("NonCity WWW Fee Review", "NA", stdmsg, TaskNote);
		closeTask("Nat Res Review", "NA", stdmsg, TaskNote);
		closeTask("SW Erosion Final", "NA", stdmsg, TaskNote);
		closeTask("WWW Gen Backflow Final", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/OTC/Residential/Roofing - Re-roofing")) {
		closeTask("Bldg Insp Plan Review", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/Minor Permit/Fence/NA")) {
		closeTask("SW Eng Review", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/New/Residential/Boarding House Attached")) {
		closeTask("Fire Authority Final", "NA", stdmsg, TaskNote);
		closeTask("Fire Authority Review", "NA", stdmsg, TaskNote);
		closeTask("Nat Res Review", "NA", stdmsg, TaskNote);
		closeTask("NonCity WWW Fee Review", "NA", stdmsg, TaskNote);
		closeTask("SW Erosion Final", "NA", stdmsg, TaskNote);
		closeTask("SW Erosion Review", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/New/Residential/Boarding House Detached")) {
		closeTask("Nat Res Review", "NA", stdmsg, TaskNote);
		closeTask("NonCity WWW Fee Review", "NA", stdmsg, TaskNote);
		closeTask("SW Eng Review", "NA", stdmsg, TaskNote);
		closeTask("SW Erosion Final", "NA", stdmsg, TaskNote);
		closeTask("SW Erosion Review", "NA", stdmsg, TaskNote);
		closeTask("WWW Eng Review", "NA", stdmsg, TaskNote);
		closeTask("WWW Gen Backflow Final", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/New/Commercial/Secondary Building")) {
		closeTask("NonCity WWW Fee Review", "NA", stdmsg, TaskNote);
		closeTask("WWW Backflow Review", "NA", stdmsg, TaskNote);
		closeTask("Street Oversizing Review", "NA", stdmsg, TaskNote);
		closeTask("Electric Eng Review", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/Minor Permit/New Mobile Home/NA")) {
		closeTask("NonCity WWW Fee Review", "NA", stdmsg, TaskNote);
		closeTask("SW Erosion Review", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/Minor Permit/Commercial/Pool")) {
		closeTask("NonCity WWW Fee Review", "NA", stdmsg, TaskNote);
		closeTask("Fire Authority Review", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/Minor Permit/Sales Trailer/NA")) {
		closeTask("NonCity WWW Fee Review", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/Minor Permit/Commercial/Sprinkler")) {
		closeTask("NonCity WWW Fee Review", "NA", stdmsg, TaskNote);
	} else if (appMatch("Building/OTC/Residential/Basement Finish")) {
		closeTask("Fire Authority Final", "NA", stdmsg, TaskNote);
	}
}

function ASA_Subdivision() { // From Standard Choice: ApplicationSubmit:Subdivision
	logDebug("ASA_Subdivision");
	// ApplicationSubmit:Subdivision #01: true  ^  showDebug = false ; showMessage = false ;subdivapp = null ; subdivname = null ; ptasks = new Array();
	// ApplicationSubmit:Subdivision #02: true  ^  subdivapp = lookup("SubdivisionXref",{Subdivision Name})
	// ApplicationSubmit:Subdivision #03: subdivapp != null  ^  comment("subdivapp is " + subdivapp)
	// ApplicationSubmit:Subdivision #04: subdivapp != null  ^  addParent(subdivapp) ; ptasks = loadTasks(subdivapp)
	// ApplicationSubmit:Subdivision #05: true  ^  comment("ptasks has " + ptasks.length + " elements")
	// ApplicationSubmit:Subdivision #06: ptasks["Fire Authority Review"] && ptasks["Fire Authority Review"].status =="Hold"  ^  activateTask("Fire Authority Review") ; updateTask("Fire Authority Review","Hold",ptasks["Fire Authority Review"].comment,"")
	// ApplicationSubmit:Subdivision #07: ptasks["Electric Fee Review"] && ptasks["Electric Fee Review"].status =="Hold"  ^  activateTask("Electric Fee Review") ; updateTask("Electric Fee Review","Hold",ptasks["Electric Fee Review"].comment,"")
	// ApplicationSubmit:Subdivision #08: ptasks["Fire Authority Final"] && ptasks["Fire Authority Final"].status =="Hold"  ^  activateTask("Fire Authority Final") ; updateTask("Fire Authority Final","Hold",ptasks["Fire Authority Final"].comment,"")
	// ApplicationSubmit:Subdivision #09: ptasks["SW Erosion Review"] && ptasks["SW Erosion Review"].status =="Hold"  ^  activateTask("SW Erosion Review") ; updateTask("SW Erosion Review","Hold",ptasks["SW Erosion Review"].comment,"")
	// ApplicationSubmit:Subdivision #10: ptasks["SW Erosion Final"] && ptasks["SW Erosion Final"].status =="Hold"  ^  activateTask("SW Erosion Final") ; updateTask("SW Erosion Final","Hold",ptasks["SW Erosion Final"].comment,"")
	// ApplicationSubmit:Subdivision #11: ptasks["Engineering Final"] && ptasks["Engineering Final"].status =="Hold"  ^  activateTask("Engineering Final") ; updateTask("Engineering Final","Hold",ptasks["Engineering Final"].comment,"")
	// ApplicationSubmit:Subdivision #12: ptasks["Engineering Review"] && ptasks["Engineering Review"].status =="Hold"  ^  activateTask("Engineering Review") ; updateTask("Engineering Review","Hold",ptasks["Engineering Review"].comment,"")
	// ApplicationSubmit:Subdivision #13: ptasks["Nat Res Review"] && ptasks["Nat Res Review"].status =="Hold"  ^  activateTask("Nat Res Review") ; updateTask("Nat Res Review","Hold",ptasks["Nat Res Review"].comment,"")
	// ApplicationSubmit:Subdivision #14: ptasks["WWW Fee Review"] && ptasks["WWW Fee Review"].status =="Hold"  ^  activateTask("WWW Fee Review") ; updateTask("WWW Fee Review","Hold",ptasks["WWW Fee Review"].comment,"")
	// ApplicationSubmit:Subdivision #15: ptasks["SW Eng Review"] && ptasks["SW Eng Review"].status =="Hold"  ^  activateTask("SW Eng Review") ; updateTask("SW Eng Review","Hold",ptasks["SW Eng Review"].comment,"")
	// ApplicationSubmit:Subdivision #16: ptasks["SW Eng Final"] && ptasks["SW Eng Final"].status =="Hold"  ^  activateTask("SW Eng Final") ; updateTask("SW Eng Final","Hold",ptasks["SW Eng Final"].comment,"")
	// ApplicationSubmit:Subdivision #17: ptasks["WWW Gen Backflow Final"] && ptasks["WWW Gen Backflow Final"].status =="Hold"  ^  activateTask("WWW Gen Backflow Final") ; updateTask("WWW Gen Backflow Final","Hold",ptasks["WWW Gen Backflow Final"].comment,"")
	// ApplicationSubmit:Subdivision #18: ptasks["WWW Eng Review"] && ptasks["WWW Eng Review"].status =="Hold"  ^  activateTask("WWW Eng Review") ; updateTask("WWW Eng Review","Hold",ptasks["WWW Eng Review"].comment,"")
	// ApplicationSubmit:Subdivision #19: ptasks["NonCity WWW Fee Review"] && ptasks["NonCity WWW Fee Review"].status =="Hold"  ^  activateTask("NonCity WWW Fee Review") ; updateTask("NonCity WWW Fee Review","Hold",ptasks["NonCity WWW Fee Review"].comment,"")
	// ApplicationSubmit:Subdivision #20: ptasks["Zoning Review"] && ptasks["Zoning Review"].status =="Hold"  ^  activateTask("Zoning Review") ; updateTask("Zoning Review","Hold",ptasks["Zoning Review"].comment,"")
	// ApplicationSubmit:Subdivision #21: ptasks["Zoning Final"] && ptasks["Zoning Final"].status =="Hold"  ^  activateTask("Zoning Final") ; updateTask("Zoning Final","Hold",ptasks["Zoning Final"].comment,"")
	showDebug = false;
	showMessage = false;
	subdivapp = null;
	subdivname = null;
	ptasks = new Array();
	subdivapp = lookup("SubdivisionXref", AInfo["Subdivision Name"]);
	if (subdivapp != null) {
		comment("subdivapp is " + subdivapp);
	}
	if (subdivapp != null) {
		addParent(subdivapp);
		ptasks = loadTasks(subdivapp);
	}
	comment("ptasks has " + ptasks.length + " elements");
	var rTaskNames = ["Electric Fee Review", "NonCity WWW Fee Review", "WWW Fee Review", "Engineering Review", "Engineering Final",
		"Fire Authority Review", "Fire Authority Final", "Nat Res Review", "SW Erosion Review", "SW Erosion Final", "SW Eng Review", "SW Eng Final",
		"WWW Gen Backflow Final", "WWW Eng Review", "Zoning Review", "Zoning Final"];
	for (var tt in rTaskNames) {
		var pTaskName = rTaskNames[tt];
		logDebug("Examining parent task: " + pTaskName)
		if (ptasks[pTaskName] && ptasks[pTaskName].status == "Hold") {
			activateTask(pTaskName);
			updateTask(pTaskName, ptasks[pTaskName].status, ptasks[pTaskName].comment, "");
		}
    }
}

function DUA_Contact_Notification_CheckIn() { // From Standard Choice: DocumentUploadAfter:Contact Notification CheckIn (Does not exist)
	logDebug("DUA_Contact_Notification_CheckIn");
	// This standard choice does not exist but is referenced:
	// WorkflowTaskUpdateAfter #53: appMatch("Building/New/*/*") && wfTask.equals("Document Check In") && (wfStatus.equals("Approved") || wfStatus.equals("Resubmittal Required")) ^ branch("DocumentUploadAfter:Contact Notification CheckIn");
}

function WTUA_AppSubmitOK() { // From Standard Choice: WorkflowTaskUpdateAfter: AppSubmitOK
	logDebug("WTUA_AppSubmitOK");
	//  #01: true  ^  stdmsg = "System Generated NA based on parcel data or square footage or building use"; TaskNote = "Updated via Script";
	//  #02: matches(currentUserID,"MHELVICK","KKREISHER","CPROBASCO","JGUEST") ^ showDebug = 3;
	stdmsg = "System Generated NA based on parcel data or square footage or building use";
	TaskNote = "Updated via Script";
	// ----------
	//  #03: appMatch("Building/Addition/*/*") && {ParcelAttribute.FLOODPLAIN} == "N"  ^  closeTask("SW Floodplain Review","NA",stdmsg,TaskNote) ; closeTask("SW Floodplain Final","NA",stdmsg,TaskNote)
	//  #04: appMatch("Building/Addition/*/*") && ({ParcelAttribute.HISTORICAL PROPERTY} == null || {ParcelAttribute.HISTORICAL PROPERTY} == "" || {ParcelAttribute.HISTORICAL PROPERTY} == "N") && ({ParcelAttribute.HISTORICAL DISTRICT} == null || {ParcelAttribute.HISTORICAL DISTRICT} == "" || {ParcelAttribute.HISTORICAL DISTRICT} == "None")   ^   closeTask("Hist Pres Review","NA",stdmsg,TaskNote)
	//  #05: appMatch("Building/Addition/Commercial/NA") && ({Res Sq Ft Added} == "" ? 0 : parseInt({Res Sq Ft Added})) + ({Com Sq Ft Added} == "" ? 0 : parseInt({Com Sq Ft Added})) + ({Ind Sq Ft Added} == "" ? 0 : parseInt({Ind Sq Ft Added})) < 350 ^   closeTask("SW Fee Review","NA",stdmsg,TaskNote) ;  closeTask("SW Eng Review","NA",stdmsg,TaskNote)
	//  #06: appMatch("Building/Addition/Commercial/NA") && {Auto Repair or Auto Service} !=  "Yes"  && {Food Service, Day Care or Institution} != "Yes"  ^  closeTask("WWW Traps Review","NA",stdmsg,TaskNote)
	//  #07: appMatch("Building/Addition/Commercial/NA") && {Food Service, Day Care or Institution} !=  "Yes"  ^   closeTask("Health Dept Review","NA",stdmsg,TaskNote)
	//  #08: appMatch("Building/Addition/Residential/NA") && {Res Sq Ft Added} < 350 ^  closeTask("SW Eng Review","NA",stdmsg,TaskNote) ; closeTask("SW Fee Review","NA",stdmsg,TaskNote)
	if (appMatch("Building/Addition/*/*")) {
		if (AInfo["ParcelAttribute.FLOODPLAIN"] == "N") {
			closeTask("SW Floodplain Review", "NA", stdmsg, TaskNote);
			closeTask("SW Floodplain Final", "NA", stdmsg, TaskNote);
		}
		if (matches(AInfo["ParcelAttribute.HISTORICAL PROPERTY"], null, "", "N")
			&& (matches(AInfo["ParcelAttribute.HISTORICAL DISTRICT"], null, "", "None"))) {
			closeTask("Hist Pres Review", "NA", stdmsg, TaskNote);
		}
		if (appMatch("Building/Addition/Commercial/NA")) {
			if ((AInfo["Res Sq Ft Added"] == "" ? 0 : parseInt(AInfo["Res Sq Ft Added"])) + (AInfo["Com Sq Ft Added"] == "" ? 0 : parseInt(AInfo["Com Sq Ft Added"])) + (AInfo["Ind Sq Ft Added"] == "" ? 0 : parseInt(AInfo["Ind Sq Ft Added"])) < 350) {
				closeTask("SW Fee Review", "NA", stdmsg, TaskNote);
				closeTask("SW Eng Review", "NA", stdmsg, TaskNote);
			}
			if (AInfo["Auto Repair or Auto Service"] != "Yes" && AInfo["Food Service, Day Care or Institution"] != "Yes") {
				closeTask("WWW Traps Review", "NA", stdmsg, TaskNote);
			}
			if (AInfo["Food Service, Day Care or Institution"] != "Yes") {
				closeTask("Health Dept Review", "NA", stdmsg, TaskNote);
			}
		}
		if (appMatch("Building/Addition/Residential/NA") && AInfo["Res Sq Ft Added"] < 350) {
			closeTask("SW Eng Review", "NA", stdmsg, TaskNote);
			closeTask("SW Fee Review", "NA", stdmsg, TaskNote);
		}
	} else if (appMatch("Building/Alteration/*/*")) {
		//  #09: appMatch("Building/Alteration/*/*") && {ParcelAttribute.FLOODPLAIN} == "N"  ^  closeTask("SW Floodplain Review","NA",stdmsg,TaskNote) ; closeTask("SW Floodplain Final","NA",stdmsg,TaskNote)
		//  #10: appMatch("Building/Alteration/*/*") && ({ParcelAttribute.HISTORICAL PROPERTY} == null || {ParcelAttribute.HISTORICAL PROPERTY} == "" || {ParcelAttribute.HISTORICAL PROPERTY} == "N") && ({ParcelAttribute.HISTORICAL DISTRICT} == null || {ParcelAttribute.HISTORICAL DISTRICT} == "" || {ParcelAttribute.HISTORICAL DISTRICT} == "None")   ^   closeTask("Hist Pres Review","NA",stdmsg,TaskNote)
		//  #11: appMatch("Building/Alteration/Commercial/*") && {Auto Repair or Auto Service} !=  "Yes"  && {Food Service, Day Care or Institution} != "Yes"  ^   closeTask("WWW Traps Review","NA",stdmsg,TaskNote)
		//  #12: appMatch("Building/Alteration/Commercial/*") && {Food Service, Day Care or Institution} !=  "Yes"  ^   closeTask("Health Dept Review","NA",stdmsg,TaskNote)
		//  #52: appMatch("Building/Alteration/Commercial/General") && ({Change of Use} == null || {Change of Use} == "" || {Change of Use} == "No")  ^ closeTask("Street Oversizing Review","NA","NA unless Change of Use",TaskNote) ; closeTask("Zoning Final","NA","NA unless Change of Use",TaskNote) ; closeTask("Engineering Final","NA","NA unless Change of Use", TaskNote)
		//  #54: appMatch("Building/Alteration/Residential/General") && ({Change of Use} == null || {Change of Use} == TaskNote || {Change of Use} == "No")  ^ closeTask("Zoning Final","NA","NA unless Change of Use",TaskNote)
		//  #55: appMatch("Building/Alteration/Commercial/CFB") && ({Change of Use} == null || {Change of Use} == TaskNote || {Change of Use} == "No")  ^ closeTask("Street Oversizing Review","NA","NA unless Change of Use",TaskNote) ; closeTask("Zoning Final","NA","NA unless Change of Use",TaskNote) ; closeTask("Engineering Final","NA","NA unless Change of Use",TaskNote)
		if (AInfo["ParcelAttribute.FLOODPLAIN"] == "N") {
			closeTask("SW Floodplain Review", "NA", stdmsg, TaskNote);
			closeTask("SW Floodplain Final", "NA", stdmsg, TaskNote);
		}
		if (matches(AInfo["ParcelAttribute.HISTORICAL PROPERTY"], null, "", "N")
			&& (matches(AInfo["ParcelAttribute.HISTORICAL DISTRICT"], null, "", "None"))) {
			closeTask("Hist Pres Review", "NA", stdmsg, TaskNote);
		}
		if (appMatch("Building/Alteration/Commercial/*")) {
			if (AInfo["Auto Repair or Auto Service"] != "Yes" && AInfo["Food Service, Day Care or Institution"] != "Yes") {
				closeTask("WWW Traps Review", "NA", stdmsg, TaskNote);
			}
			if (AInfo["Food Service, Day Care or Institution"] != "Yes") {
				closeTask("Health Dept Review", "NA", stdmsg, TaskNote);
			}
			if (appMatch("Building/Alteration/Commercial/General") && (matches(AInfo["Change of Use"], null, "", "No"))) {
				closeTask("Street Oversizing Review", "NA", "NA unless Change of Use", TaskNote);
				closeTask("Zoning Final", "NA", "NA unless Change of Use", TaskNote);
				closeTask("Engineering Final", "NA", "NA unless Change of Use", TaskNote);
			}
			if (appMatch("Building/Alteration/Commercial/CFB") && (matches(AInfo["Change of Use"], null, TaskNote, "No"))) {
				closeTask("Street Oversizing Review", "NA", "NA unless Change of Use", TaskNote);
				closeTask("Zoning Final", "NA", "NA unless Change of Use", TaskNote);
				closeTask("Engineering Final", "NA", "NA unless Change of Use", TaskNote);
			}
		}
		if (appMatch("Building/Alteration/Residential/General") && (matches(AInfo["Change of Use"], null, TaskNote, "No"))) {
			closeTask("Zoning Final", "NA", "NA unless Change of Use", TaskNote);
		}
	} else if (appMatch("Building/Minor Permit/*/*")) {
		//  #13: appMatch("Building/Minor Permit/Awning/NA") && ({ParcelAttribute.HISTORICAL PROPERTY} == null || {ParcelAttribute.HISTORICAL PROPERTY} == "" || {ParcelAttribute.HISTORICAL PROPERTY} == "N") && ({ParcelAttribute.HISTORICAL DISTRICT} == null || {ParcelAttribute.HISTORICAL DISTRICT} == "" || {ParcelAttribute.HISTORICAL DISTRICT} == "None")   ^   closeTask("Hist Pres Review","NA",stdmsg,TaskNote)
		//  #14: appMatch("Building/Minor Permit/Change Of Use/NA") && ({Change of Occupancy} == null || {Change of Occupancy} == "" || {Change of Occupancy} == "No")  ^  closeTask("Fire Authority Review","NA",stdmsg,TaskNote) ; closeTask("Bldg Insp Plan Review","NA",stdmsg,TaskNote) ; closeTask("Fire Authority Final","NA",stdmsg,TaskNote) ; closeTask("Bldg Dept Req Docs Rcvd","NA",stdmsg,TaskNote)
		//  #15: appMatch("Building/Minor Permit/Change Of Use/NA") && ({Change of Use} == null || {Change of Use} == "" || {Change of Use} == "No")  ^  closeTask("Zoning Review","NA",stdmsg,TaskNote) ; closeTask("Zoning Final","NA",stdmsg,TaskNote)
		//  #16: appMatch("Building/Minor Permit/Commercial/Electrical") && {Food Service, Day Care or Institution} != "Yes"  ^   closeTask("WWW Traps Review","NA",stdmsg,TaskNote) ; closeTask("Health Dept Review","NA",stdmsg,TaskNote)
		//  #17: appMatch("Building/Minor Permit/Commercial/Mechanical") && {Food Service, Day Care or Institution} != "Yes"  ^   closeTask("WWW Traps Review","NA",stdmsg,TaskNote) ; closeTask("Health Dept Review","NA",stdmsg,TaskNote)
		//  #18: appMatch("Building/Minor Permit/Commercial/Plumbing") && {Food Service, Day Care or Institution} != "Yes"  ^   closeTask("WWW Traps Review","NA",stdmsg,TaskNote) ; closeTask("Health Dept Review","NA",stdmsg,TaskNote)
		//  #19: appMatch("Building/Minor Permit/Commercial/Pool") && {ParcelAttribute.FLOODPLAIN} == "N"  ^  closeTask("SW Floodplain Review","NA",stdmsg,TaskNote)
		//  #20: appMatch("Building/Minor Permit/Commercial/Pool") && ({ParcelAttribute.HISTORICAL PROPERTY} == null || {ParcelAttribute.HISTORICAL PROPERTY} == "" || {ParcelAttribute.HISTORICAL PROPERTY} == "N") && ({ParcelAttribute.HISTORICAL DISTRICT} == null || {ParcelAttribute.HISTORICAL DISTRICT} == ""|| {ParcelAttribute.HISTORICAL DISTRICT} == "None")   ^   closeTask("Hist Pres Review","NA",stdmsg,TaskNote)
		//  #21: appMatch("Building/Minor Permit/Commercial/Pool") && {Food Service, Day Care or Institution} != "Yes"  ^   closeTask("WWW Traps Review","NA",stdmsg,TaskNote) ; closeTask("Health Dept Review","NA",stdmsg,TaskNote)
		//  #22: appMatch("Building/Minor Permit/Commercial/Pool") && {Res Sq Ft Added} < 350 ^  closeTask("SW Fee Review","NA",stdmsg,TaskNote)
		//  #23: appMatch("Building/Minor Permit/Commercial/Roofing - Re-roofing") && ({ParcelAttribute.HISTORICAL PROPERTY} == null || {ParcelAttribute.HISTORICAL PROPERTY} == "" || {ParcelAttribute.HISTORICAL PROPERTY} == "N") && ({ParcelAttribute.HISTORICAL DISTRICT} == null || {ParcelAttribute.HISTORICAL DISTRICT} == ""|| {ParcelAttribute.HISTORICAL DISTRICT} == "None")   ^   closeTask("Hist Pres Review","NA",stdmsg,TaskNote)
		//  #24: appMatch("Building/Minor Permit/Commercial/Water Heater") && {Food Service, Day Care or Institution} != "Yes"  ^   closeTask("WWW Traps Review","NA",stdmsg,TaskNote) ; closeTask("Health Dept Review","NA",stdmsg,TaskNote)
		//  #25: appMatch("Building/Minor Permit/Deck/NA") && {ParcelAttribute.FLOODPLAIN} == "N"  ^  closeTask("SW Floodplain Review","NA",stdmsg,TaskNote)
		//  #26: appMatch("Building/Minor Permit/Deck/NA") && ({ParcelAttribute.HISTORICAL PROPERTY} == null || {ParcelAttribute.HISTORICAL PROPERTY} == "" || {ParcelAttribute.HISTORICAL PROPERTY} == "N") && ({ParcelAttribute.HISTORICAL DISTRICT} == null || {ParcelAttribute.HISTORICAL DISTRICT} == "" || {ParcelAttribute.HISTORICAL DISTRICT} == "None")   ^   closeTask("Hist Pres Review","NA",stdmsg,TaskNote)
		//  #27: appMatch("Building/Minor Permit/Deck/NA") && {Res Sq Ft Added} < 350 ^  closeTask("SW Fee Review","NA",stdmsg,TaskNote)
		//  #28: appMatch("Building/Minor Permit/Demolition/NA") && {ParcelAttribute.FLOODPLAIN} == "N"  ^  closeTask("SW Floodplain Review","NA",stdmsg,TaskNote) ; closeTask("SW Floodplain Final","NA",stdmsg,TaskNote)
		//  #29: appMatch("Building/Minor Permit/Demolition/NA") && ({ParcelAttribute.HISTORICAL PROPERTY} == null || {ParcelAttribute.HISTORICAL PROPERTY} == "" || {ParcelAttribute.HISTORICAL PROPERTY} == "N") && ({ParcelAttribute.HISTORICAL DISTRICT} == null || {ParcelAttribute.HISTORICAL DISTRICT} == "" || {ParcelAttribute.HISTORICAL DISTRICT} == "None")   ^   closeTask("Hist Pres Review","NA",stdmsg,TaskNote)
		//  #30: appMatch("Building/Minor Permit/Fence/NA") && {ParcelAttribute.FLOODPLAIN} == "N"  ^  closeTask("SW Floodplain Review","NA",stdmsg,TaskNote)
		//  #31: appMatch("Building/Minor Permit/New Mobile Home/NA") && {ParcelAttribute.FLOODPLAIN} == "N"  ^  closeTask("SW Floodplain Review","NA",stdmsg,TaskNote) ; closeTask("SW Floodplain Final","NA",stdmsg,TaskNote)
		//  #32: appMatch("Building/Minor Permit/Patio Cover/NA") && {ParcelAttribute.FLOODPLAIN} == "N"  ^  closeTask("SW Floodplain Review","NA",stdmsg,TaskNote); closeTask("SW Floodplain Final","NA",stdmsg,TaskNote);
		//  #33: appMatch("Building/Minor Permit/Patio Cover/NA") && ({ParcelAttribute.HISTORICAL PROPERTY} == null || {ParcelAttribute.HISTORICAL PROPERTY} == "" || {ParcelAttribute.HISTORICAL PROPERTY} == "N") && ({ParcelAttribute.HISTORICAL DISTRICT} == null || {ParcelAttribute.HISTORICAL DISTRICT} == "" || {ParcelAttribute.HISTORICAL DISTRICT} == "None")   ^   closeTask("Hist Pres Review","NA",stdmsg,TaskNote)
		//  #34: appMatch("Building/Minor Permit/Residential/Pool") && {ParcelAttribute.FLOODPLAIN} == "N"  ^  closeTask("SW Floodplain Review","NA",stdmsg,TaskNote)
		//  #35: appMatch("Building/Minor Permit/Residential/Pool") && ({ParcelAttribute.HISTORICAL PROPERTY} == null || {ParcelAttribute.HISTORICAL PROPERTY} == "" || {ParcelAttribute.HISTORICAL PROPERTY} == "N") && ({ParcelAttribute.HISTORICAL DISTRICT} == null || {ParcelAttribute.HISTORICAL DISTRICT} == "" || {ParcelAttribute.HISTORICAL DISTRICT} == "None")   ^   closeTask("Hist Pres Review","NA",stdmsg,TaskNote)
		//  #36: appMatch("Building/Minor Permit/Residential/Pool") && {Res Sq Ft Added} < 350  ^  closeTask("SW Fee Review","NA",stdmsg,TaskNote)
		//  #37: appMatch("Building/Minor Permit/Sign/NA") && {ParcelAttribute.FLOODPLAIN} == "N"  ^  closeTask("SW Floodplain Review","NA",stdmsg,TaskNote)
		//  #38: appMatch("Building/Minor Permit/Sign/NA") && ({ParcelAttribute.HISTORICAL PROPERTY} == null || {ParcelAttribute.HISTORICAL PROPERTY} == "" || {ParcelAttribute.HISTORICAL PROPERTY} == "N") && ({ParcelAttribute.HISTORICAL DISTRICT} == null || {ParcelAttribute.HISTORICAL DISTRICT} == "" || {ParcelAttribute.HISTORICAL DISTRICT} == "None")   ^   closeTask("Hist Pres Review","NA",stdmsg,TaskNote)
		//  #39: appMatch("Building/Minor Permit/Storage Shed/NA") && {ParcelAttribute.FLOODPLAIN} == "N"  ^  closeTask("SW Floodplain Review","NA",stdmsg,TaskNote)
		//  #40: appMatch("Building/Minor Permit/Storage Shed/NA") && {Res Sq Ft Added} < 350 ^  closeTask("SW Eng Review","NA",stdmsg,TaskNote) ; closeTask("SW Fee Review","NA",stdmsg,TaskNote)
		//  #41: appMatch("Building/Minor Permit/Temporary Structure/NA") && {ParcelAttribute.FLOODPLAIN} == "N"  ^  closeTask(" SW Floodplain Review","NA",stdmsg,TaskNote)
		if (appMatch("Building/Minor Permit/Awning/NA")) {
			if (matches(AInfo["ParcelAttribute.HISTORICAL PROPERTY"], null, "", "N") && matches(AInfo["ParcelAttribute.HISTORICAL DISTRICT"], null, "", "None")) {
				closeTask("Hist Pres Review", "NA", stdmsg, TaskNote);
			}
		} else if (appMatch("Building/Minor Permit/Change Of Use/NA")) {
			if (matches(AInfo["Change of Occupancy"], null, "", "No")) {
				closeTask("Fire Authority Review", "NA", stdmsg, TaskNote);
				closeTask("Bldg Insp Plan Review", "NA", stdmsg, TaskNote);
				closeTask("Fire Authority Final", "NA", stdmsg, TaskNote);
				closeTask("Bldg Dept Req Docs Rcvd", "NA", stdmsg, TaskNote);
			}
			if (matches(AInfo["Change of Use"], null, "", "No")) {
				closeTask("Zoning Review", "NA", stdmsg, TaskNote);
				closeTask("Zoning Final", "NA", stdmsg, TaskNote);
			}
		} else if (appMatch("Building/Minor Permit/Commercial/*")) {
			if (appMatch("Building/Minor Permit/Commercial/Electrical")
				|| appMatch("Building/Minor Permit/Commercial/Mechanical")
				|| appMatch("Building/Minor Permit/Commercial/Plumbing")) {
				if (AInfo["Food Service, Day Care or Institution"] != "Yes") {
					closeTask("WWW Traps Review", "NA", stdmsg, TaskNote);
					closeTask("Health Dept Review", "NA", stdmsg, TaskNote);
				}
			} else if (appMatch("Building/Minor Permit/Commercial/Pool")) {
				if (AInfo["ParcelAttribute.FLOODPLAIN"] == "N") {
					closeTask("SW Floodplain Review", "NA", stdmsg, TaskNote);
				}
				if (matches(AInfo["ParcelAttribute.HISTORICAL PROPERTY"], null, "", "N") && matches(AInfo["ParcelAttribute.HISTORICAL DISTRICT"], null, "", "None")) {
					closeTask("Hist Pres Review", "NA", stdmsg, TaskNote);
				}
				if (AInfo["Food Service, Day Care or Institution"] != "Yes") {
					closeTask("WWW Traps Review", "NA", stdmsg, TaskNote);
					closeTask("Health Dept Review", "NA", stdmsg, TaskNote);
				}
				if (AInfo["Res Sq Ft Added"] < 350) {
					closeTask("SW Fee Review", "NA", stdmsg, TaskNote);
				}
			} else if (appMatch("Building/Minor Permit/Commercial/Roofing - Re-roofing")) {
				if (matches(AInfo["ParcelAttribute.HISTORICAL PROPERTY"], null, "", "N") && matches(AInfo["ParcelAttribute.HISTORICAL DISTRICT"], null, "", "None")) {
					closeTask("Hist Pres Review", "NA", stdmsg, TaskNote);
				}
			} else if (appMatch("Building/Minor Permit/Commercial/Water Heater")) {
				if (AInfo["Food Service, Day Care or Institution"] != "Yes") {
					closeTask("WWW Traps Review", "NA", stdmsg, TaskNote);
					closeTask("Health Dept Review", "NA", stdmsg, TaskNote);
				}
			}
		} else if (appMatch("Building/Minor Permit/Deck/NA")) {
			if (AInfo["ParcelAttribute.FLOODPLAIN"] == "N") {
				closeTask("SW Floodplain Review", "NA", stdmsg, TaskNote);
			}
			if (matches(AInfo["ParcelAttribute.HISTORICAL PROPERTY"], null, "", "N") && (matches(AInfo["ParcelAttribute.HISTORICAL DISTRICT"], null, "", "None"))) {
				closeTask("Hist Pres Review", "NA", stdmsg, TaskNote);
			}
			if (AInfo["Res Sq Ft Added"] < 350) {
				closeTask("SW Fee Review", "NA", stdmsg, TaskNote);
			}
		} else if (appMatch("Building/Minor Permit/Demolition/NA")) {
			if (["ParcelAttribute.FLOODPLAIN"] == "N") {
				closeTask("SW Floodplain Review", "NA", stdmsg, TaskNote);
				closeTask("SW Floodplain Final", "NA", stdmsg, TaskNote);
			}
		} else if (appMatch("Building/Minor Permit/Demolition/NA")) {
			if (matches(AInfo["ParcelAttribute.HISTORICAL PROPERTY"], null, "", "N") && (matches(AInfo["ParcelAttribute.HISTORICAL DISTRICT"], null, "", "None"))) {
				closeTask("Hist Pres Review", "NA", stdmsg, TaskNote);
			}
		} else if (appMatch("Building/Minor Permit/Fence/NA")) {
			if (["ParcelAttribute.FLOODPLAIN"] == "N") {
				closeTask("SW Floodplain Review", "NA", stdmsg, TaskNote);
			}
		} else if (appMatch("Building/Minor Permit/New Mobile Home/NA")) {
			if (["ParcelAttribute.FLOODPLAIN"] == "N") {
				closeTask("SW Floodplain Review", "NA", stdmsg, TaskNote);
				closeTask("SW Floodplain Final", "NA", stdmsg, TaskNote);
			}
		} else if (appMatch("Building/Minor Permit/Patio Cover/NA")) {
			if (["ParcelAttribute.FLOODPLAIN"] == "N") {
				closeTask("SW Floodplain Review", "NA", stdmsg, TaskNote);
				closeTask("SW Floodplain Final", "NA", stdmsg, TaskNote);
			}
			if (matches(AInfo["ParcelAttribute.HISTORICAL PROPERTY"], null, "", "N") && (matches(AInfo["ParcelAttribute.HISTORICAL DISTRICT"], null, "", "None"))) {
				closeTask("Hist Pres Review", "NA", stdmsg, TaskNote);
			}
		} else if (appMatch("Building/Minor Permit/Residential/Pool")) {
			if (["ParcelAttribute.FLOODPLAIN"] == "N") {
				closeTask("SW Floodplain Review", "NA", stdmsg, TaskNote);
			}
			if (matches(AInfo["ParcelAttribute.HISTORICAL PROPERTY"], null, "", "N") && (matches(AInfo["ParcelAttribute.HISTORICAL DISTRICT"], null, "", "None"))) {
				closeTask("Hist Pres Review", "NA", stdmsg, TaskNote);
			}
			if (AInfo["Res Sq Ft Added"] < 350) {
				closeTask("SW Fee Review", "NA", stdmsg, TaskNote);
			}
		} else if (appMatch("Building/Minor Permit/Sign/NA")) {
			if (["ParcelAttribute.FLOODPLAIN"] == "N") {
				closeTask("SW Floodplain Review", "NA", stdmsg, TaskNote);
			}
			if (matches(AInfo["ParcelAttribute.HISTORICAL PROPERTY"], null, "", "N") && (matches(AInfo["ParcelAttribute.HISTORICAL DISTRICT"], null, "", "None"))) {
				closeTask("Hist Pres Review", "NA", stdmsg, TaskNote);
			}
		} else if (appMatch("Building/Minor Permit/Storage Shed/NA")) {
			if (["ParcelAttribute.FLOODPLAIN"] == "N") {
				closeTask("SW Floodplain Review", "NA", stdmsg, TaskNote);
			}
			if (AInfo["Res Sq Ft Added"] < 350) {
				closeTask("SW Eng Review", "NA", stdmsg, TaskNote);
				closeTask("SW Fee Review", "NA", stdmsg, TaskNote);
			}
		} else if (appMatch("Building/Minor Permit/Temporary Structure/NA")) {
			if (["ParcelAttribute.FLOODPLAIN"] == "N") {
				closeTask("SW Floodplain Review", "NA", stdmsg, TaskNote);
			}
		}
	} else if (appMatch("Building/New/Commercial/Com-Ind-Mixed-Use Building")) {
		//  #43: appMatch("Building/New/Commercial/Com-Ind-Mixed-Use Building") && ({ParcelAttribute.HISTORICAL PROPERTY} == null || {ParcelAttribute.HISTORICAL PROPERTY} == "" || {ParcelAttribute.HISTORICAL PROPERTY} == "N") && ({ParcelAttribute.HISTORICAL DISTRICT} == null || {ParcelAttribute.HISTORICAL DISTRICT} == "" || {ParcelAttribute.HISTORICAL DISTRICT} == "None")   ^   closeTask("Hist Pres Review","NA",stdmsg,TaskNote)
		//  #44: appMatch("Building/New/Commercial/Com-Ind-Mixed-Use Building") && {Auto Repair or Auto Service} !=  "Yes"  && {Food Service, Day Care or Institution} != "Yes"  ^   closeTask("WWW Traps Review","NA",stdmsg,TaskNote)
		//  #45: appMatch("Building/New/Commercial/Com-Ind-Mixed-Use Building") && {Food Service, Day Care or Institution} != "Yes"  ^   closeTask("Health Dept Review","NA",stdmsg,TaskNote)
		if (AInfo["ParcelAttribute.FLOODPLAIN"] == "N") {
			closeTask("SW Floodplain Review", "NA", stdmsg, TaskNote);
			closeTask("SW Floodplain Final", "NA", stdmsg, TaskNote);
		}
		if (matches(AInfo["ParcelAttribute.HISTORICAL PROPERTY"], null, "", "N") && matches(AInfo["ParcelAttribute.HISTORICAL DISTRICT"], null, "", "None")) {
			closeTask("Hist Pres Review", "NA", stdmsg, TaskNote);
		}
		if (AInfo["Auto Repair or Auto Service"] != "Yes" && AInfo["Food Service, Day Care or Institution"] != "Yes") {
			closeTask("WWW Traps Review", "NA", stdmsg, TaskNote);
		}
		if (AInfo["Food Service, Day Care or Institution"] != "Yes") {
			closeTask("Health Dept Review", "NA", stdmsg, TaskNote);
		}
	} else if (appMatch("Building/New/Commercial/Secondary Building")) {
		//  #61: appMatch("Building/New/Commercial/Secondary Building") && {ParcelAttribute.FLOODPLAIN} == "N"  ^  closeTask("SW Floodplain Review","NA",stdmsg,TaskNote) ; closeTask("SW Floodplain Final","NA",stdmsg,TaskNote)
		//  #62: appMatch("Building/New/Commercial/Secondary Building") && ({ParcelAttribute.HISTORICAL PROPERTY} == null || {ParcelAttribute.HISTORICAL PROPERTY} == "" || {ParcelAttribute.HISTORICAL PROPERTY} == "N") && ({ParcelAttribute.HISTORICAL DISTRICT} == null || {ParcelAttribute.HISTORICAL DISTRICT} == "" || {ParcelAttribute.HISTORICAL DISTRICT} == "None")   ^   closeTask("Hist Pres Review","NA",stdmsg,TaskNote)
		if (AInfo["ParcelAttribute.FLOODPLAIN"] == "N") {
			closeTask("SW Floodplain Review", "NA", stdmsg, TaskNote);
			closeTask("SW Floodplain Final", "NA", stdmsg, TaskNote);
		}
		if (matches(AInfo["ParcelAttribute.HISTORICAL PROPERTY"], null, "", "N") && matches(AInfo["ParcelAttribute.HISTORICAL DISTRICT"], null, "", "None")) {
			closeTask("Hist Pres Review", "NA", stdmsg, TaskNote);
		}
	} else if (appMatch("Building/New/Residential/*")) {
		//  #46: appMatch("Building/New/Residential/*") && {ParcelAttribute.FLOODPLAIN} == "N"  ^  closeTask("SW Floodplain Review","NA",stdmsg,TaskNote) ; closeTask("SW Floodplain Final","NA",stdmsg,TaskNote)
		//  #47: appMatch("Building/New/Residential/*") && ({ParcelAttribute.HISTORICAL PROPERTY} == null || {ParcelAttribute.HISTORICAL PROPERTY} == "" || {ParcelAttribute.HISTORICAL PROPERTY} == "N") && ({ParcelAttribute.HISTORICAL DISTRICT} == null || {ParcelAttribute.HISTORICAL DISTRICT} == "" || {ParcelAttribute.HISTORICAL DISTRICT} == "None") && ({ParcelAttribute.DESIGNATED LANDMARK} == null || {ParcelAttribute.DESIGNATED LANDMARK} == "N" || {ParcelAttribute.DESIGNATED LANDMARK} =="")  ^   closeTask("Hist Pres Review","NA",stdmsg,TaskNote)
		//  #48: appMatch("Building/New/Residential/Secondary Building") && {Res Sq Ft Added} < 350 ^  closeTask("SW Eng Review","NA",stdmsg,TaskNote) ; closeTask("SW Eng Final","NA",stdmsg,TaskNote) ; closeTask("SW Fee Review","NA",stdmsg,TaskNote)
		if (appMatch("Building/New/Residential/*") && AInfo["ParcelAttribute.FLOODPLAIN"] == "N") {
			closeTask("SW Floodplain Review", "NA", stdmsg, TaskNote);
			closeTask("SW Floodplain Final", "NA", stdmsg, TaskNote);
		}
		if (appMatch("Building/New/Residential/*") && matches(AInfo["ParcelAttribute.HISTORICAL PROPERTY"], null, "", "N") && (matches(AInfo["ParcelAttribute.HISTORICAL DISTRICT"], null, "", "None")) && (AInfo["ParcelAttribute.DESIGNATED LANDMARK"] == null || AInfo["ParcelAttribute.DESIGNATED LANDMARK"] == "N" || AInfo["ParcelAttribute.DESIGNATED LANDMARK"] == "")) {
			closeTask("Hist Pres Review", "NA", stdmsg, TaskNote);
		}
		if (appMatch("Building/New/Residential/Secondary Building") && AInfo["Res Sq Ft Added"] < 350) {
			closeTask("SW Eng Review", "NA", stdmsg, TaskNote);
			closeTask("SW Eng Final", "NA", stdmsg, TaskNote);
			closeTask("SW Fee Review", "NA", stdmsg, TaskNote);
		}
	} else if (appMatch("Building/OTC/Residential/*")) {
		//  #49: appMatch("Building/OTC/Residential/Basement Finish") && {ParcelAttribute.FLOODPLAIN} == "N"  ^  closeTask("SW Floodplain Review","NA",stdmsg,TaskNote)
		//  #50: appMatch("Building/OTC/Residential/Mobile Home Installation") && {ParcelAttribute.FLOODPLAIN} == "N"  ^  closeTask("SW Floodplain Review","NA",stdmsg,TaskNote) ; closeTask("SW Floodplain Final","NA",stdmsg,TaskNote)
		//  #51: appMatch("Building/OTC/Residential/Roofing - Re-roofing") && ({ParcelAttribute.HISTORICAL PROPERTY} == null || {ParcelAttribute.HISTORICAL PROPERTY} == "" || {ParcelAttribute.HISTORICAL PROPERTY} == "N") && ({ParcelAttribute.HISTORICAL DISTRICT} == null || {ParcelAttribute.HISTORICAL DISTRICT} == "" || {ParcelAttribute.HISTORICAL DISTRICT} == "None")   ^   closeTask("Hist Pres Review","NA",stdmsg,TaskNote)
		if (appMatch("Building/OTC/Residential/Basement Finish") && AInfo["ParcelAttribute.FLOODPLAIN"] == "N") {
			closeTask("SW Floodplain Review", "NA", stdmsg, TaskNote);
		}
		if (appMatch("Building/OTC/Residential/Mobile Home Installation") && AInfo["ParcelAttribute.FLOODPLAIN"] == "N") {
			closeTask("SW Floodplain Review", "NA", stdmsg, TaskNote);
			closeTask("SW Floodplain Final", "NA", stdmsg, TaskNote);
		}
		if (appMatch("Building/OTC/Residential/Roofing - Re-roofing")
			&& (matches(AInfo["ParcelAttribute.HISTORICAL PROPERTY"], null, "", "N"))
			&& (matches(AInfo["ParcelAttribute.HISTORICAL DISTRICT"], null, "", "None"))) {
			closeTask("Hist Pres Review", "NA", stdmsg, TaskNote);
		}
	}

	//  #53: appMatch("Building/*/*/*")  ^ editTaskSpecific("Street Oversizing Review","Com Sq Ft",{Com Sq Ft Added}); editTaskSpecific("Street Oversizing Review","Ind Sq Ft",{Ind Sq Ft Added}); editTaskSpecific("Street Oversizing Review","Res Sq Ft",{Res Sq Ft Added})
	if (appMatch("Building/*/*/*")) {
		editTaskSpecific("Street Oversizing Review", "Com Sq Ft", AInfo["Com Sq Ft Added"]);
		editTaskSpecific("Street Oversizing Review", "Ind Sq Ft", AInfo["Ind Sq Ft Added"]);
		editTaskSpecific("Street Oversizing Review", "Res Sq Ft", AInfo["Res Sq Ft Added"]);
	}
	//  #57: true ^ capAddr = aa.address.getAddressByCapId(capId).getOutput();
	//  #58: capAddr.length ^ capAddrString = capAddr[0].getHouseNumberStart() + " " + capAddr[0].getStreetName() + " " + capAddr[0].getStreetSuffix()
	//  #59: true ^ DescOfWork = workDescGet(capId);
	//  #60: appMatch("Building/Alteration/*/General")  && {Photovoltaic System} == "Yes" ^ email("kkreisher@fcgov.com; kkreisher@fcgov.com; kkreisher@fcgov.com; kkreisher@fcgov.com; kkreisher@fcgov.com; kkreisher@fcgov.com; kkreisher@fcgov.com; kkreisher@fcgov.com","Auto_Sender@Accela.com","Application Submitted for PhotoVoltaic Permit at " + capAddrString, "Permit # " + capIDString +  " at " + capAddrString +  " has an active Utilities Energy review task.       The description of work for this permit is as follows:  " + DescOfWork);
	capAddr = aa.address.getAddressByCapId(capId).getOutput();
	if (capAddr.length) {
		capAddrString = capAddr[0].getHouseNumberStart() + " " + capAddr[0].getStreetName() + " " + capAddr[0].getStreetSuffix();
	}
	DescOfWork = workDescGet(capId);
	if (appMatch("Building/Alteration/*/General") && AInfo["Photovoltaic System"] == "Yes") {
		email("kkreisher@fcgov.com; kkreisher@fcgov.com; kkreisher@fcgov.com; kkreisher@fcgov.com; kkreisher@fcgov.com; kkreisher@fcgov.com; kkreisher@fcgov.com; kkreisher@fcgov.com", "Auto_Sender@Accela.com", "Application Submitted for PhotoVoltaic Permit at " + capAddrString, "Permit # " + capIDString + " at " + capAddrString + " has an active Utilities Energy review task.       The description of work for this permit is as follows:  " + DescOfWork);
	}
}

function WTUA_Building() { // From Standard Choice: WorkflowTaskUpdateAfter:Building
	logDebug("WTUA_Building");
	//  #02: true ^ capAddr = aa.address.getAddressByCapId(capId).getOutput();
	//  #03: capAddr.length ^ capAddrString = capAddr[0].getHouseNumberStart() + " " + capAddr[0].getStreetName() + " " + capAddr[0].getStreetSuffix()
	//  #04: {WWW District} != null && {WWW District} != "" ^ WaterDistrict = {WWW District} ^ WaterDistrict = 'Non-City';
	//  #05: {Water Tap Size} != null && {Water Tap Size} != "" ^ WaterTapSize = {Water Tap Size} ^ WaterTapSize = 'Tap size not entered for this permit';
	//  #06: matches(wfProcess, "SINGLE FAMILY ATTACHED-DUPLEX", "MULTI-FAMILY", "COM-IND-MIXED-USE BUILDING", "SINGLE FAMILY DETACHED")  && wfTask.equals("WWW Fee Review") && wfStatus.equals("OK") && {WWW District} != "FC/Loveland Water District - IGA" ^ updateTask("Water Meters Final", "Hold", "Hold for final inspection and installation of water meter.  Contact Water Metering Division at 970-221-6759 during normal business hours from 7:30am to 3:30pm, Monday through Friday.",""); editTaskDueDate("Water Meters Final", dateAdd(null,0));
	//  #07: (wfTask.equals("WWW Fee Review") && wfStatus.equals("NA")) || (wfTask.equals("WWW Fee Review") && wfStatus.equals("OK") && {WWW District} == "FC/Loveland Water District - IGA") ^ closeTask("Water Meters Final", "NA", "See Non-City Water comments",""); activateTask("NonCity WWW Fee Review"); updateTask("NonCity WWW Fee Review", "Hold", "Hold for " + WaterDistrict  + " memo for permit release",""); editTaskDueDate("NonCity WWW Fee Review", dateAdd(null,0)); activateTask("NonCity WWW Final"); updateTask("NonCity WWW Final", "Hold", "Hold for " + WaterDistrict + " letters",""); editTaskDueDate("NonCity WWW Final", dateAdd(null,0));
	//  #08: wfTask.equals("NonCity WWW Fee Review") && wfStatus.equals("Hold") && !isTaskActive("NonCity WWW Final") ^ activateTask("NonCity WWW Final"); updateTask("NonCity WWW Final", "Hold", "Hold for " + WaterDistrict + " letters",""); editTaskDueDate("NonCity WWW Final", dateAdd(null,0))
	capAddr = aa.address.getAddressByCapId(capId).getOutput();
	if (capAddr.length) {
		capAddrString = capAddr[0].getHouseNumberStart() + " " + capAddr[0].getStreetName() + " " + capAddr[0].getStreetSuffix();
	}
	if (AInfo["WWW District"] != null && AInfo["WWW District"] != "") {
		WaterDistrict = AInfo["WWW District"];
	} else {
		WaterDistrict = 'Non-City';
	}
	if (AInfo["Water Tap Size"] != null && AInfo["Water Tap Size"] != "") {
		WaterTapSize = AInfo["Water Tap Size"];
	} else {
		WaterTapSize = 'Tap size not entered for this permit';
	}
	if (matches(wfProcess, "SINGLE FAMILY ATTACHED-DUPLEX", "MULTI-FAMILY", "COM-IND-MIXED-USE BUILDING", "SINGLE FAMILY DETACHED") && wfTask.equals("WWW Fee Review") && wfStatus.equals("OK") && AInfo["WWW District"] != "FC/Loveland Water District - IGA") {
		updateTask("Water Meters Final", "Hold", "Hold for final inspection and installation of water meter.  Contact Water Metering Division at 970-221-6759 during normal business hours from 7:30am to 3:30pm, Monday through Friday.", "");
		editTaskDueDate("Water Meters Final", dateAdd(null, 0));
	}
	if ((wfTask.equals("WWW Fee Review") && wfStatus.equals("NA")) || (wfTask.equals("WWW Fee Review") && wfStatus.equals("OK") && AInfo["WWW District"] == "FC/Loveland Water District - IGA")) {
		closeTask("Water Meters Final", "NA", "See Non-City Water comments", "");
		activateTask("NonCity WWW Fee Review");
		updateTask("NonCity WWW Fee Review", "Hold", "Hold for " + WaterDistrict + " memo for permit release", "");
		editTaskDueDate("NonCity WWW Fee Review", dateAdd(null, 0));
		activateTask("NonCity WWW Final");
		updateTask("NonCity WWW Final", "Hold", "Hold for " + WaterDistrict + " letters", "");
		editTaskDueDate("NonCity WWW Final", dateAdd(null, 0));
	}
	if (wfTask.equals("NonCity WWW Fee Review") && wfStatus.equals("Hold") && !isTaskActive("NonCity WWW Final")) {
		activateTask("NonCity WWW Final");
		updateTask("NonCity WWW Final", "Hold", "Hold for " + WaterDistrict + " letters", "");
		editTaskDueDate("NonCity WWW Final", dateAdd(null, 0));
	}
	//  #11: matches(wfProcess, "COMMERCIAL MECHANICAL") && (wfTask == "Bldg Dept Req Docs Rcvd" && wfStatus == "OK" || wfTask == "Bldg Dept Req Docs Rcvd" && wfStatus == "NA") && allTasksComplete("COMMERCIAL MECHANICAL") ^ updateAppStatus("Completed", "Status auto-updated from workflow");
	//  #12: matches(wfProcess, "COMMERCIAL MECHANICAL") && (wfTask == "Fire Authority Final" && wfStatus == "OK" || wfTask == "Fire Authority Final" && wfStatus == "NA") && allTasksComplete("COMMERCIAL MECHANICAL") ^ updateAppStatus("Completed", "Status auto-updated from workflow");
	//  #13: matches(wfProcess, "COMMERCIAL MECHANICAL") && (wfTask == "Zoning Final" && wfStatus == "OK" || wfTask == "Zoning Final" && wfStatus == "NA") && allTasksComplete("COMMERCIAL MECHANICAL") ^ updateAppStatus("Completed", "Status auto-updated from workflow");
	if (matches(wfProcess, "COMMERCIAL MECHANICAL") && (wfTask == "Bldg Dept Req Docs Rcvd" && wfStatus == "OK" || wfTask == "Bldg Dept Req Docs Rcvd" && wfStatus == "NA") && allTasksComplete("COMMERCIAL MECHANICAL")) {
		updateAppStatus("Completed", "Status auto-updated from workflow");
	}
	if (matches(wfProcess, "COMMERCIAL MECHANICAL") && (wfTask == "Fire Authority Final" && wfStatus == "OK" || wfTask == "Fire Authority Final" && wfStatus == "NA") && allTasksComplete("COMMERCIAL MECHANICAL")) {
		updateAppStatus("Completed", "Status auto-updated from workflow");
	}
	if (matches(wfProcess, "COMMERCIAL MECHANICAL") && (wfTask == "Zoning Final" && wfStatus == "OK" || wfTask == "Zoning Final" && wfStatus == "NA") && allTasksComplete("COMMERCIAL MECHANICAL")) {
		updateAppStatus("Completed", "Status auto-updated from workflow");
	}
	//  #18: appMatch("Building/*/*/*") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && ({Bldg Insp Plan Review} == "CHECKED" || {Updated.Bldg Insp Plan Review} == "CHECKED") ^ activateTask("Bldg Insp Plan Review"); updateTask("Bldg Insp Plan Review","Resubmittal Received","Updated via script","Updated via script"); editTaskDueDate("Bldg Insp Plan Review",dateAdd(null,14));
	//  #19: appMatch("Building/*/*/*") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && ({Zoning Review} == "CHECKED" || {Updated.Zoning Review} == "CHECKED") ^ activateTask("Zoning Review"); updateTask("Zoning Review","Resubmittal Received","Updated via script","Updated via script");  editTaskDueDate("Zoning Review",dateAdd(null,7));
	//  #20: appMatch("Building/*/*/*") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && ({Electric Eng Review} == "CHECKED" || {Updated.Electric Eng Review} == "CHECKED") ^ activateTask("Electric Eng Review"); updateTask("Electric Eng Review","Resubmittal Received","Updated via script","Updated via script");  editTaskDueDate("Electric Eng Review",dateAdd(null,14));
	//  #21: appMatch("Building/*/*/*") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && ({Engineering Review} == "CHECKED" || {Updated.Engineering Review} == "CHECKED") ^ activateTask("Engineering Review"); updateTask("Engineering Review","Resubmittal Received","Updated via script","Updated via script"); editTaskDueDate("Engineering Review",dateAdd(null,14));
	//  #22: appMatch("Building/*/*/*") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && ({Fire Authority Review} == "CHECKED" || {Updated.Fire Authority Review} == "CHECKED") ^ activateTask("Fire Authority Review"); updateTask("Fire Authority Review","Resubmittal Received","Updated via script","Updated via script");  editTaskDueDate("Fire Authority Review",dateAdd(null,14));
	//  #23: appMatch("Building/*/*/*") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && ({Hist Pres Review} == "CHECKED" || {Updated.Hist Pres Review} == "CHECKED") ^ activateTask("Hist Pres Review"); updateTask("Hist Pres Review","Resubmittal Received","Updated via script","Updated via script"); editTaskDueDate("Hist Pres Review",dateAdd(null,14));
	//  #24: appMatch("Building/*/*/*") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && ({Nat Res Review} == "CHECKED" || {Updated.Nat Res Review} == "CHECKED") ^ activateTask("Nat Res Review"); updateTask("Nat Res Review","Resubmittal Received","Updated via script","Updated via script"); editTaskDueDate("Nat Res Review",dateAdd(null,14));
	//  #25: appMatch("Building/*/*/*") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && ({NonCity WWW Fee Review} == "CHECKED" || {Updated.NonCity WWW Fee Review} == "CHECKED") ^ activateTask("NonCity WWW Fee Review"); updateTask("NonCity WWW Fee Review","Resubmittal Received","Updated via script","Updated via script"); editTaskDueDate("NonCity WWW Fee Review",dateAdd(null,14));
	//  #26: appMatch("Building/*/*/*") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && ({SW Eng Review} == "CHECKED" || {Updated.SW Eng Review} == "CHECKED") ^ activateTask("SW Eng Review"); updateTask("SW Eng Review","Resubmittal Received","Updated via script","Updated via script"); editTaskDueDate("SW Eng Review",dateAdd(null,14));
	//  #27: appMatch("Building/*/*/*") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && ({SW Erosion Review} == "CHECKED" || {Updated.SW Erosion Review} == "CHECKED") ^ activateTask("SW Erosion Review"); updateTask("SW Erosion Review","Resubmittal Received","Updated via script","Updated via script"); editTaskDueDate("SW Erosion Review",dateAdd(null,14));
	//  #28: appMatch("Building/*/*/*") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && ({SW Fee Review} == "CHECKED" || {Updated.SW Fee Review} == "CHECKED") ^ activateTask("SW Fee Review"); updateTask("SW Fee Review","Resubmittal Received","Updated via script","Updated via script"); editTaskDueDate("SW Fee Review",dateAdd(null,14));
	//  #29: appMatch("Building/*/*/*") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && ({SW Floodplain Review} == "CHECKED" || {Updated.SW Floodplain Review} == "CHECKED") ^ activateTask("SW Floodplain Review"); updateTask("SW Floodplain Review","Resubmittal Received","Updated via script","Updated via script"); editTaskDueDate("SW Floodplain Review",dateAdd(null,14));
	//  #30: appMatch("Building/*/*/*") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && ({Street Oversizing Review} == "CHECKED" || {Updated.Street Oversizing Review} == "CHECKED") ^ activateTask("Street Oversizing Review"); updateTask("Street Oversizing Review","Resubmittal Received","Updated via script","Updated via script"); editTaskDueDate("Street Oversizing Review",dateAdd(null,14));
	//  #31: appMatch("Building/*/*/*") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && ({WWW Fee Review} == "CHECKED" || {Updated.WWW Fee Review} == "CHECKED") ^ activateTask("WWW Fee Review"); updateTask("WWW Fee Review","Resubmittal Received","Updated via script","Updated via script"); editTaskDueDate("WWW Fee Review",dateAdd(null,14));
	if (appMatch("Building/*/*/*") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received")) {
		if (AInfo["Bldg Insp Plan Review"] == "CHECKED" || AInfo["Updated.Bldg Insp Plan Review"] == "CHECKED") {
			activateTask("Bldg Insp Plan Review");
			updateTask("Bldg Insp Plan Review", "Resubmittal Received", "Updated via script", "Updated via script");
			editTaskDueDate("Bldg Insp Plan Review", dateAdd(null, 14));
		}
		if (AInfo["Zoning Review"] == "CHECKED" || AInfo["Updated.Zoning Review"] == "CHECKED") {
			activateTask("Zoning Review");
			updateTask("Zoning Review", "Resubmittal Received", "Updated via script", "Updated via script");
			editTaskDueDate("Zoning Review", dateAdd(null, 7));
		}
		if (AInfo["Electric Eng Review"] == "CHECKED" || AInfo["Updated.Electric Eng Review"] == "CHECKED") {
			activateTask("Electric Eng Review");
			updateTask("Electric Eng Review", "Resubmittal Received", "Updated via script", "Updated via script");
			editTaskDueDate("Electric Eng Review", dateAdd(null, 14));
		}
		if (AInfo["Engineering Review"] == "CHECKED" || AInfo["Updated.Engineering Review"] == "CHECKED") {
			activateTask("Engineering Review");
			updateTask("Engineering Review", "Resubmittal Received", "Updated via script", "Updated via script");
			editTaskDueDate("Engineering Review", dateAdd(null, 14));
		}
		if (AInfo["Fire Authority Review"] == "CHECKED" || AInfo["Updated.Fire Authority Review"] == "CHECKED") {
			activateTask("Fire Authority Review");
			updateTask("Fire Authority Review", "Resubmittal Received", "Updated via script", "Updated via script");
			editTaskDueDate("Fire Authority Review", dateAdd(null, 14));
		}
		if (AInfo["Hist Pres Review"] == "CHECKED" || AInfo["Updated.Hist Pres Review"] == "CHECKED") {
			activateTask("Hist Pres Review");
			updateTask("Hist Pres Review", "Resubmittal Received", "Updated via script", "Updated via script");
			editTaskDueDate("Hist Pres Review", dateAdd(null, 14));
		}
		if (AInfo["Nat Res Review"] == "CHECKED" || AInfo["Updated.Nat Res Review"] == "CHECKED") {
			activateTask("Nat Res Review");
			updateTask("Nat Res Review", "Resubmittal Received", "Updated via script", "Updated via script");
			editTaskDueDate("Nat Res Review", dateAdd(null, 14));
		}
		if (AInfo["NonCity WWW Fee Review"] == "CHECKED" || AInfo["Updated.NonCity WWW Fee Review"] == "CHECKED") {
			activateTask("NonCity WWW Fee Review");
			updateTask("NonCity WWW Fee Review", "Resubmittal Received", "Updated via script", "Updated via script");
			editTaskDueDate("NonCity WWW Fee Review", dateAdd(null, 14));
		}
		if (AInfo["SW Eng Review"] == "CHECKED" || AInfo["Updated.SW Eng Review"] == "CHECKED") {
			activateTask("SW Eng Review");
			updateTask("SW Eng Review", "Resubmittal Received", "Updated via script", "Updated via script");
			editTaskDueDate("SW Eng Review", dateAdd(null, 14));
		}
		if (AInfo["SW Erosion Review"] == "CHECKED" || AInfo["Updated.SW Erosion Review"] == "CHECKED") {
			activateTask("SW Erosion Review");
			updateTask("SW Erosion Review", "Resubmittal Received", "Updated via script", "Updated via script");
			editTaskDueDate("SW Erosion Review", dateAdd(null, 14));
		}
		if (AInfo["SW Fee Review"] == "CHECKED" || AInfo["Updated.SW Fee Review"] == "CHECKED") {
			activateTask("SW Fee Review");
			updateTask("SW Fee Review", "Resubmittal Received", "Updated via script", "Updated via script");
			editTaskDueDate("SW Fee Review", dateAdd(null, 14));
		}
		if (AInfo["SW Floodplain Review"] == "CHECKED" || AInfo["Updated.SW Floodplain Review"] == "CHECKED") {
			activateTask("SW Floodplain Review");
			updateTask("SW Floodplain Review", "Resubmittal Received", "Updated via script", "Updated via script");
			editTaskDueDate("SW Floodplain Review", dateAdd(null, 14));
		}
		if (AInfo["Street Oversizing Review"] == "CHECKED" || AInfo["Updated.Street Oversizing Review"] == "CHECKED") {
			activateTask("Street Oversizing Review");
			updateTask("Street Oversizing Review", "Resubmittal Received", "Updated via script", "Updated via script");
			editTaskDueDate("Street Oversizing Review", dateAdd(null, 14));
		}
		if (AInfo["WWW Fee Review"] == "CHECKED" || AInfo["Updated.WWW Fee Review"] == "CHECKED") {
			activateTask("WWW Fee Review");
			updateTask("WWW Fee Review", "Resubmittal Received", "Updated via script", "Updated via script");
			editTaskDueDate("WWW Fee Review", dateAdd(null, 14));
		}
	}
	//  #32: wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") ^ setTask("Review Coordination","N","Y");
	if (wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received")) {
		setTask("Review Coordination", "N", "Y");
	}
	//  #33: (matches(wfProcess,lookup("BUILDING EDR WORKFLOWS",wfProcess)) && !appMatch("Building/New/Residential/Stock Plan")) && wfTask.equals("Land Use Code Compliance Review") && wfStatus.equals("Resubmittal Required") ^ branch("WorkflowTaskUpdateAfter:Building:UpdateZoningReview"); closeTask("Zoning Review","Resubmittal Required", wfComment,"Updated via script");
	//  #34: (matches(wfProcess,lookup("BUILDING EDR WORKFLOWS",wfProcess)) && !appMatch("Building/New/Residential/Stock Plan")) && wfTask.equals("Land Use Code Compliance Review")  && wfStatus.equals("OK") ^ branch("WorkflowTaskUpdateAfter:Building:UpdateZoningReview"); closeTask("Zoning Review","OK", wfComment,"Updated via script");
	//  #36: matches(wfProcess,lookup("BUILDING EDR WORKFLOWS",wfProcess)) && wfTask.equals("Zoning Review") && wfStatus.equals("OK") && !isTaskStatus("Land Use Code Compliance Review", "OK") ^ updateTask("Land Use Code Compliance Review","OK", wfComment,"Updated via script");
	//  #37: (matches(wfProcess,lookup("BUILDING EDR WORKFLOWS",wfProcess)) && !appMatch("Building/New/Residential/Stock Plan")) && wfTask.equals("Land Use Code Compliance Review") && wfStatus.equals("Hold") ^ branch("WorkflowTaskUpdateAfter:Building:UpdateZoningReview"); closeTask("Zoning Review","Resubmittal Required", wfComment,"Updated via script");
	if ((matches(wfProcess, lookup("BUILDING EDR WORKFLOWS", wfProcess)))) {
		if (!appMatch("Building/New/Residential/Stock Plan") && wfTask.equals("Land Use Code Compliance Review") && wfStatus.equals("Resubmittal Required")) {
			WTUA_Building_UpdateZoningReview(); // WorkflowTaskUpdateAfter:Building:UpdateZoningReview();
			closeTask("Zoning Review", "Resubmittal Required", wfComment, "Updated via script");
		}
		if (!appMatch("Building/New/Residential/Stock Plan") && wfTask.equals("Land Use Code Compliance Review") && wfStatus.equals("OK")) {
			WTUA_Building_UpdateZoningReview(); // WorkflowTaskUpdateAfter:Building:UpdateZoningReview();
			closeTask("Zoning Review", "OK", wfComment, "Updated via script");
		}
		if (wfTask.equals("Zoning Review") && wfStatus.equals("OK") && !isTaskStatus("Land Use Code Compliance Review", "OK")) {
			updateTask("Land Use Code Compliance Review", "OK", wfComment, "Updated via script");
		}
		if (!appMatch("Building/New/Residential/Stock Plan") && wfTask.equals("Land Use Code Compliance Review") && wfStatus.equals("Hold")) {
			WTUA_Building_UpdateZoningReview(); // WorkflowTaskUpdateAfter:Building:UpdateZoningReview();
			closeTask("Zoning Review", "Resubmittal Required", wfComment, "Updated via script");
		}
	}
	//  #39: matches(wfProcess, "COMMERCIAL PLUMBING") && (wfTask == "WWW Gen Backflow Final" && wfStatus == "OK" || wfTask == "WWW Gen Backflow Final" && wfStatus == "NA") && allTasksComplete("COMMERCIAL PLUMBING") ^ updateAppStatus("Completed", "Status auto-updated from workflow");
	if (matches(wfProcess, "COMMERCIAL PLUMBING") && (wfTask == "WWW Gen Backflow Final" && wfStatus == "OK" || wfTask == "WWW Gen Backflow Final" && wfStatus == "NA") && allTasksComplete("COMMERCIAL PLUMBING")) {
		updateAppStatus("Completed", "Status auto-updated from workflow");
	}
	//  #40: appMatch("Building/*/*/*") && wfTask.equals("Land Use Code Compliance Review") && wfStatus.equals("OK with Conditions") ^ branch("WorkflowTaskUpdateAfter:Building:UpdateZoningReview"); updateTask("Zoning Review","Hold", wfComment,"Updated via script");
	//  #41: appMatch("Building/*/*/*") && wfTask.equals("Land Use Code Compliance Review") && wfStatus.equals("Hold for Redesign") ^ activateTask("Review Coordination"); setTask("Land Use Code Compliance Review","N","Y"); editTaskDueDate("Review Coordination",dateAdd(null,1,"Y"));
	//  #42: appMatch("Building/*/*/*") && wfTask.equals("Land Use Code Compliance Review") && wfStatus.equals("Approved Stock Plan") ^ closeTask("Bldg Insp Plan Review","Approved Stock Plan", wfComment,"Updated via script"); branch("WorkflowTaskUpdateAfter:Building:UpdateZoningReview"); closeTask("Zoning Review","Approved Stock Plan", wfComment,"Updated via script");
	if (appMatch("Building/*/*/*")) {
		if (appMatch("Building/*/*/*") && wfTask.equals("Land Use Code Compliance Review") && wfStatus.equals("OK with Conditions")) {
			WTUA_Building_UpdateZoningReview(); // WorkflowTaskUpdateAfter:Building:UpdateZoningReview();
			updateTask("Zoning Review", "Hold", wfComment, "Updated via script");
		}
		if (appMatch("Building/*/*/*") && wfTask.equals("Land Use Code Compliance Review") && wfStatus.equals("Hold for Redesign")) {
			activateTask("Review Coordination");
			setTask("Land Use Code Compliance Review", "N", "Y");
			editTaskDueDate("Review Coordination", dateAdd(null, 1, "Y"));
		}
		if (appMatch("Building/*/*/*") && wfTask.equals("Land Use Code Compliance Review") && wfStatus.equals("Approved Stock Plan")) {
			closeTask("Bldg Insp Plan Review", "Approved Stock Plan", wfComment, "Updated via script");
			WTUA_Building_UpdateZoningReview(); // WorkflowTaskUpdateAfter:Building:UpdateZoningReview();
			closeTask("Zoning Review", "Approved Stock Plan", wfComment, "Updated via script");
		}
	}
	//  #43: wfTask.equals("Application Submittal") && wfStatus.equals("OK") && appMatch("Building/New/*/*")  && !appMatch("Building/*/*/Stock Plan") ^  editAppSpecific("Permit Expiration Date", dateAdd(null,180));
	//  #44: wfTask.equals("Application Submittal") && wfStatus.equals("Building Code Review") && appMatch("Building/New/*/*") ^  editAppSpecific("Permit Expiration Date", dateAdd(null,365));
	if (wfTask.equals("Application Submittal") && wfStatus.equals("OK") && appMatch("Building/New/*/*") && !appMatch("Building/*/*/Stock Plan")) {
		editAppSpecific("Permit Expiration Date", dateAdd(null, 180));
	}
	if (wfTask.equals("Application Submittal") && wfStatus.equals("Building Code Review") && appMatch("Building/New/*/*")) {
		editAppSpecific("Permit Expiration Date", dateAdd(null, 365));
	}
	//  #45: appMatch("Building/*/*/*") && wfTask.equals("Application Submittal") && wfStatus.equals("Withdrawn") ^ taskCloseAllExcept("Withdrawn","Application Withdrawn", "Application Submittal"); //setTask("ApplicationSubmittal","N","Y");
	if (appMatch("Building/*/*/*") && wfTask.equals("Application Submittal") && wfStatus.equals("Withdrawn")) {
		taskCloseAllExcept("Withdrawn", "Application Withdrawn", "Application Submittal");
		//setTask("ApplicationSubmittal","N","Y");
	}
	//  #46: matches(wfProcess, "STOCK PLAN") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && ({Building Review} == "CHECKED" || {Updated.Building Review} == "CHECKED") ^ activateTask("Building Plan Review"); updateTask("Building Plan Review","Resubmittal Received","Resubmittal has been received","Updated via script"); editTaskDueDate("Building Plan Review",dateAdd(null,14));
	//  #47: matches(wfProcess, "STOCK PLAN") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && ({LUCC Review} == "CHECKED" || {Updated.LUCC Review} == "CHECKED") ^ activateTask("Land Use Code Compliance Review"); updateTask("Land Use Code Compliance Review","Resubmittal Received","Resubmittal has been received","Updated via script"); editTaskDueDate("Land Use Code Compliance Review",dateAdd(null,14));
	if (matches(wfProcess, "STOCK PLAN") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received")) {
		if (AInfo["Building Review"] == "CHECKED" || AInfo["Updated.Building Review"] == "CHECKED") {
			activateTask("Building Plan Review");
			updateTask("Building Plan Review", "Resubmittal Received", "Resubmittal has been received", "Updated via script");
			editTaskDueDate("Building Plan Review", dateAdd(null, 14));
		}
		if (matches(wfProcess, "STOCK PLAN") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && (AInfo["LUCC Review"] == "CHECKED" || AInfo["Updated.LUCC Review"] == "CHECKED")) {
			activateTask("Land Use Code Compliance Review");
			updateTask("Land Use Code Compliance Review", "Resubmittal Received", "Resubmittal has been received", "Updated via script");
			editTaskDueDate("Land Use Code Compliance Review", dateAdd(null, 14));
		}
	}
	//  #48: appMatch("Building/*/*/*") && wfTask.equals("Review Coordination") && wfStatus.equals("LUC Redesign Received")  ^ updateTask("Land Use Code Compliance Review","Resubmittal Received","Updated via script","Updated via script");
	//  #49: appMatch("Building/*/*/*") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && ({WWW Eng Review} == "CHECKED" || {Updated.WWW Eng Review} == "CHECKED") ^ activateTask("WWW Eng Review"); updateTask("WWW Eng Review","Resubmittal Received","Updated via script","Updated via script"); editTaskDueDate("WWW Eng Review",dateAdd(null,14));
	//  #50: appMatch("Building/*/*/*") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && ({WWW Irrigation Review} == "CHECKED" || {Updated.WWW Irrigation Review} == "CHECKED") ^ activateTask("WWW Irrigation Review"); updateTask("WWW Irrigation Review","Resubmittal Received","Updated via script","Updated via script"); editTaskDueDate("WWW Irrigation Review",dateAdd(null,14));
	//  #51: appMatch("Building/*/*/*") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && ({WWW Backflow Review} == "CHECKED" || {Updated.WWW Backflow Review} == "CHECKED") ^ activateTask("WWW Backflow Review"); updateTask("WWW Backflow Review","Resubmittal Received","Updated via script","Updated via script"); editTaskDueDate("WWW Backflow Review",dateAdd(null,14));
	//  #52: appMatch("Building/*/*/*") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && ({WWW Traps Review} == "CHECKED" || {Updated.WWW Traps Review} == "CHECKED") ^ activateTask("WWW Traps Review"); updateTask("WWW Traps Review","Resubmittal Received","Updated via script","Updated via script"); editTaskDueDate("WWW Traps Review",dateAdd(null,14));
	//  #53: appMatch("Building/*/*/*") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && ({Health Dept Review} == "CHECKED" || {Updated.Health Dept Review} == "CHECKED") ^ activateTask("Health Dept Review"); updateTask("Health Dept Review","Resubmittal Received","Updated via script","Updated via script"); editTaskDueDate("Health Dept Review",dateAdd(null,14));
	//  #54: appMatch("Building/*/*/*") && wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && ({Utilities Energy Review} == "CHECKED" || {Updated.Utilities Energy Review} == "CHECKED") ^ activateTask("Utilities Energy Review"); updateTask("Utilities Energy Review","Resubmittal Received","Updated via script","Updated via script"); editTaskDueDate("Utilities Energy Review",dateAdd(null,14));
	//  #55: appMatch("Building/*/*/*") && (wfTask.equals("Bldg Insp Plan Review") && wfStatus.equals("Resubmittal Required")) && (isTaskStatus("Zoning Review","NA") || isTaskStatus("Zoning Review","OK") || isTaskStatus("Zoning Review","Resubmittal Required")) ^ activateTask("Review Coordination"); editTaskDueDate("Review Coordination",dateAdd(null,1,"Y"));
	//  #56: (appMatch("Building/*/*/*") && !matches(wfProcess,"BASEMENT FINISH","COMMERCIAL ELECTRIC","COMMERCIAL MECHANICAL","COMMERCIAL PLUMBING","COMMERCIAL ROOFING","ELECTRIC SERVICE CHANGE","GENERAL MINOR","MOBILE HOME INSTALLATION")) && (wfTask.equals("Permit Tech Review") && wfStatus.equals("Hold")) || (wfTask.equals("Permit Tech Review") && wfStatus.equals("OK")) ^ branch("WorkflowTaskUpdateAfter:Building:PermitTechReview");
	//  #57: appMatch("Building/*/*/*") && (wfTask.equals("Review Coordination") && wfStatus.equals("Requested Resubmittal")) ^ branch("WorkflowTaskUpdateAfter:Building:ReviewCoordination"); setTask("Review Coordination","N","Y");
	if (appMatch("Building/*/*/*")) {
		if (wfTask.equals("Review Coordination") && wfStatus.equals("LUC Redesign Received")) {
			updateTask("Land Use Code Compliance Review", "Resubmittal Received", "Updated via script", "Updated via script");
		}
		if (wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && (AInfo["WWW Eng Review"] == "CHECKED" || AInfo["Updated.WWW Eng Review"] == "CHECKED")) {
			activateTask("WWW Eng Review");
			updateTask("WWW Eng Review", "Resubmittal Received", "Updated via script", "Updated via script");
			editTaskDueDate("WWW Eng Review", dateAdd(null, 14));
		}
		if (wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && (AInfo["WWW Irrigation Review"] == "CHECKED" || AInfo["Updated.WWW Irrigation Review"] == "CHECKED")) {
			activateTask("WWW Irrigation Review");
			updateTask("WWW Irrigation Review", "Resubmittal Received", "Updated via script", "Updated via script");
			editTaskDueDate("WWW Irrigation Review", dateAdd(null, 14));
		}
		if (wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && (AInfo["WWW Backflow Review"] == "CHECKED" || AInfo["Updated.WWW Backflow Review"] == "CHECKED")) {
			activateTask("WWW Backflow Review");
			updateTask("WWW Backflow Review", "Resubmittal Received", "Updated via script", "Updated via script");
			editTaskDueDate("WWW Backflow Review", dateAdd(null, 14));
		}
		if (wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && (AInfo["WWW Traps Review"] == "CHECKED" || AInfo["Updated.WWW Traps Review"] == "CHECKED")) {
			activateTask("WWW Traps Review");
			updateTask("WWW Traps Review", "Resubmittal Received", "Updated via script", "Updated via script");
			editTaskDueDate("WWW Traps Review", dateAdd(null, 14));
		}
		if (wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && (AInfo["Health Dept Review"] == "CHECKED" || AInfo["Updated.Health Dept Review"] == "CHECKED")) {
			activateTask("Health Dept Review");
			updateTask("Health Dept Review", "Resubmittal Received", "Updated via script", "Updated via script");
			editTaskDueDate("Health Dept Review", dateAdd(null, 14));
		}
		if (wfTask.equals("Review Coordination") && wfStatus.equals("Resubmittal Received") && (AInfo["Utilities Energy Review"] == "CHECKED" || AInfo["Updated.Utilities Energy Review"] == "CHECKED")) {
			activateTask("Utilities Energy Review");
			updateTask("Utilities Energy Review", "Resubmittal Received", "Updated via script", "Updated via script");
			editTaskDueDate("Utilities Energy Review", dateAdd(null, 14));
		}
		if (wfTask.equals("Bldg Insp Plan Review") && wfStatus.equals("Resubmittal Required") && (isTaskStatus("Zoning Review", "NA") || isTaskStatus("Zoning Review", "OK") || isTaskStatus("Zoning Review", "Resubmittal Required"))) {
			activateTask("Review Coordination");
			editTaskDueDate("Review Coordination", dateAdd(null, 1, "Y"));
		}
		if (!matches(wfProcess, "BASEMENT FINISH", "COMMERCIAL ELECTRIC", "COMMERCIAL MECHANICAL", "COMMERCIAL PLUMBING", "COMMERCIAL ROOFING", "ELECTRIC SERVICE CHANGE", "GENERAL MINOR", "MOBILE HOME INSTALLATION")
			&& wfTask.equals("Permit Tech Review") && (wfStatus.equals("Hold") || wfStatus.equals("OK"))) {
			WTUA_Building_PermitTechReview(); // WorkflowTaskUpdateAfter:Building:PermitTechReview;
		}
		if (wfTask.equals("Review Coordination") && wfStatus.equals("Requested Resubmittal")) {
			WTUA_Building_ReviewCoordination(); // WorkflowTaskUpdateAfter:Building:ReviewCoordination;
			setTask("Review Coordination", "N", "Y");
		}
	}
	//  #58: matches(wfProcess, "STOCK PLAN") && (wfTask.equals("Review Coordination") && wfStatus.equals("OK")) ^ branch("WorkflowTaskUpdateAfter:Building:StockPlanReviewCoordinationOk");
	if (matches(wfProcess, "STOCK PLAN") && (wfTask.equals("Review Coordination") && wfStatus.equals("OK"))) {
		WTUA_Building_StockPlanReviewCoordinationOk(); // WorkflowTaskUpdateAfter:Building:StockPlanReviewCoordinationOk;
	}
}

function WTUA_Building_AppSubmitOK() { // From Standard Choice: WorkflowTaskUpdateAfter:Building:AppSubmitOK (Does not exist)
	logDebug("WTUA_Building_AppSubmitOK");
	// Called from WorkflowTaskUpdateAfter #89: matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) && wfTask == "Initial Review Coordination" && (wfStatus == "NA" || wfStatus == "OK") ^branch("WorkflowTaskUpdateAfter:Building:AppSubmitOK");
}
function WTUA_Building_InitialReviewCoordination() { // From Standard Choice: WorkflowTaskUpdateAfter:Building:InitialReviewCoordination
	logDebug("WTUA_Building_InitialReviewCoordination");
	// WorkflowTaskUpdateAfter:Building:InitialReviewCoordination #01: wfTask.equals("Initial Review Coordination") && wfStatus.equals("Resubmittal Received") && ({Land Use Code Compliance Review} == "CHECKED" || {Updated.Land Use Code Compliance Review} == "CHECKED") ^ activateTask("Land Use Code Compliance Review"); updateTask("Land Use Code Compliance Review","Resubmittal Received","Updated via script","Updated via script"); editTaskDueDate("Land Use Code ComplianceReview",dateAdd(null,5));
	// WorkflowTaskUpdateAfter:Building:InitialReviewCoordination #02: wfTask.equals("Initial Review Coordination") && wfStatus.equals("Resubmittal Received") && ({Floodplain Code Compliance Review} == "CHECKED" || {Updated.Floodplain Code Compliance Review} == "CHECKED") ^ activateTask("Floodplain Code Compliance Review"); updateTask("Floodplain Code Compliance Review","Resubmittal Received","Updated via script","Updated via script"); editTaskDueDate("Floodplain Code Compliance Review",dateAdd(null,5));
	// WorkflowTaskUpdateAfter:Building:InitialReviewCoordination #03: wfTask.equals("Initial Review Coordination") && wfStatus.equals("Resubmittal Received") && ({Historic Code Compliance Review} == "CHECKED" || {Updated.Historic Code Compliance Review} == "CHECKED") ^ activateTask("Historic Code Compliance Review"); updateTask("Historic Code Compliance Review","Resubmittal Received","Updated via script","Updated via script"); editTaskDueDate("Historic Code Compliance Review",dateAdd(null,5));
	// WorkflowTaskUpdateAfter:Building:InitialReviewCoordination #23: wfTask.equals("Initial Review Coordination") && wfStatus.equals("Reactivate Review") && ({Land Use Code Compliance Review} == "CHECKED" || {Updated.Land Use Code Compliance Review} == "CHECKED") ^ activateTask("Land Use Code Compliance Review"); updateTask("Land Use Code Compliance Review","Review Reactivated","Updated via script","Updated via script"); //editTaskDueDate("Land Use Code ComplianceReview",dateAdd(null,5));
	// WorkflowTaskUpdateAfter:Building:InitialReviewCoordination #24: wfTask.equals("Initial Review Coordination") && wfStatus.equals("Reactivate Review") && ({Floodplain Code Compliance Review} == "CHECKED" || {Updated.Floodplain Code Compliance Review} == "CHECKED") ^ activateTask("Floodplain Code Compliance Review"); updateTask("Floodplain Code Compliance Review","Review Reactivated","Updated via script","Updated via script"); //editTaskDueDate("Floodplain Code Compliance Review",dateAdd(null,5));
	// WorkflowTaskUpdateAfter:Building:InitialReviewCoordination #25: wfTask.equals("Initial Review Coordination") && wfStatus.equals("Reactivate Review") && ({Historic Code Compliance Review} == "CHECKED" || {Updated.Historic Code Compliance Review} == "CHECKED") ^ activateTask("Historic Code Compliance Review"); updateTask("Historic Code Compliance Review","Review Reactivated","Updated via script","Updated via script"); //editTaskDueDate("Historic Code Compliance Review",dateAdd(null,5));
	var rTaskNames = [], rDaysDue = null;
	if (wfTask.equals("Initial Review Coordination")) {
		if (wfStatus.equals("Resubmittal Received")) {
			var rTaskNames = ["Land Use Code Compliance Review", "Floodplain Code Compliance Review", "Historic Code Compliance Review"];
			rDaysDue = 5;
		} else if (wfStatus.equals("Reactivate Review")) {
			var rTaskNames = ["Land Use Code Compliance Review", "Floodplain Code Compliance Review", "Historic Code Compliance Review"];
		}
	}
	for (tt in rTaskNames) {
		rTaskName = rTaskNames[tt];
		if (AInfo[rTaskName] == "CHECKED" || AInfo["Updated." + rTaskName] == "CHECKED") {
			activateTask(rTaskName);
			updateTask(rTaskName, wfStatus, "Updated via script", "Updated via script");
			editTaskDueDate(rTaskName, dateAdd(null, 5));
		}
	}
}

function sendNotificationContact() {
	var emailTemplate = (arguments.length > 0 && arguments[0] ? arguments[0] : "");
	var emailParameters = (arguments.length > 1 && arguments[1] ? arguments[1] : aa.util.newHashtable());
	var contactTypes = (arguments.length > 2 && arguments[2] ? arguments[1] : ["Applicant"]);
	var emailStaffCC = (arguments.length > 3 && arguments[3] ? arguments[3] : "");
	logDebug("sendNotificationContact");
	// From Standard Choice: WorkflowTaskUpdateAfter:Building:AutomatedNotifications
	// #01: true ^ emailSendFrom = "kkreisher@fcgov.com"; emailSendTo = "";  emailStaffCC = ""; fileNames = null;
	// #02: true ^ emailParameters = aa.util.newHashtable(); getRecordParams4Notification(emailParameters); getPrimaryAddressLineParam4Notification(emailParameters);
	// #03: emailSendTo == "" ^ contactArray = getContactArray(); if(typeof(contactArray == "object")) for (eachContact in contactArray) if(contactArray[eachContact]["contactType"] == "Applicant") branch("ES_GET CONTACT DETAILS");
	// #04: emailSendTo != "" && emailTemplate != "" ^  logDebug("Applicant email = " + emailSendTo); sendNotification(emailSendFrom,emailSendTo,emailStaffCC,emailTemplate,emailParameters,fileNames);
	var emailFrom = "kkreisher@fcgov.com"; emailTo = ""; emailCC = emailStaffCC;
	fileNames = null;
	getRecordParams4Notification(emailParameters);
	getPrimaryAddressLineParam4Notification(emailParameters);
	var emailToArray = emailTo.split(";"), emailCCArray = emailCC.split(";");
	contactArray = getContactObjs(capId, contactTypes);
	if (typeof (contactArray) == "object") {
		for (var c in contactArray) {
			var tContactObj = contactArray[c];
			if (matches(tContactObj.people.getEmail(), null, undefined, "")) continue;
			if (exists(tContactObj.people.getEmail(), emailSendToArray)) continue; // Already sending to email address.
			if (!exists(tContactObj.people.getContactType(), contactTypesTo)) continue;
			emailSendToArray.push(tContactObj.people.getEmail());
		}
	}
	emailTo = emailToArray.join(";");
	emailCC = emailToArray.join(";");
	/*
		if (emailTo == "") {
			contactArray = getContactArray();
			if (typeof (contactArray) == "object") {
				for (eachContact in contactArray) {
					if (!exists(contactArray[eachContact]["contactType"], contactTypes)) continue;
					// from Standard Choice ES_GET CONTACT DETAILS
					thisContact = contactArray[eachContact];
					if (!thisContact["email"]) continue;
					getContactParams4Notification(emailParameters, thisContact);
					emailSendTo = thisContact["email"];
					comment("Applicant email: " + emailSendTo);
					logDebug("Applicant email: " + emailSendTo);
				}
			}
		}
	*/
	if (emailTo != "" && emailTemplate != "") {
		logDebug("Sending " + emailTemplate + " to " + emailTo);
		sendNotification(emailFrom, emailTo, emailCC, emailTemplate, emailParameters, fileNames);
	}
}

function WTUA_Building_PermitTechReview() { // From Standard Choice: WorkflowTaskUpdateAfter:Building:PermitTechReview
	logDebug("WTUA_Building_PermitTechReview");
	// WorkflowTaskUpdateAfter:Building:PermitTechReview #01: true ^ emailSendFrom = "kkreisher@fcgov.com"; emailSendTo = ""; emailTemplate = ""; emailStaffCC = ""; fileNames = null;
	// WorkflowTaskUpdateAfter:Building:PermitTechReview #02: true ^ emailParameters = aa.util.newHashtable(); getRecordParams4Notification(emailParameters); getPrimaryAddressLineParam4Notification(emailParameters);
	// WorkflowTaskUpdateAfter:Building:PermitTechReview #03: emailSendTo == "" ^ contactArray = getContactArray(); if(typeof(contactArray == "object")) for (eachContact in contactArray) if(contactArray[eachContact]["contactType"] == "Applicant") branch("ES_GET CONTACT DETAILS");
	// WorkflowTaskUpdateAfter:Building:PermitTechReview #04: wfStatus == "OK" ^ emailTemplate = "BUILDING_PERMIT_TECH_REVIEW_OK";
	// WorkflowTaskUpdateAfter:Building:PermitTechReview #05: wfStatus == "Hold" && (wfComment != "" && wfComment != null) ^ emailParameters.put("$$wfComments$$", wfComment); emailTemplate = "BUILDING_PERMIT_TECH_REVIEW_HOLD";
	// WorkflowTaskUpdateAfter:Building:PermitTechReview #06: wfStatus == "Hold" && (wfComment == "" || wfComment == null) ^ emailParameters.put("$$wfComments$$", "No Additional Information Provided.");  emailTemplate = "BUILDING_PERMIT_TECH_REVIEW_HOLD";
	// WorkflowTaskUpdateAfter:Building:PermitTechReview #07: emailSendTo != "" && emailTemplate != "" ^ sendNotification(emailSendFrom,emailSendTo,emailStaffCC,emailTemplate,emailParameters,fileNames);
	var emailTemplate = "";
	var emailParameters = aa.util.newHashtable();
	if (wfStatus == "OK") {
		emailTemplate = "BUILDING_PERMIT_TECH_REVIEW_OK";
	} else if (wfStatus == "Hold") {
		emailTemplate = "BUILDING_PERMIT_TECH_REVIEW_HOLD";
		if (wfComment != "" && wfComment != null) {
			emailParameters.put("$$wfComments$$", wfComment);
		} else {
			emailParameters.put("$$wfComments$$", "No Additional Information Provided.");
		}
	}
	if (emailTemplate != "") {
		sendNotificationContact(emailTemplate, emailParameters)
	}
}

function WTUA_Building_ReviewCoordination() { // From Standard Choice: WorkflowTaskUpdateAfter:Building:ReviewCoordination
	logDebug("WTUA_Building_ReviewCoordination");
	// WorkflowTaskUpdateAfter:Building:ReviewCoordination #01: true ^ emailSendFrom = "kkreisher@fcgov.com"; emailSendTo = ""; emailTemplate = ""; emailStaffCC = ""; fileNames = null;
	// WorkflowTaskUpdateAfter:Building:ReviewCoordination #02: true ^ emailParameters = aa.util.newHashtable(); getRecordParams4Notification(emailParameters); getPrimaryAddressLineParam4Notification(emailParameters);
	// WorkflowTaskUpdateAfter:Building:ReviewCoordination #03: emailSendTo == "" ^ contactArray = getContactArray(); if(typeof(contactArray == "object")) for (eachContact in contactArray) if(contactArray[eachContact]["contactType"] == "Applicant") branch("ES_GET CONTACT DETAILS");
	// WorkflowTaskUpdateAfter:Building:ReviewCoordination #04: wfComment != "" && wfComment != null ^ emailParameters.put("$$wfComments$$", wfComment); emailTemplate = "BUILDING_PERMIT_REVIEW_COORD_REQ_RESUBMIT";
	// WorkflowTaskUpdateAfter:Building:ReviewCoordination #05: wfComment == "" || wfComment == null ^ emailParameters.put("$$wfComments$$", "No Additional Information Provided.");  emailTemplate = "BUILDING_PERMIT_REVIEW_COORD_REQ_RESUBMIT";
	// WorkflowTaskUpdateAfter:Building:ReviewCoordination #06: emailSendTo != "" && emailTemplate != "" ^ sendNotification(emailSendFrom,emailSendTo,emailStaffCC,emailTemplate,emailParameters,fileNames);
	emailTemplate = "BUILDING_PERMIT_REVIEW_COORD_REQ_RESUBMIT";
	emailParameters = aa.util.newHashtable();
	if (wfComment != "" && wfComment != null) {
		emailParameters.put("$$wfComments$$", wfComment);
	} else {
		emailParameters.put("$$wfComments$$", "No Additional Information Provided.");
	}
	if (emailTemplate != "") {
		sendNotificationContact(emailTemplate, emailParameters)
	}
}

function WTUA_Building_StockPlanReviewCoordinationOk() { // From Standard Choice: WorkflowTaskUpdateAfter:Building:StockPlanReviewCoordinationOk
	logDebug("WTUA_Building_ReviewCoordination");
	// #01: true ^ emailSendFrom = "kkreisher@fcgov.com"; emailSendTo = ""; emailTemplate = "BUILDING_PERMIT_REVIEW_OK_STOCK_PLANS_ONLY"; emailStaffCC = ""; fileNames = null;
	// #02: true ^ emailParameters = aa.util.newHashtable(); getRecordParams4Notification(emailParameters); getPrimaryAddressLineParam4Notification(emailParameters);
	// #03: emailSendTo == "" ^ contactArray = getContactArray(); if(typeof(contactArray == "object")) for (eachContact in contactArray) if(contactArray[eachContact]["contactType"] == "Applicant") branch("ES_GET CONTACT DETAILS");
	// #04: emailSendTo != "" && emailTemplate != "" ^ sendNotification(emailSendFrom,emailSendTo,emailStaffCC,emailTemplate,emailParameters,fileNames);
	emailTemplate = "BUILDING_PERMIT_REVIEW_OK_STOCK_PLANS_ONLY";
	emailParameters = aa.util.newHashtable();
	if (emailSendTo != "" && emailTemplate != "") {
		sendNotification(emailSendFrom, emailSendTo, emailStaffCC, emailTemplate, emailParameters, fileNames);
	}
	if (emailTemplate != "") {
		sendNotificationContact(emailTemplate, emailParameters)
	}
}

function WTUA_Building_SetDatesBuildingCodeReview() { // From Standard Choice: WorkflowTaskUpdateAfter:Building:SetDatesBuildingCodeReview
	logDebug("WTUA_Building_SetDatesBuildingCodeReview");
	// WorkflowTaskUpdateAfter:Building:SetDatesBuildingCodeReview #01: matches(wfProcess,"COM-IND-MIXED-USE BUILDING") ^ editTaskDueDate("Bldg Insp Plan Review",dateAdd(null,35,"Y"));
	// WorkflowTaskUpdateAfter:Building:SetDatesBuildingCodeReview #02: matches(wfProcess,"MULTI-FAMILY") ^ editTaskDueDate("Bldg Insp Plan Review",dateAdd(null,35,"Y"));
	// WorkflowTaskUpdateAfter:Building:SetDatesBuildingCodeReview #03: matches(wfProcess,"SECONDARY COMMERCIAL") ^ editTaskDueDate("Bldg Insp Plan Review",dateAdd(null,9,"Y"));
	// WorkflowTaskUpdateAfter:Building:SetDatesBuildingCodeReview #04: matches(wfProcess,"SINGLE FAMILY ATTACHED-DUPLEX") ^ editTaskDueDate("Bldg Insp Plan Review",dateAdd(null,28,"Y"));
	// WorkflowTaskUpdateAfter:Building:SetDatesBuildingCodeReview #05: matches(wfProcess,"SINGLE FAMILY DETACHED") ^ editTaskDueDate("Bldg Insp Plan Review",dateAdd(null,21,"Y"));
	// WorkflowTaskUpdateAfter:Building:SetDatesBuildingCodeReview #06: matches(wfProcess,"SECONDARY RESIDENTIAL") ^ editTaskDueDate("Bldg Insp Plan Review",dateAdd(null,9,"Y"));
	if (matches(wfProcess, "COM-IND-MIXED-USE BUILDING")) {
		editTaskDueDate("Bldg Insp Plan Review", dateAdd(null, 35, "Y"));
	} else if (matches(wfProcess, "MULTI-FAMILY")) {
		editTaskDueDate("Bldg Insp Plan Review", dateAdd(null, 35, "Y"));
	} else if (matches(wfProcess, "SECONDARY COMMERCIAL")) {
		editTaskDueDate("Bldg Insp Plan Review", dateAdd(null, 9, "Y"));
	} else if (matches(wfProcess, "SINGLE FAMILY ATTACHED-DUPLEX")) {
		editTaskDueDate("Bldg Insp Plan Review", dateAdd(null, 28, "Y"));
	} else if (matches(wfProcess, "SINGLE FAMILY DETACHED")) {
		editTaskDueDate("Bldg Insp Plan Review", dateAdd(null, 21, "Y"));
	} else if (matches(wfProcess, "SECONDARY RESIDENTIAL")) {
		editTaskDueDate("Bldg Insp Plan Review", dateAdd(null, 9, "Y"));
	}
}
function WTUA_Building_UpdateZoningReview() { // From Standard Choice: WorkflowTaskUpdateAfter:Building:UpdateZoningReview
	logDebug("WTUA_Building_UpdateZoningReview");
	// #07: true ^ useTaskSpecificGroupName = true;
	// #08: true ^ var zoningArray = new Array();
	// #13: wfProcess == "SINGLE FAMILY ATTACHED-DUPLEX"  ^ loadTaskSpecific(zoningArray); var minorAmendment = zoningArray["SINGLE FAMILY ATTACHED-DUPLEX.Land Use Code Compliance Review.Minor Amendment"]; logDebug(minorAmendment); var setbacksFront = zoningArray["SINGLE FAMILY ATTACHED-DUPLEX.Land Use Code Compliance Review.Setbacks: Front"]; logDebug(setbacksFront); var setbacksRear = zoningArray["SINGLE FAMILY ATTACHED-DUPLEX.Land Use Code Compliance Review.Setbacks: Rear"]; logDebug(setbacksRear); var setbacksRight = zoningArray["SINGLE FAMILY ATTACHED-DUPLEX.Land Use Code Compliance Review.Setbacks: Right"]; logDebug(setbacksRight); var setbacksLeft = zoningArray["SINGLE FAMILY ATTACHED-DUPLEX.Land Use Code Compliance Review.Setbacks: Left"]; logDebug(setbacksLeft);  var offStrParking = zoningArray["SINGLE FAMILY ATTACHED-DUPLEX.Land Use Code Compliance Review.Off Street Parking"]; logDebug(offStrParking);
	// #14: ^ var parkingSlots = zoningArray[wfProcess+".Land Use Code Compliance Review.Total Parking Slots"]; logDebug(parkingSlots); var platFileNum = zoningArray["SINGLE FAMILY ATTACHED-DUPLEX.Land Use Code Compliance Review.Plat File Number"]; logDebug(platFileNum);  var zbaCase = zoningArray["SINGLE FAMILY ATTACHED-DUPLEX.Land Use Code Compliance Review.ZBA Case Number"]; logDebug(zbaCase);
	// #15: wfProcess == "SINGLE FAMILY DETACHED"  ^ loadTaskSpecific(zoningArray); var minorAmendment = zoningArray["SINGLE FAMILY DETACHED.Land Use Code Compliance Review.Minor Amendment"]; logDebug(minorAmendment); var setbacksFront = zoningArray["SINGLE FAMILY DETACHED.Land Use Code Compliance Review.Setbacks: Front"]; logDebug(setbacksFront); var setbacksRear = zoningArray["SINGLE FAMILY DETACHED.Land Use Code Compliance Review.Setbacks: Rear"]; logDebug(setbacksRear); var setbacksRight = zoningArray["SINGLE FAMILY DETACHED.Land Use Code Compliance Review.Setbacks: Right"]; logDebug(setbacksRight); var setbacksLeft = zoningArray["SINGLE FAMILY DETACHED.Land Use Code Compliance Review.Setbacks: Left"]; logDebug(setbacksLeft);  var offStrParking = zoningArray["SINGLE FAMILY DETACHED.Land Use Code Compliance Review.Off Street Parking"]; logDebug(offStrParking);
	// #16: ^ var parkingSlots = zoningArray["SINGLE FAMILY DETACHED.Land Use Code Compliance Review.Total Parking Slots"]; logDebug(parkingSlots); var platFileNum = zoningArray["SINGLE FAMILY DETACHED.Land Use Code Compliance Review.Plat File Number"]; logDebug(platFileNum);  var zbaCase = zoningArray["SINGLE FAMILY DETACHED.Land Use Code Compliance Review.ZBA Case Number"]; logDebug(zbaCase);
	// #17: wfProcess == "MULTI-FAMILY"  ^ loadTaskSpecific(zoningArray); var minorAmendment = zoningArray["MULTI-FAMILY.Land Use Code Compliance Review.Minor Amendment"]; logDebug(minorAmendment); var setbacksFront = zoningArray["MULTI-FAMILY.Land Use Code Compliance Review.Setbacks: Front"]; logDebug(setbacksFront); var setbacksRear = zoningArray["MULTI-FAMILY.Land Use Code Compliance Review.Setbacks: Rear"]; logDebug(setbacksRear); var setbacksRight = zoningArray["MULTI-FAMILY.Land Use Code Compliance Review.Setbacks: Right"]; logDebug(setbacksRight); var setbacksLeft = zoningArray["MULTI-FAMILY.Land Use Code Compliance Review.Setbacks: Left"]; logDebug(setbacksLeft);  var offStrParking = zoningArray["MULTI-FAMILY.Land Use Code Compliance Review.Off Street Parking"]; logDebug(offStrParking);
	// #18: ^ var parkingSlots = zoningArray["MULTI-FAMILY.Land Use Code Compliance Review.Total Parking Slots"]; logDebug(parkingSlots); var platFileNum = zoningArray["MULTI-FAMILY.Land Use Code Compliance Review.Plat File Number"]; logDebug(platFileNum);  var zbaCase = zoningArray["MULTI-FAMILY.Land Use Code Compliance Review.ZBA Case Number"]; logDebug(zbaCase);
	// #19: wfProcess == "COM-IND-MIXED-USE BUILDING"  ^ loadTaskSpecific(zoningArray); var minorAmendment = zoningArray["COM-IND-MIXED-USE BUILDING.Land Use Code Compliance Review.Minor Amendment"]; logDebug(minorAmendment); var setbacksFront = zoningArray["COM-IND-MIXED-USE BUILDING.Land Use Code Compliance Review.Setbacks: Front"]; logDebug(setbacksFront); var setbacksRear = zoningArray["COM-IND-MIXED-USE BUILDING.Land Use Code Compliance Review.Setbacks: Rear"]; logDebug(setbacksRear); var setbacksRight = zoningArray["COM-IND-MIXED-USE BUILDING.Land Use Code Compliance Review.Setbacks: Right"]; logDebug(setbacksRight); var setbacksLeft = zoningArray["COM-IND-MIXED-USE BUILDING.Land Use Code Compliance Review.Setbacks: Left"]; logDebug(setbacksLeft);  var offStrParking = zoningArray["COM-IND-MIXED-USE BUILDING.Land Use Code Compliance Review.Off Street Parking"]; logDebug(offStrParking);
	// #20: ^ var parkingSlots = zoningArray["COM-IND-MIXED-USE BUILDING.Land Use Code Compliance Review.Total Parking Slots"]; logDebug(parkingSlots); var platFileNum = zoningArray["COM-IND-MIXED-USE BUILDING.Land Use Code Compliance Review.Plat File Number"]; logDebug(platFileNum);  var zbaCase = zoningArray["COM-IND-MIXED-USE BUILDING.Land Use Code Compliance Review.ZBA Case Number"]; logDebug(zbaCase);
	// #21: wfProcess == "SECONDARY COMMERCIAL"  ^ loadTaskSpecific(zoningArray); var minorAmendment = zoningArray["SECONDARY COMMERCIAL.Land Use Code Compliance Review.Minor Amendment"]; logDebug(minorAmendment); var setbacksFront = zoningArray["SECONDARY COMMERCIAL.Land Use Code Compliance Review.Setbacks: Front"]; logDebug(setbacksFront); var setbacksRear = zoningArray["SECONDARY COMMERCIAL.Land Use Code Compliance Review.Setbacks: Rear"]; logDebug(setbacksRear); var setbacksRight = zoningArray["SECONDARY COMMERCIAL.Land Use Code Compliance Review.Setbacks: Right"]; logDebug(setbacksRight); var setbacksLeft = zoningArray["SECONDARY COMMERCIAL.Land Use Code Compliance Review.Setbacks: Left"]; logDebug(setbacksLeft);  var offStrParking = zoningArray["SECONDARY COMMERCIAL.Land Use Code Compliance Review.Off Street Parking"]; logDebug(offStrParking);
	// #22: ^ var parkingSlots = zoningArray["SECONDARY COMMERCIAL.Land Use Code Compliance Review.Total Parking Slots"]; logDebug(parkingSlots); var platFileNum = zoningArray["SECONDARY COMMERCIAL.Land Use Code Compliance Review.Plat File Number"]; logDebug(platFileNum);  var zbaCase = zoningArray["SECONDARY COMMERCIAL.Land Use Code Compliance Review.ZBA Case Number"]; logDebug(zbaCase);
	// #23: wfProcess == "SECONDARY RESIDENTIAL"  ^ loadTaskSpecific(zoningArray); var minorAmendment = zoningArray["SECONDARY RESIDENTIAL.Land Use Code Compliance Review.Minor Amendment"]; logDebug(minorAmendment); var setbacksFront = zoningArray["SECONDARY RESIDENTIAL.Land Use Code Compliance Review.Setbacks: Front"]; logDebug(setbacksFront); var setbacksRear = zoningArray["SECONDARY RESIDENTIAL.Land Use Code Compliance Review.Setbacks: Rear"]; logDebug(setbacksRear); var setbacksRight = zoningArray["SECONDARY RESIDENTIAL.Land Use Code Compliance Review.Setbacks: Right"]; logDebug(setbacksRight); var setbacksLeft = zoningArray["SECONDARY RESIDENTIAL.Land Use Code Compliance Review.Setbacks: Left"]; logDebug(setbacksLeft);  var offStrParking = zoningArray["SECONDARY RESIDENTIAL.Land Use Code Compliance Review.Off Street Parking"]; logDebug(offStrParking);
	// #24: ^ var parkingSlots = zoningArray["SECONDARY RESIDENTIAL.Land Use Code Compliance Review.Total Parking Slots"]; logDebug(parkingSlots); var platFileNum = zoningArray["SECONDARY RESIDENTIAL.Land Use Code Compliance Review.Plat File Number"]; logDebug(platFileNum);  var zbaCase = zoningArray["SECONDARY RESIDENTIAL.Land Use Code Compliance Review.ZBA Case Number"]; logDebug(zbaCase);
	// #25: wfProcess == "AWNING"  ^ loadTaskSpecific(zoningArray); var minorAmendment = zoningArray["AWNING.Land Use Code Compliance Review.Minor Amendment"]; logDebug(minorAmendment); var setbacksFront = zoningArray["AWNING.Land Use Code Compliance Review.Setbacks: Front"]; logDebug(setbacksFront); var setbacksRear = zoningArray["AWNING.Land Use Code Compliance Review.Setbacks: Rear"]; logDebug(setbacksRear); var setbacksRight = zoningArray["AWNING.Land Use Code Compliance Review.Setbacks: Right"]; logDebug(setbacksRight); var setbacksLeft = zoningArray["AWNING.Land Use Code Compliance Review.Setbacks: Left"]; logDebug(setbacksLeft);  var offStrParking = zoningArray["AWNING.Land Use Code Compliance Review.Off Street Parking"]; logDebug(offStrParking);
	// #26: ^ var parkingSlots = zoningArray["AWNING.Land Use Code Compliance Review.Total Parking Slots"]; logDebug(parkingSlots); var platFileNum = zoningArray["AWNING.Land Use Code Compliance Review.Plat File Number"]; logDebug(platFileNum);  var zbaCase = zoningArray["AWNING.Land Use Code Compliance Review.ZBA Case Number"]; logDebug(zbaCase);
	// #27: wfProcess == "COMMERCIAL ADDITION"  ^ loadTaskSpecific(zoningArray); var minorAmendment = zoningArray["COMMERCIAL ADDITION.Land Use Code Compliance Review.Minor Amendment"]; logDebug(minorAmendment); var setbacksFront = zoningArray["COMMERCIAL ADDITION.Land Use Code Compliance Review.Setbacks: Front"]; logDebug(setbacksFront); var setbacksRear = zoningArray["COMMERCIAL ADDITION.Land Use Code Compliance Review.Setbacks: Rear"]; logDebug(setbacksRear); var setbacksRight = zoningArray["COMMERCIAL ADDITION.Land Use Code Compliance Review.Setbacks: Right"]; logDebug(setbacksRight); var setbacksLeft = zoningArray["COMMERCIAL ADDITION.Land Use Code Compliance Review.Setbacks: Left"]; logDebug(setbacksLeft);  var offStrParking = zoningArray["COMMERCIAL ADDITION.Land Use Code Compliance Review.Off Street Parking"]; logDebug(offStrParking);
	// #28: ^ var parkingSlots = zoningArray["COMMERCIAL ADDITION.Land Use Code Compliance Review.Total Parking Slots"]; logDebug(parkingSlots); var platFileNum = zoningArray["COMMERCIAL ADDITION.Land Use Code Compliance Review.Plat File Number"]; logDebug(platFileNum);  var zbaCase = zoningArray["COMMERCIAL ADDITION.Land Use Code Compliance Review.ZBA Case Number"]; logDebug(zbaCase);
	// #29: wfProcess == "COMMERCIAL GENERAL ALTERATION"  ^ loadTaskSpecific(zoningArray); var minorAmendment = zoningArray["COMMERCIAL GENERAL ALTERATION.Land Use Code Compliance Review.Minor Amendment"]; logDebug(minorAmendment); var setbacksFront = zoningArray["COMMERCIAL GENERAL ALTERATION.Land Use Code Compliance Review.Setbacks: Front"]; logDebug(setbacksFront); var setbacksRear = zoningArray["COMMERCIAL GENERAL ALTERATION.Land Use Code Compliance Review.Setbacks: Rear"]; logDebug(setbacksRear); var setbacksRight = zoningArray["COMMERCIAL GENERAL ALTERATION.Land Use Code Compliance Review.Setbacks: Right"]; logDebug(setbacksRight); var setbacksLeft = zoningArray["COMMERCIAL GENERAL ALTERATION.Land Use Code Compliance Review.Setbacks: Left"]; logDebug(setbacksLeft);  var offStrParking = zoningArray["COMMERCIAL GENERAL ALTERATION.Land Use Code Compliance Review.Off Street Parking"]; logDebug(offStrParking);
	// #30: ^ var parkingSlots = zoningArray["COMMERCIAL GENERAL ALTERATION.Land Use Code Compliance Review.Total Parking Slots"]; logDebug(parkingSlots); var platFileNum = zoningArray["COMMERCIAL GENERAL ALTERATION.Land Use Code Compliance Review.Plat File Number"]; logDebug(platFileNum);  var zbaCase = zoningArray["COMMERCIAL GENERAL ALTERATION.Land Use Code Compliance Review.ZBA Case Number"]; logDebug(zbaCase);
	// #31: wfProcess == "COMMERCIAL POOL"  ^ loadTaskSpecific(zoningArray); var minorAmendment = zoningArray["COMMERCIAL POOL.Land Use Code Compliance Review.Minor Amendment"]; logDebug(minorAmendment); var setbacksFront = zoningArray["COMMERCIAL POOL.Land Use Code Compliance Review.Setbacks: Front"]; logDebug(setbacksFront); var setbacksRear = zoningArray["COMMERCIAL POOL.Land Use Code Compliance Review.Setbacks: Rear"]; logDebug(setbacksRear); var setbacksRight = zoningArray["COMMERCIAL POOL.Land Use Code Compliance Review.Setbacks: Right"]; logDebug(setbacksRight); var setbacksLeft = zoningArray["COMMERCIAL POOL.Land Use Code Compliance Review.Setbacks: Left"]; logDebug(setbacksLeft);  var offStrParking = zoningArray["COMMERCIAL POOL.Land Use Code Compliance Review.Off Street Parking"]; logDebug(offStrParking);
	// #32: ^ var parkingSlots = zoningArray["COMMERCIAL POOL.Land Use Code Compliance Review.Total Parking Slots"]; logDebug(parkingSlots); var platFileNum = zoningArray["COMMERCIAL POOL.Land Use Code Compliance Review.Plat File Number"]; logDebug(platFileNum);  var zbaCase = zoningArray["COMMERCIAL POOL.Land Use Code Compliance Review.ZBA Case Number"]; logDebug(zbaCase);
	// #33: wfProcess == "DECK"  ^ loadTaskSpecific(zoningArray); var minorAmendment = zoningArray["DECK.Land Use Code Compliance Review.Minor Amendment"]; logDebug(minorAmendment); var setbacksFront = zoningArray["DECK.Land Use Code Compliance Review.Setbacks: Front"]; logDebug(setbacksFront); var setbacksRear = zoningArray["DECK.Land Use Code Compliance Review.Setbacks: Rear"]; logDebug(setbacksRear); var setbacksRight = zoningArray["DECK.Land Use Code Compliance Review.Setbacks: Right"]; logDebug(setbacksRight); var setbacksLeft = zoningArray["DECK.Land Use Code Compliance Review.Setbacks: Left"]; logDebug(setbacksLeft);  var offStrParking = zoningArray["DECK.Land Use Code Compliance Review.Off Street Parking"]; logDebug(offStrParking);
	// #34: ^ var parkingSlots = zoningArray["DECK.Land Use Code Compliance Review.Total Parking Slots"]; logDebug(parkingSlots); var platFileNum = zoningArray["DECK.Land Use Code Compliance Review.Plat File Number"]; logDebug(platFileNum);  var zbaCase = zoningArray["DECK.Land Use Code Compliance Review.ZBA Case Number"]; logDebug(zbaCase);
	// #35: wfProcess == "FENCE"  ^ loadTaskSpecific(zoningArray); var minorAmendment = zoningArray["FENCE.Land Use Code Compliance Review.Minor Amendment"]; logDebug(minorAmendment); var setbacksFront = zoningArray["FENCE.Land Use Code Compliance Review.Setbacks: Front"]; logDebug(setbacksFront); var setbacksRear = zoningArray["FENCE.Land Use Code Compliance Review.Setbacks: Rear"]; logDebug(setbacksRear); var setbacksRight = zoningArray["FENCE.Land Use Code Compliance Review.Setbacks: Right"]; logDebug(setbacksRight); var setbacksLeft = zoningArray["FENCE.Land Use Code Compliance Review.Setbacks: Left"]; logDebug(setbacksLeft);  var offStrParking = zoningArray["FENCE.Land Use Code Compliance Review.Off Street Parking"]; logDebug(offStrParking);
	// #36: ^ var parkingSlots = zoningArray["FENCE.Land Use Code Compliance Review.Total Parking Slots"]; logDebug(parkingSlots); var platFileNum = zoningArray["FENCE.Land Use Code Compliance Review.Plat File Number"]; logDebug(platFileNum);  var zbaCase = zoningArray["FENCE.Land Use Code Compliance Review.ZBA Case Number"]; logDebug(zbaCase);
	// #37: wfProcess == "PATIO COVER"  ^ loadTaskSpecific(zoningArray); var minorAmendment = zoningArray["PATIO COVER.Land Use Code Compliance Review.Minor Amendment"]; logDebug(minorAmendment); var setbacksFront = zoningArray["PATIO COVER.Land Use Code Compliance Review.Setbacks: Front"]; logDebug(setbacksFront); var setbacksRear = zoningArray["PATIO COVER.Land Use Code Compliance Review.Setbacks: Rear"]; logDebug(setbacksRear); var setbacksRight = zoningArray["PATIO COVER.Land Use Code Compliance Review.Setbacks: Right"]; logDebug(setbacksRight); var setbacksLeft = zoningArray["PATIO COVER.Land Use Code Compliance Review.Setbacks: Left"]; logDebug(setbacksLeft);  var offStrParking = zoningArray["PATIO COVER.Land Use Code Compliance Review.Off Street Parking"]; logDebug(offStrParking);
	// #38: ^ var parkingSlots = zoningArray["PATIO COVER.Land Use Code Compliance Review.Total Parking Slots"]; logDebug(parkingSlots); var platFileNum = zoningArray["PATIO COVER.Land Use Code Compliance Review.Plat File Number"]; logDebug(platFileNum);  var zbaCase = zoningArray["PATIO COVER.Land Use Code Compliance Review.ZBA Case Number"]; logDebug(zbaCase);
	// #39: wfProcess == "RESIDENTIAL ADDITION"  ^ loadTaskSpecific(zoningArray); var minorAmendment = zoningArray["RESIDENTIAL ADDITION.Land Use Code Compliance Review.Minor Amendment"]; logDebug(minorAmendment); var setbacksFront = zoningArray["RESIDENTIAL ADDITION.Land Use Code Compliance Review.Setbacks: Front"]; logDebug(setbacksFront); var setbacksRear = zoningArray["RESIDENTIAL ADDITION.Land Use Code Compliance Review.Setbacks: Rear"]; logDebug(setbacksRear); var setbacksRight = zoningArray["RESIDENTIAL ADDITION.Land Use Code Compliance Review.Setbacks: Right"]; logDebug(setbacksRight); var setbacksLeft = zoningArray["RESIDENTIAL ADDITION.Land Use Code Compliance Review.Setbacks: Left"]; logDebug(setbacksLeft);  var offStrParking = zoningArray["RESIDENTIAL ADDITION.Land Use Code Compliance Review.Off Street Parking"]; logDebug(offStrParking);
	// #40: ^ var parkingSlots = zoningArray["RESIDENTIAL ADDITION.Land Use Code Compliance Review.Total Parking Slots"]; logDebug(parkingSlots); var platFileNum = zoningArray["RESIDENTIAL ADDITION.Land Use Code Compliance Review.Plat File Number"]; logDebug(platFileNum);  var zbaCase = zoningArray["RESIDENTIAL ADDITION.Land Use Code Compliance Review.ZBA Case Number"]; logDebug(zbaCase);
	// #41: wfProcess == "RESIDENTIAL POOL"  ^ loadTaskSpecific(zoningArray); var minorAmendment = zoningArray["RESIDENTIAL POOL.Land Use Code Compliance Review.Minor Amendment"]; logDebug(minorAmendment); var setbacksFront = zoningArray["RESIDENTIAL POOL.Land Use Code Compliance Review.Setbacks: Front"]; logDebug(setbacksFront); var setbacksRear = zoningArray["RESIDENTIAL POOL.Land Use Code Compliance Review.Setbacks: Rear"]; logDebug(setbacksRear); var setbacksRight = zoningArray["RESIDENTIAL POOL.Land Use Code Compliance Review.Setbacks: Right"]; logDebug(setbacksRight); var setbacksLeft = zoningArray["RESIDENTIAL POOL.Land Use Code Compliance Review.Setbacks: Left"]; logDebug(setbacksLeft);  var offStrParking = zoningArray["RESIDENTIAL POOL.Land Use Code Compliance Review.Off Street Parking"]; logDebug(offStrParking);
	// #42: ^ var parkingSlots = zoningArray["RESIDENTIAL POOL.Land Use Code Compliance Review.Total Parking Slots"]; logDebug(parkingSlots); var platFileNum = zoningArray["RESIDENTIAL POOL.Land Use Code Compliance Review.Plat File Number"]; logDebug(platFileNum);  var zbaCase = zoningArray["RESIDENTIAL POOL.Land Use Code Compliance Review.ZBA Case Number"]; logDebug(zbaCase);
	// #43: wfProcess == "SALES TRAILER"  ^ loadTaskSpecific(zoningArray); var minorAmendment = zoningArray["SALES TRAILER.Land Use Code Compliance Review.Minor Amendment"]; logDebug(minorAmendment); var setbacksFront = zoningArray["SALES TRAILER.Land Use Code Compliance Review.Setbacks: Front"]; logDebug(setbacksFront); var setbacksRear = zoningArray["SALES TRAILER.Land Use Code Compliance Review.Setbacks: Rear"]; logDebug(setbacksRear); var setbacksRight = zoningArray["SALES TRAILER.Land Use Code Compliance Review.Setbacks: Right"]; logDebug(setbacksRight); var setbacksLeft = zoningArray["SALES TRAILER.Land Use Code Compliance Review.Setbacks: Left"]; logDebug(setbacksLeft);  var offStrParking = zoningArray["SALES TRAILER.Land Use Code Compliance Review.Off Street Parking"]; logDebug(offStrParking);
	// #44: ^ var parkingSlots = zoningArray["SALES TRAILER.Land Use Code Compliance Review.Total Parking Slots"]; logDebug(parkingSlots); var platFileNum = zoningArray["SALES TRAILER.Land Use Code Compliance Review.Plat File Number"]; logDebug(platFileNum);  var zbaCase = zoningArray["SALES TRAILER.Land Use Code Compliance Review.ZBA Case Number"]; logDebug(zbaCase);
	// #45: wfProcess == "STORAGE SHED"  ^ loadTaskSpecific(zoningArray); var minorAmendment = zoningArray["STORAGE SHED.Land Use Code Compliance Review.Minor Amendment"]; logDebug(minorAmendment); var setbacksFront = zoningArray["STORAGE SHED.Land Use Code Compliance Review.Setbacks: Front"]; logDebug(setbacksFront); var setbacksRear = zoningArray["STORAGE SHED.Land Use Code Compliance Review.Setbacks: Rear"]; logDebug(setbacksRear); var setbacksRight = zoningArray["STORAGE SHED.Land Use Code Compliance Review.Setbacks: Right"]; logDebug(setbacksRight); var setbacksLeft = zoningArray["STORAGE SHED.Land Use Code Compliance Review.Setbacks: Left"]; logDebug(setbacksLeft);  var offStrParking = zoningArray["STORAGE SHED.Land Use Code Compliance Review.Off Street Parking"]; logDebug(offStrParking);
	// #46: ^ var parkingSlots = zoningArray["STORAGE SHED.Land Use Code Compliance Review.Total Parking Slots"]; logDebug(parkingSlots); var platFileNum = zoningArray["STORAGE SHED.Land Use Code Compliance Review.Plat File Number"]; logDebug(platFileNum);  var zbaCase = zoningArray["STORAGE SHED.Land Use Code Compliance Review.ZBA Case Number"]; logDebug(zbaCase);
	// #46a: matches(wfProcess,lookup("BUILDING BLD2 EDR WORKFLOWS",wfProcess)) ^ loadTaskSpecific(zoningArray); var minorAmendment = zoningArray[wfProcess+".Land Use Code Compliance Review.Minor Amendment"]; logDebug(minorAmendment); var setbacksFront = zoningArray[wfProcess+".Land Use Code Compliance Review.Setbacks: Front"]; logDebug(setbacksFront); var setbacksRear = zoningArray[wfProcess+".Land Use Code Compliance Review.Setbacks: Rear"]; logDebug(setbacksRear); var setbacksRight = zoningArray[wfProcess+".Land Use Code Compliance Review.Setbacks: Right"]; logDebug(setbacksRight); var setbacksLeft = zoningArray[wfProcess+".Land Use Code Compliance Review.Setbacks: Left"]; logDebug(setbacksLeft);  var offStrParking = zoningArray[wfProcess+".Land Use Code Compliance Review.Off Street Parking"]; logDebug(offStrParking);
	// #46b: ^ var parkingSlots = zoningArray[wfProcess+".Land Use Code Compliance Review.Total Parking Slots"]; logDebug(parkingSlots); var platFileNum = zoningArray[wfProcess+".Land Use Code Compliance Review.Plat File Number"]; logDebug(platFileNum);  var zbaCase = zoningArray[wfProcess+".Land Use Code Compliance Review.ZBA Case Number"]; logDebug(zbaCase);
	// #47: true ^ editTaskSpecific("Zoning Review","Minor Amendment",minorAmendment); editTaskSpecific("Zoning Review","Plat File Number",platFileNum); editTaskSpecific("Zoning Review","ZBA Case Number",zbaCase); editTaskSpecific("Zoning Review","Setbacks: Front",setbacksFront); editTaskSpecific("Zoning Review","Setbacks: Rear", setbacksRear); editTaskSpecific("Zoning Review","Setbacks: Right",setbacksRight); editTaskSpecific("Zoning Review","Setbacks: Left",setbacksLeft);  editTaskSpecific("Zoning Review","Off Street Parking",offStrParking); editTaskSpecific("Zoning Review","Total Parking Slots",parkingSlots);
	useTaskSpecificGroupName = true;
	var zoningArray = new Array();
	if (matches(wfProcess, lookup("BUILDING BLD2 EDR WORKFLOWS", wfProcess))) {
		updateZoningReviewTSI = true;
	} else if (matches(wfProcess, "SINGLE FAMILY ATTACHED-DUPLEX", "SINGLE FAMILY DETACHED", "MULTI-FAMILY", "COM-IND-MIXED-USE BUILDING",
		"SECONDARY COMMERCIAL", "SECONDARY RESIDENTIAL", "AWNING", "COMMERCIAL ADDITION", "COMMERCIAL GENERAL ALTERATION", "COMMERCIAL POOL",
		"DECK", "FENCE", "PATIO COVER", "RESIDENTIAL ADDITION", "RESIDENTIAL POOL", "SALES TRAILER", "STORAGE SHED")) {
		updateZoningReviewTSI = true;
	}
	if (updateZoningReviewTSI) {
		loadTaskSpecific(zoningArray);
		var tsiFields = ["Minor Amendment", "Setbacks: Front", "Setbacks: Rear", "Setbacks: Right", "Setbacks: Left", "Off Street Parking", "Total Parking Slots", "Plat File Number", "ZBA Case Number"];
		for (var tt in tsiFields) {
			var tsiFieldName = tsiFields[tt];
			var tsiFieldValue = zoningArray[wfProcess + ".Land Use Code Compliance Review." + tsiFieldName];
			logDebug(wfProcess + ".Land Use Code Compliance Review." + tsiFieldName + ": " + tsiFieldValue);
			editTaskSpecific("Zoning Review", tsiFieldName, tsiFieldValue);
		}
		/*
		var minorAmendment = zoningArray[wfProcess + ".Land Use Code Compliance Review.Minor Amendment"];
		var setbacksFront = zoningArray[wfProcess + ".Land Use Code Compliance Review.Setbacks: Front"];
		var setbacksRear = zoningArray[wfProcess + ".Land Use Code Compliance Review.Setbacks: Rear"];
		var setbacksRight = zoningArray[wfProcess + ".Land Use Code Compliance Review.Setbacks: Right"];
		var setbacksLeft = zoningArray[wfProcess + ".Land Use Code Compliance Review.Setbacks: Left"];
		var offStrParking = zoningArray[wfProcess + ".Land Use Code Compliance Review.Off Street Parking"];
		var parkingSlots = zoningArray[wfProcess + ".Land Use Code Compliance Review.Total Parking Slots"];
		var platFileNum = zoningArray[wfProcess + ".Land Use Code Compliance Review.Plat File Number"];
		var zbaCase = zoningArray[wfProcess + ".Land Use Code Compliance Review.ZBA Case Number"];
		logDebug(minorAmendment);
		logDebug(setbacksFront);
		logDebug(setbacksRear);
		logDebug(setbacksRight);
		logDebug(setbacksLeft);
		logDebug(offStrParking);
		logDebug(parkingSlots);
		logDebug(platFileNum);
		logDebug(zbaCase);
		editTaskSpecific("Zoning Review", "Minor Amendment", minorAmendment);
		editTaskSpecific("Zoning Review", "Setbacks: Front", setbacksFront);
		editTaskSpecific("Zoning Review", "Setbacks: Rear", setbacksRear);
		editTaskSpecific("Zoning Review", "Setbacks: Right", setbacksRight);
		editTaskSpecific("Zoning Review", "Setbacks: Left", setbacksLeft);
		editTaskSpecific("Zoning Review", "Off Street Parking", offStrParking);
		editTaskSpecific("Zoning Review", "Total Parking Slots", parkingSlots);
		editTaskSpecific("Zoning Review", "Plat File Number", platFileNum);
		editTaskSpecific("Zoning Review", "ZBA Case Number", zbaCase);
		*/
	}
}

function WTUA_Partial_Permit_Issuance() { // From Standard Choice: WorkflowTaskUpdateAfter: Partial Permit Issuance
	logDebug("WTUA_Partial_Permit_Issuance");
	//  #03: matches(appTypeArray[3], "Duplex") && !feeExists("BPF-FF3")  ^  addFee("BPF-FF3","COMBO PERMIT","FINAL",1,"N")
	//  #11: matches(appTypeArray[3], "Single Family Detached", "Single Family Attached") && !feeExists("BPF-FF2") ^  addFee("BPF-FF2","COMBO PERMIT","FINAL",1,"N")
	//  #12: matches(appTypeArray[3], "Com-Ind-Mixed-Use Building", "Multi-Family", "Secondary Building", "Boarding House Attached", "Boarding House Detached") || matches(appTypeArray[1], "Addition")  ^  branch("Fees: Partial Permit Issuance")
	if (matches(appTypeArray[3], "Duplex") && !feeExists("BPF-FF3")) {
		addFee("BPF-FF3", "COMBO PERMIT", "FINAL", 1, "N");
	}
	if (matches(appTypeArray[3], "Single Family Detached", "Single Family Attached") && !feeExists("BPF-FF2")) {
		addFee("BPF-FF2", "COMBO PERMIT", "FINAL", 1, "N");
	}
	if (matches(appTypeArray[3], "Com-Ind-Mixed-Use Building", "Multi-Family", "Secondary Building", "Boarding House Attached", "Boarding House Detached") || matches(appTypeArray[1], "Addition")) {
		Fees_Partial_Permit_Issuance();
	}
}

// Supporting functions from associated EMSE standard choices

function Fees_Partial_Permit_Issuance() {
	// From Standard Choice: WorkflowTaskUpdateAfter: Partial Permit Issuance
	// #03: matches(appTypeArray[3], "Duplex") && !feeExists("BPF-FF3")  ^  addFee("BPF-FF3","COMBO PERMIT","FINAL",1,"N")
	// #11: matches(appTypeArray[3], "Single Family Detached", "Single Family Attached") && !feeExists("BPF-FF2") ^  addFee("BPF-FF2","COMBO PERMIT","FINAL",1,"N")
	if (matches(appTypeArray[3], "Duplex") && !feeExists("BPF-FF3")) {
		addFee("BPF-FF3", "COMBO PERMIT", "FINAL", 1, "N");
	}
	if (matches(appTypeArray[3], "Single Family Detached", "Single Family Attached") && !feeExists("BPF-FF2")) {
		addFee("BPF-FF2", "COMBO PERMIT", "FINAL", 1, "N");
	}
	// WorkflowTaskUpdateAfter: Partial Permit Issuance #12: matches(appTypeArray[3], "Com-Ind-Mixed-Use Building", "Multi-Family", "Secondary Building", "Boarding House Attached", "Boarding House Detached") || matches(appTypeArray[1], "Addition")  ^  branch("Fees: Partial Permit Issuance")
	if (matches(appTypeArray[3], "Com-Ind-Mixed-Use Building", "Multi-Family", "Secondary Building", "Boarding House Attached", "Boarding House Detached") || matches(appTypeArray[1], "Addition")) {
		// From Standard Choice: Fees: Partial Permit Issuance
		// #01: true  ^  addFee("BPF-FF1","COMBO PERMIT","FINAL",{FF Valuation},"N")
		// #02: true  ^  addFee("CT-FF","COMBO PERMIT","FINAL",1,"N")
		// #03: true  ^  addFee("CST-FF","COMBO PERMIT","FINAL",1,"N")
		// #04: true  ^  addFee("BPF-WFF","COMBO PERMIT","FINAL",estValue - {FF Valuation},"N")
		// #05: true  ^  addFee("CST-WFF","COMBO PERMIT","FINAL",estValue - {FF Valuation},"N")
		// #06: true  ^  addFee("CT-WFF","COMBO PERMIT","FINAL",estValue - {FF Valuation},"N")
		// #07: true  ^  removeFee("BPF-SUB","FINAL")
		// #08: true  ^  removeFee("CST","FINAL")
		// #09: true  ^  removeFee("CT","FINAL")
		addFee("BPF-FF1", "COMBO PERMIT", "FINAL", AInfo["FF Valuation"], "N");
		addFee("CT-FF", "COMBO PERMIT", "FINAL", 1, "N");
		addFee("CST-FF", "COMBO PERMIT", "FINAL", 1, "N");
		addFee("BPF-WFF", "COMBO PERMIT", "FINAL", estValue - AInfo["FF Valuation"], "N");
		addFee("CST-WFF", "COMBO PERMIT", "FINAL", estValue - AInfo["FF Valuation"], "N");
		addFee("CT-WFF", "COMBO PERMIT", "FINAL", estValue - AInfo["FF Valuation"], "N");
		removeFee("BPF-SUB", "FINAL");
		removeFee("CST", "FINAL");
		removeFee("CT", "FINAL");
	}
}

function include(s) {
	try {
		var thisDate = new Date();
		var thisTime = thisDate.getTime();
		var st = getScriptText(s);
		if (st.length) {
			logDebug("Executing script : " + s + ", Elapsed Time: " + ((thisTime - startTime) / 1000) + " Seconds")
			eval(st);
		}
	} catch (err) { handleError(err, s); }
}
