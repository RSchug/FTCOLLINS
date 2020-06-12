// Script: Fees:Building/Minor Amendment/*/*
// Added on Application Submittal
// Includes Fees:Building/Minor Amendment/*/*
fs1 = "COMBO PERMIT"; fs2 = "CUSTOM"; fs3 = "MANUAL"; fs4 = "MINOR PERMIT"; pe = "FINAL";
if (appMatch("Building/Minor Amendment/*/*")) {
	// From Standard Choice: Fees:Building/Minor Amendment/NA/NA
	if (AInfo["Unapproved Dwelling"] != "Yes") {
		addFee("MA", "DEV_REVW", pe, 192, "N");
		addFee("TDR", "DEV_REVW", pe, 158, "N");
	}
}
