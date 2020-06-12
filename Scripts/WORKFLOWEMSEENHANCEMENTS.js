/*----------------------------------------------------------------------------------------------------/|| WorkFlow enhancement  script sample|/------------------------------------------------------------------------------------------------------*///get task by pathgetTaskByPath();editTask();copyTask();insertTask();removeTask();insertSubProcess() ;removeSubProcess();getTaskStatus();editTaskStatus();createTaskStatus();//get task by task pathfunction getTaskByPath() 	{	// construct CAP ID;	var s_id1 = "08008";    var s_id2 = "00000";    var s_id3 = "00001";	var taskPath = "Application Submittal";    var s_capResult = aa.cap.getCapID(s_id1, s_id2, s_id3);	var capId ;    if(s_capResult.getSuccess())      capId = s_capResult.getOutput();    else    {      aa.print("ERROR: Failed to get capId: " + s_capResult.getErrorMessage());	  return ;    }		var fTask ;	var taskResult = aa.workflow.getTask(capId,taskPath);	if (taskResult.getSuccess())	{		fTask = taskResult.getOutput();		aa.print("get task successful : task name = " + fTask.getTaskDescription() + "; Process name = " + fTask.getProcessCode());	}	else		{ aa.print("ERROR: Failed to get task! Path = " + taskPath +";" + taskResult.getErrorMessage()); }				return fTask;	}		//edit taskfunction editTask() 	{		// construct CAP ID;		var s_id1 = "08008";    var s_id2 = "00000";    var s_id3 = "00001";	    var s_capResult = aa.cap.getCapID(s_id1, s_id2, s_id3);	var capId ;    if(s_capResult.getSuccess())      capId = s_capResult.getOutput();    else    {      aa.print("ERROR: Failed to get capId: " + s_capResult.getErrorMessage());	  return ;    }		// last task	var taskPath = "Application Submittal";  //  First task : "Engineering Review>Application Acceptance" ;  other task :  "Engineering Review>Permit Issuance " 	var taskResult;	//get the task by the task path	var fTask ;	var taskResult1 = aa.workflow.getTask(capId,taskPath);	if (taskResult1.getSuccess())	{		fTask = taskResult1.getOutput();		aa.print("get task successful : task name = " + fTask.getTaskDescription() + "; Process name = " + fTask.getProcessCode());	}	else		{ aa.print("ERROR: Failed to get task! Path = " + taskPath +";" + taskResult1.getErrorMessage()); }					//change the task name	fTask.setTaskDescription("Name Changed Task");	//change  the disposition.	//fTask.setDisposition("Accepted");	taskResult = aa.workflow.editTask(fTask);	if (taskResult.getSuccess())	{		var processId = fTask.getProcessID();		var stepNum =fTask.getStepNumber();		var taskResult1 = aa.workflow.getTask(capId,stepNum,processId);					if (taskResult1.getSuccess())		{			fTask = taskResult1.getOutput();			aa.print("update task successful : updated task name = " + fTask.getTaskDescription() + "; Process name = " + fTask.getProcessCode());		}		else			{ aa.print("ERROR: Failed to get task! Path = " + taskPath +";" + taskResult1.getErrorMessage()); return false; }			}	else		{ aa.print("ERROR: Failed to update task! Path = " + taskPath +";" + taskResult.getErrorMessage()); return false; }	}			function editTaskSpecificInfo()	{	// construct CAP ID;	var s_id1 = "08008";    var s_id2 = "00000";    var s_id3 = "00001";var s_capResult = aa.cap.getCapID(s_id1, s_id2, s_id3);var capId ;if(s_capResult.getSuccess())  capId = s_capResult.getOutput();else{  aa.print("ERROR: Failed to get capId: " + s_capResult.getErrorMessage());  }// last taskvar taskPath = "P-Application Submittal";  var taskResult;//get the task by the task pathvar fTask ;var taskResult1 = aa.workflow.getTask(capId,taskPath);if (taskResult1.getSuccess()){	fTask = taskResult1.getOutput();	aa.print("get task successful : task name = " + fTask.getTaskDescription() + "; Process name = " + fTask.getProcessCode());		stepnumber = fTask.getStepNumber();	processID = fTask.getProcessID();	var itemName ="Proposed Name";	var itemValue="1111";	var displayLength = 500;	var diplayorder =9;	var maxlength =1000;	var validationScriptName ="validationScriptName";	var setAttributeValueReqFlag = true;		TSIResult = aa.taskSpecificInfo.getTaskSpecifiInfoByDesc(capId,processID,stepnumber,itemName)	if (TSIResult.getSuccess())	{		TSI = TSIResult.getOutput();		var TSIArray = new Array();		TSInfoModel = TSI.getTaskSpecificInfoModel();		TSInfoModel.setChecklistComment(itemValue);					TSInfoModel.setAttributeValue("updated value");		TSInfoModel.setChecklistComment("updated value");		TSInfoModel.setDisplayLength(displayLength);		TSInfoModel.setDisplayOrder(diplayorder);		TSInfoModel.setMaxLength(maxlength);		TSInfoModel.setValidationScriptName(validationScriptName);		TSInfoModel.setAttributeValueReqFlag(setAttributeValueReqFlag);			TSInfoModel.setAuditStatus("A");		TSInfoModel.setTaskStatusReqFlag(setAttributeValueReqFlag);				TSIArray.push(TSInfoModel);		TSIUResult = aa.taskSpecificInfo.editTaskSpecInfos(TSIArray);		if (TSIUResult.getSuccess())			{				aa.print("Successfully updated TSI Task=" + taskPath + " Item=" + itemName );								aa.print("                                              " +"ChecklistComment=" + itemValue);				aa.print("                                              " +"DisplayLength=" + displayLength);				aa.print("                                              " +"diplay order=" + diplayorder);				aa.print("                                              " +"max length=" + maxlength);				aa.print("                                              " +"DisplayLength=" + displayLength);				aa.print("                                              " +"validationScriptName=" + validationScriptName);				aa.print("                                              "+ "AttributeValueReqFlag=" + setAttributeValueReqFlag);			}		else			{ aa.print("ERROR: Failed to Update Task Specific Info : " + TSIUResult.getErrorMessage()); }	}	else	{			aa.print("ERROR: Failed to get Task Specific Info objects: " + TSIUResult.getErrorMessage()); 	}}else{ aa.print("ERROR: Failed to get task! Path = " + taskPath +";" + taskResult1.getErrorMessage()); }	}	//copy taskfunction copyTask() 	{		// construct CAP ID;	var s_id1 = "08008";    var s_id2 = "00000";    var s_id3 = "00001";	    var s_capResult = aa.cap.getCapID(s_id1, s_id2, s_id3);	var capId ;    if(s_capResult.getSuccess())      capId = s_capResult.getOutput();    else    {      aa.print("ERROR: Failed to get capId: " + s_capResult.getErrorMessage());	  return ;    }		var sourceTaskPath = "Preservation";	// target task is the last task	var targetTaskPath = "Design Review";	var taskResult;	var sTask;	var tTask;	//copy as next task 	var copyType ="N";	//copy as parrallel task	copyPType ="P";			//get the task by the task path	var taskResult1 = aa.workflow.getTask(capId,sourceTaskPath);	if (taskResult1.getSuccess())	{		sTask = taskResult1.getOutput();		aa.print("get task successful : task name = " + sTask.getTaskDescription() + "; Process name = " + sTask.getProcessCode());	}	else		{ aa.print("ERROR: Failed to get task! Path = " + sourceTaskPath +";" + taskResult1.getErrorMessage()); }			var taskResult2 = aa.workflow.getTask(capId,targetTaskPath);	if (taskResult2.getSuccess())	{		tTask = taskResult2.getOutput();		aa.print("get task successful : task name = " + tTask.getTaskDescription() + "; Process name = " + tTask.getProcessCode());	}	else		{ aa.print("ERROR: Failed to get task! Path = " + targetTaskPath +";" + taskResult2.getErrorMessage()); }			//change the task name	sTask.setTaskDescription("Copyed task");//sTask.setTaskDescription("Engineering Review(copy)");		taskResult = aa.workflow.copyTask(sTask,tTask,copyPType);	if (taskResult.getSuccess())	{		var processId = tTask.getProcessID();		var stepNum =tTask.getStepNumber();		var taskResult1 = aa.workflow.getTask(capId,stepNum,processId);					if (taskResult1.getSuccess())		{			tTask = taskResult1.getOutput();			aa.print("copy task successful : copied task name = " + tTask.getTaskDescription() + "; Process name = " + tTask.getProcessCode());		}		else			{ aa.print("ERROR: Failed to get task! Path = " + targetTaskPath +";" + taskResult1.getErrorMessage()); return false; }			}	else		{ aa.print("ERROR: Failed to copy task! Path = " + targetTaskPath +";" + taskResult.getErrorMessage()); return false; }			}		//insert  taskfunction insertTask() 	{		// construct CAP ID;	var s_id1 = "08008";    var s_id2 = "00000";    var s_id3 = "00001";	    var s_capResult = aa.cap.getCapID(s_id1, s_id2, s_id3);	var capId ;    if(s_capResult.getSuccess())      capId = s_capResult.getOutput();    else    {      aa.print("ERROR: Failed to get capId: " + s_capResult.getErrorMessage());	  return ;    }			// target task is the last task	var insertTaskPath = "Planning Review";	var taskResult;	var sTask;	var tTask;	//copy as next task 	var insertNType ="N";	//copy as parrallel task	insertPType ="P";		//get the task by the task path	var taskResult1 = aa.workflow.getTask(capId,insertTaskPath);	if (taskResult1.getSuccess())	{		tTask = taskResult1.getOutput();		aa.print("get task successful : task name = " + tTask.getTaskDescription() + "; Process name = " + tTask.getProcessCode());	}	else		{ aa.print("ERROR: Failed to get task! Path = " + insertTaskPath +";" + taskResult1.getErrorMessage()); }			//change the task name	tTask.setTaskDescription("Inserted Task");//sTask.setTaskDescription("Engineering Review(copy)");		taskResult = aa.workflow.insertTask(tTask,insertNType);	if (taskResult.getSuccess())	{		var processId = tTask.getProcessID();		var stepNum =tTask.getStepNumber();		var taskResult1 = aa.workflow.getTask(capId,stepNum,processId);					if (taskResult1.getSuccess())		{			tTask = taskResult1.getOutput();			aa.print("insert task successful : inserted task name = " + tTask.getTaskDescription() + "; Process name = " + tTask.getProcessCode());		}		else			{ aa.print("ERROR: Failed to get task! Path = " + taskPath +";" + taskResult1.getErrorMessage()); return false; }			}	else		{ aa.print("ERROR: Failed to insert task! Path = " + taskPath +";" + taskResult.getErrorMessage()); return false; }			}//remove  taskfunction removeTask() 	{		// construct CAP ID;	var s_id1 = "08008";    var s_id2 = "00000";    var s_id3 = "00001";	    var s_capResult = aa.cap.getCapID(s_id1, s_id2, s_id3);	var capId ;    if(s_capResult.getSuccess())      capId = s_capResult.getOutput();    else    {      aa.print("ERROR: Failed to get capId: " + s_capResult.getErrorMessage());	  return ;    }			// target task is the last task	//var removedTaskPath = "Engineering Review>van insert task";	//task to remove is the first task 	//var removedTaskPath = "Application Acceptance";	var removedTaskPath = "Ready To Issue";	var taskResult;	var tTask;		//get the task by the task path	var taskResult1 = aa.workflow.getTask(capId,removedTaskPath);	if (taskResult1.getSuccess())	{		tTask = taskResult1.getOutput();		aa.print("get task successful : task name = " + tTask.getTaskDescription() + "; Process name = " + tTask.getProcessCode());	}	else		{ aa.print("ERROR: Failed to get task! Path = " + removedTaskPath +";" + taskResult1.getErrorMessage()); }			var processId = tTask.getProcessID();	var stepNum =tTask.getStepNumber();	taskResult = aa.workflow.removeTask(tTask);	if (taskResult.getSuccess())	{				var taskResult1 = aa.workflow.getTask(capId,stepNum,processId);		if (taskResult1.getSuccess())		{ aa.print("ERROR: Failed to remove task! Path = " + removedTaskPath +";" + taskResult1.getErrorMessage()); }				else		{			aa.print("remove task successful : removed task name = " + tTask.getTaskDescription() + "; Process name = " + tTask.getProcessCode());		}	}	else		{ aa.print("ERROR: Failed to remove task! Path = " + removedTaskPath +";" + taskResult.getErrorMessage());  }			}	//insert sub process  function insertSubProcess() 	{		// construct CAP ID;	var s_id1 = "08008";    var s_id2 = "00000";    var s_id3 = "00001";    var isCompleteRequired =true;	    var s_capResult = aa.cap.getCapID(s_id1, s_id2, s_id3);	var capId ;    if(s_capResult.getSuccess())      capId = s_capResult.getOutput();    else    {      aa.print("ERROR: Failed to get capId: " + s_capResult.getErrorMessage());	  return ;    }		var insertTaskPath = "Process";	var taskResult;	var tTask;	var processCode ="BLDG_DEMO";	//get the task by the task path	var taskResult1 = aa.workflow.getTask(capId,insertTaskPath);	if (taskResult1.getSuccess())	{		tTask = taskResult1.getOutput();		aa.print("get task successful : task name = " + tTask.getTaskDescription() + "; Process name = " + tTask.getProcessCode());	}	else		{ aa.print("ERROR: Failed to get task! Path = " + insertTaskPath +";" + taskResult1.getErrorMessage()); }		taskResult = aa.workflow.insertSubProcess(tTask,processCode,isCompleteRequired);	if (taskResult.getSuccess())	{				aa.print("insert Sub Process successful" );			}	else		{ aa.print("ERROR: Failed to insert Sub Process ! Path = " + insertTaskPath +";" + taskResult.getErrorMessage()); return false; }			}			//remove sub process  function removeSubProcess() 	{		// construct CAP ID;	var s_id1 = "08008";    var s_id2 = "00000";    var s_id3 = "00001";	    var s_capResult = aa.cap.getCapID(s_id1, s_id2, s_id3);	var capId ;    if(s_capResult.getSuccess())      capId = s_capResult.getOutput();    else    {      aa.print("ERROR: Failed to get capId: " + s_capResult.getErrorMessage());	  return ;    }		var subProcessPath = "Process";	var taskResult;	var tTask;	var processCode ="BLDG_DEMO";		//get the task by the task path	var taskResult1 = aa.workflow.getTask(capId,subProcessPath);	if (taskResult1.getSuccess())	{		tTask = taskResult1.getOutput();		aa.print("get task successful : task name = " + tTask.getTaskDescription() + "; Process name = " + tTask.getProcessCode());	}	else		{ aa.print("ERROR: Failed to get task! Path = " + subProcessPath +";" + taskResult1.getErrorMessage()); }		taskResult = aa.workflow.removeSubProcess(tTask);	if (taskResult.getSuccess())	{				aa.print("remove Sub Process successful" );		}	else		{ aa.print("ERROR: Failed to remove Sub Process ! Path = " + subProcessPath +";" + taskResult.getErrorMessage()); return false; }			}			//get task status	function getTaskStatus() 	{		// construct CAP ID;	var s_id1 = "08008";    var s_id2 = "00000";    var s_id3 = "00001";	    var s_capResult = aa.cap.getCapID(s_id1, s_id2, s_id3);	var capId ;    if(s_capResult.getSuccess())      capId = s_capResult.getOutput();    else    {      aa.print("ERROR: Failed to get capId: " + s_capResult.getErrorMessage());	  return ;    }			var fTask ;	var taskStatus;	var taskPath = "Application Submittal";		var taskResult = aa.workflow.getTask(capId,taskPath);	var statusDesc = "Pending";	if (taskResult.getSuccess())	{		fTask = taskResult.getOutput();		taskResult = aa.workflow.getTaskStatus(fTask,statusDesc);		if (taskResult.getSuccess())		{			taskStatus = taskResult.getOutput();			aa.print("Get task Status successful ");					}		else		{ aa.print("ERROR: Failed to get task Status !") }			}	else		{ aa.print("ERROR: Failed to get task Status ! ")}				return taskStatus;	}			//edit Task Status	function editTaskStatus() 	{		// construct CAP ID;	var s_id1 = "08008";    var s_id2 = "00000";    var s_id3 = "00001";	    var s_capResult = aa.cap.getCapID(s_id1, s_id2, s_id3);	var capId ;    if(s_capResult.getSuccess())      capId = s_capResult.getOutput();    else    {      aa.print("ERROR: Failed to get capId: " + s_capResult.getErrorMessage());	  return ;    }		var fTask ;	var taskStatus;	var taskPath = "Application Submittal";		var taskResult = aa.workflow.getTask(capId,taskPath);	var statusDesc = "Pending";	if (taskResult.getSuccess())	{		fTask = taskResult.getOutput();		taskResult = aa.workflow.getTaskStatus(fTask,statusDesc);		if (taskResult.getSuccess())		{			taskStatus = taskResult.getOutput();			aa.print("Get task Status successful ");					}		else		{ aa.print("ERROR: Failed to get task Status !") }			}	else		{ aa.print("ERROR: Failed to get task Status ! ")}						if (taskStatus != null)	{				taskStatus.setStatusDescription("updated status");		taskResult = aa.workflow.editTaskStatus(taskStatus );		if (taskResult.getSuccess())		{			aa.print("edit task Status successful ");				}		else		{			aa.print("ERROR: Failed to edit task Status !") 		}					}	else	{ 		aa.print("ERROR: Failed to edit task Status !") 		}	}//create Task Status	function createTaskStatus() 	{		// construct CAP ID;	var s_id1 = "08008";    var s_id2 = "00000";    var s_id3 = "00001";	    var s_capResult = aa.cap.getCapID(s_id1, s_id2, s_id3);	var capId ;    if(s_capResult.getSuccess())      capId = s_capResult.getOutput();    else    {      aa.print("ERROR: Failed to get capId: " + s_capResult.getErrorMessage());	  return ;    }		var fTask ;	var taskStatus;	var taskPath = "Application Submittal";		var taskResult = aa.workflow.getTask(capId,taskPath);	var statusDesc = "Pending";	if (taskResult.getSuccess())	{		fTask = taskResult.getOutput();		taskResult = aa.workflow.getTaskStatus(fTask,statusDesc);		if (taskResult.getSuccess())		{			taskStatus = taskResult.getOutput();			aa.print("Get task Status successful ");					}		else		{ aa.print("ERROR: Failed to get task Status !") }			}	else		{ aa.print("ERROR: Failed to get task Status ! ")}							if (taskStatus != null)	{				taskStatus.setStatusDescription("Created task status");		taskResult = aa.workflow.createTaskStatus(taskStatus );		if (taskResult.getSuccess())		{			aa.print("create task Status successful ");				}		else		{			aa.print("ERROR: Failed to create task Status !") 		}					}	else	{ 		aa.print("ERROR: Failed to create task Status !") 		}	}  