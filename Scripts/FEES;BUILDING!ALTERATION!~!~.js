// Script: Fees:Building/Alteration/*/*
// Added on Application Submittal
// Includes Building/Alteration/Commercial/Minor, Building/Alteration/Residential/Minor, Building/OTC/Residential/Basement Finish
fs1 = "COMBO PERMIT"; fs2 = "CUSTOM"; fs3 = "MANUAL"; fs4 = "MINOR PERMIT"; pe = "FINAL";
if (appMatch("Building/Alteration/Commercial/Minor") || appMatch("Building/Alteration/Residential/Minor") || appMatch("Building/OTC/Residential/Basement Finish")) {
	// From Standard Choice: Fees: Various Alteration Permits
	addFee("BPF-SUB", fs1, pe, 1, "N");
	addFee("CT", fs1, pe, 1, "N");
	addFee("CST", fs1, pe, 1, "N");
	if (estValue > 3000 && appMatch("Building/Alteration/Commercial/Minor")) {
		addFee("PRF", fs1, pe, 1, "N");
	} else if (estValue > 3000 && !appMatch("Building/Alteration/Commercial/Minor")) {
		addFee("PRF-1", fs1, pe, 1, "N");
	}
} else if (appMatch("Building/Alteration/Commercial/General") || appMatch("Building/Alteration/Commercial/CFB")) {
	// From Standard Choice: Fees: Building/Alteration/Commercial/General
	addFee("BPF-SUB", fs1, pe, 1, "N");
	addFee("CT", fs1, pe, 1, "N");
	addFee("CST", fs1, pe, 1, "N");
	addFee("PRF", fs1, pe, 1, "N");
	addFee("SPIF", fs3, pe, 0, "N");
	addFee("SDR", fs3, pe, 0, "N");
	addFee("SW", fs3, pe, 0, "N");
	if (appMatch("Building/Alteration/Commercial/*") && AInfo["Change of Use"] == "Yes") {
		addFee("BPF-6", fs4, pe, 1, "N");
	}
}
