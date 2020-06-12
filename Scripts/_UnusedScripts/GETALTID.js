var helper = new EMSEHelper();
var capId = helper.getCapId();
var cap = aa.cap.getCap(capId).getOutput();
var capIDString = capId.getCustomID();
var message=aa.env.getValue("PermitId1");
message+="-" + aa.env.getValue("PermitId2");
message+="-" + aa.env.getValue("PermitId3");

 


aa.env.setValue("ScriptReturnCode", "0");
if (message)
	aa.env.setValue("ScriptReturnMessage", message);
//
//
//
function daysDiff(D1, D2) {
    return Math.round((D1 - D2) / 86400000);
}


function daysAdd(D1, N1) {
	return new Date(D1.getTime() + N1*24*60*60*1000);
}

function convertAADateToJava(myDate) {

	// takes an AA date and converts it to Javascript Date object
	// if we have a two digit year, assume that 00-79 is 2000 to 2079
	// assume that 80-99 is 1980 to 1999

var mmonth = myDate.getMonth();
        var yyear = myDate.getYear();
        var dday = myDate.getDayOfMonth();
        var now = new Date();
        var firsttwo = (now.getFullYear() - (now.getFullYear() % 100))
        if (yyear < 80 )
        	yyear+=firsttwo;
        if (yyear >= 80 && yyear < 100) // guess that this is 1900
                yyear+=1900;

	var newDate = new Date(yyear,mmonth-1,dday);
	return newDate
}

function EMSEHelper()
{
  /**
   * Function:      getCapId
   * Description:   To get a CapId object 
   * Parameter:   
   * Return:        return CapIdModel if get successful, failed return null
   */
  this.getCapId = function getCapId()
  {
    var s_id1 = aa.env.getValue("PermitId1");
    var s_id2 = aa.env.getValue("PermitId2");
    var s_id3 = aa.env.getValue("PermitId3");

    var s_capResult = aa.cap.getCapID(s_id1, s_id2, s_id3);
    if(s_capResult.getSuccess())
      return s_capResult.getOutput();
    else
    {
      aa.print("Failed to get capId. " + s_capResult.getErrorMessage());
      return null;
    }
  }

  /**
   * Function:        getCapModel
   * Description:     To get a cap model object 
   * Parameter:       Object capId, string desc
   * Return:          return capModel if get successful, failed return null
   */
  this.getAppSpecInfo = function getAppSpecInfo(capId, desc)
  {
    var s_appSpecInfo = null;
    var s_appSpecInfoResult = null;
    if(capId != null)
    { 
      s_appSpecInfoResult = aa.appSpecificInfo.getByType(capId, desc);
      if(s_appSpecInfoResult.getSuccess())
        s_appSpecInfo = s_appSpecInfoResult.getOutput();
      else 
        aa.print("Failed to get app spec info model. " + s_appSpecInfoResult.getErrorMessage());
    }
    else 
      aa.print("Failed to get app spec info model, capId is null.");
    return s_appSpecInfo;
  }

}