// Script: Fees:Building/New/Residential/*
// Added when Application Submittal task is OK
// Includes Building/New/Residential/*
fs1 = "COMBO PERMIT"; fs2 = "CUSTOM"; fs3 = "MANUAL"; fs4 = "MINOR PERMIT"; pe = "FINAL";
if (appMatch("Building/New/Residential/Single Family Attached")) {
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
} else if (appMatch("Building/New/Residential/Single Family Detached")) {
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
} else if (appMatch("Building/New/Residential/Duplex")) {
	// From Standard Choice: Fees:Building/New/Residential/Duplex
	addFee("BPF-SUB", fs1, pe, 1, "N");
	addFee("CT", fs1, pe, 1, "N");
	addFee("CST", fs1, pe, 1, "N");

	addFee("PN", fs1, pe, houseCount, "N");
	addFee("PC", fs1, pe, houseCount, "N");
	addFee("GGCE-RES", fs1, pe, houseCount, "N");
	addFee("PCE-RES", fs1, pe, houseCount, "N");
	addFee("FCP-RES", fs1, pe, houseCount, "N");
	addFee("SS", fs1, pe, 1, "N");
	addFee("SO-DUP", fs1, pe, 0, "N");
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
} else if (appMatch("Building/New/Residential/Manufactured Home")) {
	// From Standard Choice: Fees:Building/New/Residential/Manufactured Home
	addFee("BPF-SUB", fs1, pe, 1, "N");
	addFee("CT", fs1, pe, 1, "N");
	addFee("CST", fs1, pe, 1, "N");

	addFee("PN", fs1, pe, houseCount, "N");
	addFee("GGCE-RES", fs1, pe, houseCount, "N");
	addFee("PCE-RES", fs1, pe, houseCount, "N");
	addFee("FCP-RES", fs1, pe, houseCount, "N");
	addFee("SS", fs1, pe, 1, "N");
	addFee("TCE-RES", fs1, pe, houseCount, "N");
	addFee("LAR-RES", fs1, pe, houseCount, "N");
	Fees_Stock_Plan_and_School_District();
	if (AInfo["Temp. Elec. Pedestal"] == "Yes") {
		Fees_Temp_Elec_Pedestal();
	}
	addFee("PC", fs1, pe, houseCount, "N");
} else if (appMatch("Building/New/Residential/Multi-Family")) {
	// From Standard Choice: Fees:Building/New/Residential/Multi-Family
	addFee("BPF-SUB", fs1, pe, 1, "N");
	addFee("CT", fs1, pe, 1, "N");
	addFee("CST", fs1, pe, 1, "N");

	addFee("PN", fs1, pe, houseCount, "N");
	addFee("PC", fs1, pe, houseCount, "N");
	addFee("GGCE-RES", fs1, pe, houseCount, "N");
	addFee("PCE-RES", fs1, pe, houseCount, "N");
	addFee("FCP-RES", fs1, pe, houseCount, "N");
	addFee("SO-M", fs1, pe, 0, "N");
	addFee("LAR-RES", fs1, pe, houseCount, "N");
	addFee("CC", fs1, pe, 0, "N");
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
} else if (appMatch("Building/New/Residential/Secondary Building")) {
	// From Standard Choice: Fees:Building/New/Residential/Secondary Building
	addFee("BPF-SUB", fs1, pe, 1, "N");
	addFee("CT", fs1, pe, 1, "N");
	addFee("CST", fs1, pe, 1, "N");

	addFee("SW", fs3, pe, 0, "N");
	Fees_Stock_Plan_and_School_District();
}