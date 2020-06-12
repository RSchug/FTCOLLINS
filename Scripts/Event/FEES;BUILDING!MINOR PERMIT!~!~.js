// Script: Fees:Building/Minor Permit/*/*
// Added on Application Submittal
// Includes Building/Minor Permit/*/*
fs1 = "COMBO PERMIT"; fs2 = "CUSTOM"; fs3 = "MANUAL"; fs4 = "MINOR PERMIT"; pe = "FINAL";
if (appMatch("Building/Minor Permit/Awning/NA") || appMatch("Building/Minor Permit/Fence/NA") || appMatch("Building/Minor Permit/Patio Cover/NA")) {
	// From Standard Choice: Fees: Various Minor Permits
	addFee("BPF-SUB", fs1, pe, 1, "N");
	addFee("CT", fs1, pe, 1, "N");
	addFee("CST", fs1, pe, 1, "N");
	addFee("PRF", fs1, pe, 1, "N");
} else if (appMatch("Building/Minor Permit/Change Of Use/NA")) {
	// From Standard Choice: Fees: Building/Minor Permit/Change Of Use/NA
	addFee("BPF-6", fs4, pe, 1, "N");
} else if (appMatch("Building/Minor Permit/Commercial/Electric Sprinkler Cntrl Clock")) {
	// From Standard Choice: Fees: Various Residential Permits
	addFee("BPF-4", fs4, pe, 1, "N");
	addFee("CT", fs4, pe, 1, "N");
	addFee("CST", fs4, pe, 1, "N");
} else if (appMatch("Building/Minor Permit/Commercial/Sprinkler")) {
	// From Standard Choice: Fees: Building/Minor Permit/Commercial/Sprinkler
	addFee("BPF-4", fs4, pe, 1, "N");
	addFee("CT", fs4, pe, 1, "N");
	addFee("CST", fs4, pe, 1, "N");
} else if (appMatch("Building/Minor Permit/Commercial/Electrical")
	|| appMatch("Building/Minor Permit/Commercial/Fireplace-Wood Burning Stove")
	|| appMatch("Building/Minor Permit/Commercial/Gas Log-Gas Lighter")
	|| appMatch("Building/Minor Permit/Commercial/Mechanical")
	|| appMatch("Building/Minor Permit/Commercial/Plumbing")
	|| appMatch("Building/Minor Permit/Commercial/Roofing - Re-roofing")
	|| appMatch("Building/Minor Permit/Commercial/Water Heater")
	|| appMatch("Building/Minor Permit/Sign/NA")) {
	// From Standard Choice: Fees: Various Minor Commercial Permits
	addFee("BPF", fs4, pe, 1, "N");
	addFee("CT", fs4, pe, 1, "N");
	addFee("CST", fs4, pe, 1, "N");
} else if (appMatch("Building/Minor Permit/Deck/NA") || appMatch("Building/Minor Permit/Storage Shed/NA")) {
	// From Standard Choice: Fees: Minor Permit Deck Storage Shed
	addFee("BPF", fs4, pe, 1, "N");
	addFee("CT", fs4, pe, 1, "N");
	addFee("CST", fs4, pe, 1, "N");
	addFee("PRF", fs4, pe, 1, "N");
} else if (appMatch("Building/Minor Permit/Demolition/NA")) {
	// From Standard Choice: Fees:Building/Minor Permit/Demolition/NA
	addFee("BPF-1", fs4, pe, 1, "N");
} else if (appMatch("Building/Minor Permit/Electric Service Change/NA")) {
	// From Standard Choice: Fees:Building/Minor Permit/Electric Service Change/NA
	addFee("BPF-2", fs4, pe, 1, "N");
	addFee("CT", fs4, pe, 1, "N");
	addFee("CST", fs4, pe, 1, "N");
	addFee("PRF", fs4, pe, 1, "N");
} else if (appMatch("Building/Minor Permit/New Mobile Home/NA")) {
	// From Standard Choice: Fees:Building/Minor Permit/New Mobile Home/NA
	addFee("BPF-4", fs4, pe, 1, "N");
	addFee("PN", fs1, pe, houseCount, "N");
	addFee("PC", fs1, pe, houseCount, "N");
	addFee("GGCE-RES", fs1, pe, houseCount, "N");
	addFee("PCE-RES", fs1, pe, houseCount, "N");
	addFee("FCP-RES", fs1, pe, houseCount, "N");
	addFee("LAR-RES", fs1, pe, houseCount, "N");
	addFee("SPIF", fs3, pe, 0, "N");
	addFee("SDR", fs3, pe, 0, "N");
	addFee("SW", fs3, pe, 0, "N");
	addFee("SW1", fs3, pe, 0, "N");
	addFee("SS-4", fs1, pe, 1, "N");
	addFee("TCE-RES", fs1, pe, houseCount, "N");
} else if (appMatch("Building/Minor Permit/Sales Trailer/NA")) {
	// From Standard Choice: Fees:Building/Minor Permit/Sales Trailer/NA
	addFee("BPF-2", fs4, pe, 1, "N");
} else if (appMatch("Building/Minor Permit/Temporary Structure/NA") || appMatch("Building/Minor Permit/Commercial/Pool") || appMatch("Building/Minor Permit/Residential/Pool")) {
	// From Standard Choice: Fees: Pools and Temp Structure
	addFee("BPF-SUB", fs4, pe, 1, "N");
	addFee("CT", fs4, pe, 1, "N");
	addFee("CST", fs4, pe, 1, "N");
	addFee("PRF", fs4, pe, 1, "N");
}
