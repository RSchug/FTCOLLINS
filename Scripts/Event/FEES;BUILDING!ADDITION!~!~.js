// Script: Fees:Building/Addition/*/*
// Added on Application Submittal
// Includes Building/Addition/Commercial/NA, Building/Addition/Residential/NA & Building/Alteration/Residential/General
fs1 = "COMBO PERMIT"; fs2 = "CUSTOM"; fs3 = "MANUAL"; fs4 = "MINOR PERMIT"; pe = "FINAL";
if (appMatch("Building/Addition/Commercial/NA")) {
	// From Standard Choice: Fees: Building/Addition/Commercial/NA
	addFee("BPF-SUB", fs1, pe, 1, "N");
	addFee("CT", fs1, pe, 1, "N");
	addFee("CST", fs1, pe, 1, "N");
	addFee("PRF", fs1, pe, 1, "N");
	addFee("SPIF", fs3, pe, 0, "N");
	addFee("SDR", fs3, pe, 0, "N");
	addFee("SW", fs3, pe, 0, "N");
	if (AInfo["Com Sq Ft Added"] != null && AInfo["Com Sq Ft Added"] != 0) {
		addFee("GGCE-COM", fs1, pe, 1, "N");
	}
	if (AInfo["Ind Sq Ft Added"] != null && AInfo["Ind Sq Ft Added"] != 0) {
		addFee("GGCE-IND", fs1, pe, 1, "N");
	}
	if (AInfo["Com Sq Ft Added"] != null && AInfo["Com Sq Ft Added"] != 0) {
		addFee("PCE-COM", fs1, pe, 1, "N");
	}
	if (AInfo["Ind Sq Ft Added"] != null && AInfo["Ind Sq Ft Added"] != 0) {
		addFee("PCE-IND", fs1, pe, 1, "N");
	}
	if (AInfo["Com Sq Ft Added"] != null && AInfo["Com Sq Ft Added"] != 0) {
		addFee("FCP-COM", fs1, pe, 1, "N");
	}
	if (AInfo["Ind Sq Ft Added"] != null && AInfo["Ind Sq Ft Added"] != 0) {
		addFee("FCP-IND", fs1, pe, 1, "N");
	}
	addFee("SW1", fs3, pe, 0, "N");
	addFee("LAR", fs3, pe, 0, "N");
	addFee("SOC-1", fs1, pe, 0, "N");
} else if (appMatch("Building/Addition/Residential/NA") || appMatch("Building/Alteration/Residential/General")) {
	// From Standard Choice: Fees: Building/Addition/Residential/NA
	addFee("BPF-SUB", fs1, pe, 1, "N");
	addFee("CT", fs1, pe, 1, "N");
	addFee("CST", fs1, pe, 1, "N");
	addFee("PRF", fs1, pe, 1, "N");
	addFee("SPIF", fs3, pe, 0, "N");
	addFee("SDR", fs3, pe, 0, "N");
	addFee("SW", fs3, pe, 0, "N");
	addFee("SW1", fs3, pe, 0, "N");
}
