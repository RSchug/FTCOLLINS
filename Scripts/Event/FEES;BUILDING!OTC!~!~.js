// Script: Fees:Building/OTC/*/*
// Added on Application Submittal
// Includes Building/OTC/*/*
fs1 = "COMBO PERMIT"; fs2 = "CUSTOM"; fs3 = "MANUAL"; fs4 = "MINOR PERMIT"; pe = "FINAL";
if (appMatch("Building/OTC/Residential/Electric Sprinkler Cntrl Clock")
	|| appMatch("Building/OTC/Residential/Fireplace-Wood Burning Stove")
	|| appMatch("Building/OTC/Residential/Gas Log-Gas Lighter")
	|| appMatch("Building/OTC/Residential/Mechanical")
	|| appMatch("Building/OTC/Residential/Sprinkler")
	|| appMatch("Building/OTC/Residential/Water Heater")) {
	// From Standard Choice: Fees: Various Residential Permits
	addFee("BPF-4", fs4, pe, 1, "N");
	addFee("CT", fs4, pe, 1, "N");
	addFee("CST", fs4, pe, 1, "N");
} else if (appMatch("Building/OTC/Residential/Electrical")
	|| appMatch("Building/OTC/Residential/Plumbing")) {
	// From Standard Choice: Fees: Various Minor Commercial Permits
	addFee("BPF", fs4, pe, 1, "N");
	addFee("CT", fs4, pe, 1, "N");
	addFee("CST", fs4, pe, 1, "N");
} else if (appMatch("Building/OTC/Residential/Mobile Home Installation")) {
	// From Standard Choice: Fees: Building/OTC/Residential/Mobile Home Installation
	addFee("BPF-4", fs4, pe, 1, "N")
} else if (appMatch("Building/OTC/Residential/Roofing - Re-roofing")) {
	// From Standard Choice: Fees: Various OTC Permits 75 Flat Permit Fee
	// Assess 75 dollar flat permit fee and city and county sales/use tax for various OTC building permits
	addFee("BPF-75", fs4, pe, 1, "N");
	addFee("CT", fs4, pe, 1, "N");
	addFee("CST", fs4, pe, 1, "N");
}