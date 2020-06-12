// Script: Fees:Building/Misc/*/*
// Added on Application Submittal
// Includes Building/Misc/*/*
fs1 = "COMBO PERMIT"; fs2 = "CUSTOM"; fs3 = "MANUAL"; fs4 = "MINOR PERMIT"; pe = "FINAL";
if (appMatch("Building/Misc/Building Board of Appeals/NA")) {
	// From Standard Choice: Fees: Building/Misc/Building Board of Appeals/NA (Does not exist);
} else if (appMatch("Building/Misc/Contractor Licensing/NA")) {
	// From Standard Choice: Fees: Building/Misc/Contractor Licensing/NA
	addFee("CL", fs3, pe, 0, "N");
	addFee("ENG-CL", fs5, pe, 0, "N");
} else if (appMatch("Building/Misc/General/NA")) {
	// From Standard Choice: Fees: Building/Misc/General/NA
	addFee("GST", fs3, pe, 1, "N");
} else if (appMatch("Building/Misc/Home Occupation License/NA")) {
	// From Standard Choice: Fees: Building/Misc/Home Occupation License/NA
	addFee("HOL", fs3, pe, 1, "N");
} else if (appMatch("Building/Misc/Zoning Board of Appeals/NA")) {
	// From Standard Choice: Fees: Building/Misc/Zoning Board of Appeals/NA
	addFee("ZBOA", fs3, pe, 0, "N");
}