/*********************************************************************** * Accela Automation * File:  * Accela, Inc. * Copyright (C): 2011 *  * Description: Add Address Set Member. *  * Notes: * * Revision History: **********************************************************************///Set setCode to Add Address Set Member.var setCode = "112233";//Address Number To Add Address Set Membervar addressNumber = 923741691;//Add Address Set Member.var result = aa.set.addAddressSetMember(setCode,addressNumber);if(result.getSuccess()){	var removeCount = result.getOutput();	aa.print(" Add Success");				aa.print("-----------------------------------------------------------------");}else{	//If Activate fail, then print the error message.	aa.print(result.getErrorMessage());}