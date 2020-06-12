// Script: Fees:Building/New/*/*
// Added on Application Submittal
// Includes Building/New/*/*
fs1 = "COMBO PERMIT"; fs2 = "CUSTOM"; fs3 = "MANUAL"; fs4 = "MINOR PERMIT"; pe = "FINAL";
if (appMatch("Building/New/Commercial/Com-Ind-Mixed-Use Building")
	|| appMatch("Building/New/Commercial/Secondary Building")
	|| appMatch("Building/New/Residential/Duplex")
	|| appMatch("Building/New/Residential/Manufactured Home")
	|| appMatch("Building/New/Residential/Multi-Family")
	|| appMatch("Building/New/Residential/Secondary Building")
	|| appMatch("Building/New/Residential/Single Family Attached")
	|| appMatch("Building/New/Residential/Single Family Detached")) {
	// From Standard Choice Fees: Stock_Plan (split Building/New/Residential/Stock Plan)
	if (AInfo["Stock Plan Number"] != null && AInfo["Stock Plan Number"] != "") {
		addFee("PRF-SP", fs1, pe, 1, "N");
	} else {
		addFee("PRF", fs1, pe, 1, "N");
	}
} else if (appMatch("Building/New/Residential/Stock Plan")) {
	// From Standard Choice Fees: Stock_Plan (split with above)
	addFee("PRF", fs2, pe, 0, "N");
} else if (appMatch("Building/New/Residential/Boarding House Attached")) {
	// From Standard Choice: Fees:Building/New/Residential/Single Family Attached
	addFee("BPF-SUB", fs1, pe, 1, "N");
	addFee("CT", fs1, pe, 1, "N");
	addFee("CST", fs1, pe, 1, "N");
	addFee("PN", fs1, pe, houseCount, "N");
	addFee("PC", fs1, pe, houseCount, "N");
	addFee("GGCE-RES", fs1, pe, houseCount, "N");
	addFee("PCE-RES", fs1, pe, houseCount, "N");
	addFee("FCP-RES", fs1, pe, houseCount, "N");
	addFee("SS", fs1, pe, 1, "N");
	addFee("TCE-RES", fs1, pe, houseCount, "N");
	addFee("LAR-RES", fs1, pe, houseCount, "N");
	addFee("CW", fs3, pe, 0, "N");
	addFee("WDR", fs3, pe, 0, "N");
	addFee("WM", fs3, pe, 0, "N");
	addFee("WPF", fs3, pe, 0, "N");
	addFee("WPIF", fs3, pe, 0, "N");
	addFee("WRT", fs3, pe, 0, "N");
	addFee("SPIF", fs3, pe, 0, "N");
	addFee("SDR", fs3, pe, 0, "N");
	addFee("SW", fs3, pe, 0, "N");
	addFee("SW1", fs3, pe, 0, "N");
	Fees_Stock_Plan_and_School_District();
	if (AInfo["Temp. Elec. Pedestal"] == "Yes") {
		Fees_Temp_Elec_Pedestal();
	}
	addFee("CC", fs1, pe, 0, "N");
} else if (appMatch("Building/New/Residential/Boarding House Detached")) {
	// From Standard Choice: Fees:Building/New/Residential/Single Family Detached
	addFee("BPF-SUB", fs1, pe, 1, "N");
	addFee("CT", fs1, pe, 1, "N");
	addFee("CST", fs1, pe, 1, "N");
	addFee("PN", fs1, pe, houseCount, "N");
	addFee("PC", fs1, pe, houseCount, "N");
	addFee("GGCE-RES", fs1, pe, houseCount, "N");
	addFee("PCE-RES", fs1, pe, houseCount, "N");
	addFee("FCP-RES", fs1, pe, houseCount, "N");
	addFee("SS", fs1, pe, 1, "N");
	addFee("TCE-RES", fs1, pe, houseCount, "N");
	addFee("LAR-RES", fs1, pe, houseCount, "N");
	addFee("CW", fs3, pe, 0, "N");
	addFee("WDR", fs3, pe, 0, "N");
	addFee("WM", fs3, pe, 0, "N");
	addFee("WPF", fs3, pe, 0, "N");
	addFee("WPIF", fs3, pe, 0, "N");
	addFee("WRT", fs3, pe, 0, "N");
	addFee("SPIF", fs3, pe, 0, "N");
	addFee("SDR", fs3, pe, 0, "N");
	addFee("SW", fs3, pe, 0, "N");
	addFee("SW1", fs3, pe, 0, "N");
	Fees_Stock_Plan_and_School_District();
	if (AInfo["Temp. Elec. Pedestal"] == "Yes") {
		Fees_Temp_Elec_Pedestal();
	}
	addFee("CC", fs1, pe, 0, "N");
}
