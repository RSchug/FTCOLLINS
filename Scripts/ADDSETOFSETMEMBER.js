/*********************************************************************** * Accela Automation * File:  * Accela, Inc. * Copyright (C): 2011 *  * Description: Add Set Of Set Member. *  * Notes: * * Revision History: **********************************************************************///Set setCode to Add Set Of Set Member.var setCode = "112233";//Child Set ID To Add Set Of Set Membervar childSetID = '09-00015';//Add Set Of Set Member.var result = aa.set.addSetofSetMember(setCode,childSetID);if(result.getSuccess()){	var removeCount = result.getOutput();	aa.print(" Add Success");				aa.print("-----------------------------------------------------------------");}else{	//If Activate fail, then print the error message.	aa.print(result.getErrorMessage());}