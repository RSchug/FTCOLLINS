aa.print("Contact Event Script debug begin");aa.env.setValue("ScriptReturnCode","0");aa.env.setValue("ScriptReturnMessage", "Contact Event process.");var capId = aa.env.getValue("CapId");var contactNbr = aa.env.getValue("ContactNbr");var contactNbrList = aa.env.getValue("ContactNbrList");var currentUserID = aa.env.getValue("CurrentUserID");aa.print("capId :" + capId.toString());aa.print("ContactNbr :" + contactNbr);aa.print("ContactNbrList :" + contactNbrList);aa.print("CurrentUserID :" + currentUserID);aa.print("Contact Event Script debug end");