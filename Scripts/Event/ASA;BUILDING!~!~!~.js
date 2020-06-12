// --------------------
// ASA:Building/*/*/*
// --------------------

//  #58: appMatch("Building/*/*/*") ^ branch("ApplicationSubmitAfter:Building");

// ----------
// From Standard Choice: ApplicationSubmitAfter;Building ^`
// ----------
//  #01: {Subdivision Name} != null ^ editAppName({Subdivision Name});
if (AInfo["Subdivision Name"] != null) editAppName(AInfo["Subdivision Name"]);

//  #02: (appMatch("Building/Demolition/*/*") || appMatch("Building/New/Residential/*") || appMatch("Building/Addition/Residential/*")) && ({ParcelAttribute.EAST WEST DISTRICT} == "EAST SIDE" || {ParcelAttribute.EAST WEST DISTRICT} == "WEST SIDE") ^ addAppCondition("Documents","Applied","EAST WEST DISTRICT","Additional Documents Required due to East West District Ordinance","Notice");
if ((appMatch("Building/Demolition/*/*") || appMatch("Building/New/Residential/*") || appMatch("Building/Addition/Residential/*")) && (AInfo["ParcelAttribute.EAST WEST DISTRICT"] == "EAST SIDE" || AInfo["ParcelAttribute.EAST WEST DISTRICT"] == "WEST SIDE")) {
	addAppCondition("Documents","Applied","EAST WEST DISTRICT","Additional Documents Required due to East West District Ordinance","Notice");
}
