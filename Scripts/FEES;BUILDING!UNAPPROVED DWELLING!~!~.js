// Script: Fees:Building/Unapproved Dwelling/*/*
// Added on Application Submittal
// Includes Building/Unapproved Dwelling/Residential/NA
fs1 = "COMBO PERMIT"; fs2 = "CUSTOM"; fs3 = "MANUAL"; fs4 = "MINOR PERMIT"; pe = "FINAL";
if (appMatch("Building/Unapproved Dwelling/Residential/NA")) {
	// From Standard Choice: Fees: Unapproved Dwelling
	addFee("UAD", fs2, pe, 400, "N");
	addFee("BPF-UAD", fs2, pe, 1, "N");
	addFee("CT", fs4, pe, 1, "N");
	addFee("CST", fs4, pe, 1, "N");
}