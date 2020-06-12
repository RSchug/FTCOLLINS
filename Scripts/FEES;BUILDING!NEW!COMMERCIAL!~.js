// Script: Fees:Building/New/Commercial/*
// Added when Application Submittal task is OK
// Includes Building/New/Commercial/*
fs1 = "COMBO PERMIT"; fs2 = "CUSTOM"; fs3 = "MANUAL"; fs4 = "MINOR PERMIT"; pe = "FINAL";
if (appMatch("Building/New/Commercial/Com-Ind-Mixed-Use Building")) {
	// From Standard Choice: Fees:Building/New/Commercial/Com-Ind-Mixed-Use Building
	fs1 = "COMBO PERMIT"; fs2 = "CUSTOM"; fs3 = "MANUAL"; fs4 = "MINOR PERMIT"; pe = "FINAL";
	addFee("BPF-SUB", fs1, pe, 1, "N");
	addFee("CT", fs1, pe, 1, "N");
	addFee("CST", fs1, pe, 1, "N");
	if (houseCount > 0) {
		addFee("PN", fs1, pe, houseCount, "N");
		addFee("PC", fs1, pe, houseCount, "N");
		addFee("GGCE-RES", fs1, pe, houseCount, "N");
		addFee("PCE-RES", fs1, pe, houseCount, "N");
		addFee("FCP-RES", fs1, pe, houseCount, "N");
		addFee("TCE-RES", fs1, pe, houseCount, "N");
		addFee("LAR-RES", fs1, pe, houseCount, "N");
	}
	addFee("GGCE-COM", fs1, pe, 1, "N");
	addFee("GGCE-IND", fs1, pe, 1, "N");
	addFee("PCE-COM", fs1, pe, 1, "N");
	addFee("PCE-IND", fs1, pe, 1, "N");
	addFee("FCP-COM", fs1, pe, 1, "N");
	addFee("FCP-IND", fs1, pe, 1, "N");
	addFee("SS", fs2, pe, 0, "N");
	addFee("LAR", fs3, pe, 0, "N");
	addFee("SOC-1", fs1, pe, 0, "N");
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
	addFee("CC", fs1, pe, 0, "N");
} else if (appMatch("Building/New/Commercial/Secondary Building")) {
	// From Standard Choice: Fees:Building/New/Commercial/Secondary Building
	addFee("BPF-SUB", fs1, pe, 1, "N");
	addFee("CT", fs1, pe, 1, "N");
	addFee("CST", fs1, pe, 1, "N");
	addFee("SW", fs3, pe, 0, "N");
}
