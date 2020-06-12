var docRequest = false;			// Document Only -- displays control info in script test window.
var docReqApp = false;			// Document Only -- displays controls by app type in script test window.
/*------------------------------------------------------------------------------------------------------/
| Program: AppSubmitCreateFees.js               
| Event Trigger: ApplicationSubmitAfter
| Client : Fort Collins CO                                  
| SAN# : 05SSP-00448
| 
| Adds fees based on application type, parcel info, app specific info
|                                                                       
| Version 0.1 - Base Version -							8/28/2005 - John Schomp
| Version 0.2 - Pull House Unit from CapDetail, not AInfo.  Various changes     9/01/2005 - John Schomp
| Version 0.3 - Added functionality to calculate res sq ft added                9/27/2005 - John Schomp
| Version 0.4 - Added water and SW fees                                        12/08/2006 - Kristi Kreisher
| Version 0.5 - Added general sales tax to misc permits                        12/08/2006 - Kristi Kreisher
| Version 0.6 - Revisions to accomodate 2007 fees, added stock plan fee for
|		Commercial bldgs, changed default for Elec Sec fees            01/01/2007 - Kristi Kreisher
| Version 0.7 - Corrected plan check fee for commercial minor alt permits      01/08/2007 - Kristi Kreisher

/------------------------------------------------------------------------------------------------------*/
/*------------------------------------------------------------------------------------------------------/
| <===========Configuration=Start================>
| 
| Instructions for implementation consultants...
|
| showmessage = false	Displays a window of debug information to help with setting up controls
|
| showmessage = false	Set to false when the configuration is tuned properly.  Messages display only 
|			on error.
|
| AddControl(name) : 	Adds a new control to the control array.  A control is simply a set of criteria
|			along with action(s) that will occur if the all criteria is met.  
|			"name" is just used for debugging reference.  This functions returns a control 
|			object used to add conditions and update info.
|
| x.criteria.push       Adds criteria statements to the control.  Each criteria will be evaluated as true
|                       or false.  If all criteria for a control evaluate to true, the actions will be exectued.
|
| x.action.push		If all the criteria added are satisfied, these actions will be performed.  This
|			string is evalauated as javascript syntax, and should be the name of a function
|			created specificially for this script.
|
| <=============Examples==========================>
| 
| x = AddControl("Testing Control (05SSP-00448/Cond 2)")
|	x.appType.push("Licenses/Rental Housing/License/NA");
|	x.criteria.push("exists(appTypeString,x.appType)");
|	x.criteria.push("PInfo[\"ZONING DISTRICT\"] == \"R-20\"");
|	x.criteria.push("AInfo[\"HOT WATER HEATER\"] == \"Electric\"");
|	x.action.push("addFee(\"BLDALL010\",fs,pe,1)");
|	x.action.push("addFee(\"BLDALL020\",fs,pe,AInfo[\"NUMBER OF OCCUPANTS\"])");
|
/-----------------------------------------------------------------------------------------------------*/
var showMessage = false;			// Set to true to see results in popup window
var showDebug = false;			// Set to true to see debug messages in popup window
var MCA = 	new Array();  		// Master Control Array
var x = 	null;			// Temporary Control Object
var fs1 = 	"COMBO PERMIT";		// Fee Schedule used on added fees
var fs2 = 	"CUSTOM";		// Fee Schedule used on added fees
var fs3 = 	"MANUAL";		// Fee Schedule used on added fees
var fs4 = 	"MINOR PERMIT";		// Fee Schedule used on added fees
var pe = 	"FINAL";		// Period to use on added fees
	
//-----------------------------------------------------------------------------------------------------*/
// CALCULATE RES SQ FT ADDED
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("Calculate Res Sq Ft Added")
	x.action.push("calcAvgResSqFtAdded(\"Avg Res Sq Ft Added (Calculated)\",\"Res Sq Ft Added\",houseCount)");

//x = AddControl("Update Res Sq Ft Added")
//        x.criteria.push("AInfo[\"Avg Res Sq Ft Added (Calculated)\"] <= 0");

//-----------------------------------------------------------------------------------------------------*/
// CONDITION 1  : SINGLE FAMILY ATTACHED
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("Single Family Attached (05SSP-00448/Cond 1)")
	x.appType.push("Building/New/Residential/Single Family Attached");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"BPF-SUB\",fs1,pe,1)");
	x.action.push("addFee(\"CT\",fs1,pe,1)");
	x.action.push("addFee(\"CST\",fs1,pe,1)");
	x.action.push("addFee(\"PN\",fs1,pe,houseCount)");
	x.action.push("addFee(\"PC\",fs1,pe,houseCount)");
	x.action.push("addFee(\"LCE\",fs1,pe,houseCount)");
	x.action.push("addFee(\"GGCE-RES\",fs1,pe,houseCount)");
	x.action.push("addFee(\"PCE-RES\",fs1,pe,houseCount)");
	x.action.push("addFee(\"FCP-RES\",fs1,pe,houseCount)");
//	x.action.push("addFee(\"SS\",fs2,pe,0)");
	x.action.push("addFee(\"SS-2\",fs1,pe,1)");
	x.action.push("addFee(\"SO-A\",fs1,pe,houseCount)");
	x.action.push("addFee(\"LAR-RES\",fs1,pe,houseCount)");
	x.action.push("addFee(\"CW\",fs3,pe,0)");
	x.action.push("addFee(\"WDR\",fs3,pe,0)");
	x.action.push("addFee(\"WM\",fs3,pe,0)");
	x.action.push("addFee(\"WPF\",fs3,pe,0)");
	x.action.push("addFee(\"WPIF\",fs3,pe,0)");
	x.action.push("addFee(\"WRT\",fs3,pe,0)");
	x.action.push("addFee(\"SPIF\",fs3,pe,0)");
	x.action.push("addFee(\"SDR\",fs3,pe,0)");
	x.action.push("addFee(\"SW\",fs3,pe,0)");
	x.action.push("addFee(\"SW1\",fs3,pe,0)");
//-----------------------------------------------------------------------------------------------------*/
// CONDITION 2 : SINGLE FAMILY DETACHED
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("Single Family Detached (05SSP-00448/Cond 2)")
	x.appType.push("Building/New/Residential/Single Family Detached");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"BPF-SUB\",fs1,pe,1)");
	x.action.push("addFee(\"CT\",fs1,pe,1)");
	x.action.push("addFee(\"CST\",fs1,pe,1)");
	x.action.push("addFee(\"PN\",fs1,pe,houseCount)");
	x.action.push("addFee(\"PC\",fs1,pe,houseCount)");
	x.action.push("addFee(\"LCE\",fs1,pe,houseCount)");
	x.action.push("addFee(\"GGCE-RES\",fs1,pe,houseCount)");
	x.action.push("addFee(\"PCE-RES\",fs1,pe,houseCount)");
	x.action.push("addFee(\"FCP-RES\",fs1,pe,houseCount)");
//	x.action.push("addFee(\"SS\",fs2,pe,0)");
	x.action.push("addFee(\"SS-2\",fs1,pe,1)");
	x.action.push("addFee(\"SO-D\",fs1,pe,houseCount)");
	x.action.push("addFee(\"LAR-D\",fs1,pe,houseCount)");
	x.action.push("addFee(\"CW\",fs3,pe,0)");
	x.action.push("addFee(\"WDR\",fs3,pe,0)");
	x.action.push("addFee(\"WM\",fs3,pe,0)");
	x.action.push("addFee(\"WPF\",fs3,pe,0)");
	x.action.push("addFee(\"WPIF\",fs3,pe,0)");
	x.action.push("addFee(\"WRT\",fs3,pe,0)");
	x.action.push("addFee(\"SPIF\",fs3,pe,0)");
	x.action.push("addFee(\"SDR\",fs3,pe,0)");
	x.action.push("addFee(\"SW\",fs3,pe,0)");
	x.action.push("addFee(\"SW1\",fs3,pe,0)");	
//-----------------------------------------------------------------------------------------------------*/
// CONDITION 3 : MULTI-FAMILY
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("Multi-Family (05SSP-00448/Cond 3)")
	x.appType.push("Building/New/Residential/Multi-Family");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"BPF-SUB\",fs1,pe,1)");
	x.action.push("addFee(\"CT\",fs1,pe,1)");
	x.action.push("addFee(\"CST\",fs1,pe,1)");
	x.action.push("addFee(\"PN\",fs1,pe,houseCount)");
	x.action.push("addFee(\"PC\",fs1,pe,houseCount)");
	x.action.push("addFee(\"LCE\",fs1,pe,houseCount)");
	x.action.push("addFee(\"GGCE-RES\",fs1,pe,houseCount)");
	x.action.push("addFee(\"PCE-RES\",fs1,pe,houseCount)");
	x.action.push("addFee(\"FCP-RES\",fs1,pe,houseCount)");
//	x.action.push("addFee(\"SS\",fs2,pe,0)");
	x.action.push("addFee(\"SS-2\",fs1,pe,1)");
	x.action.push("addFee(\"SO-M\",fs1,pe,houseCount)");
	x.action.push("addFee(\"LAR-RES\",fs1,pe,houseCount)");
	x.action.push("addFee(\"CW\",fs3,pe,0)");
	x.action.push("addFee(\"WDR\",fs3,pe,0)");
	x.action.push("addFee(\"WM\",fs3,pe,0)");
	x.action.push("addFee(\"WPF\",fs3,pe,0)");
	x.action.push("addFee(\"WPIF\",fs3,pe,0)");
	x.action.push("addFee(\"WRT\",fs3,pe,0)");
	x.action.push("addFee(\"SPIF\",fs3,pe,0)");
	x.action.push("addFee(\"SDR\",fs3,pe,0)");
	x.action.push("addFee(\"SW\",fs3,pe,0)");
	x.action.push("addFee(\"SW1\",fs3,pe,0)");
//-----------------------------------------------------------------------------------------------------*/
// CONDITION 4 : DUPLEX
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("Duplex (05SSP-00448/Cond 4)")
	x.appType.push("Building/New/Residential/Duplex");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"BPF-SUB\",fs1,pe,1)");
	x.action.push("addFee(\"CT\",fs1,pe,1)");
	x.action.push("addFee(\"CST\",fs1,pe,1)");
	x.action.push("addFee(\"PN\",fs1,pe,houseCount)");
	x.action.push("addFee(\"PC\",fs1,pe,houseCount)");
	x.action.push("addFee(\"LCE\",fs1,pe,houseCount)");
	x.action.push("addFee(\"GGCE-RES\",fs1,pe,houseCount)");
	x.action.push("addFee(\"PCE-RES\",fs1,pe,houseCount)");
	x.action.push("addFee(\"FCP-RES\",fs1,pe,houseCount)");
//	x.action.push("addFee(\"SS\",fs2,pe,0)");
	x.action.push("addFee(\"SS-2\",fs1,pe,1)");
	x.action.push("addFee(\"SO-DUP\",fs1,pe,houseCount)");
	x.action.push("addFee(\"LAR-RES\",fs1,pe,houseCount)");
	x.action.push("addFee(\"CW\",fs3,pe,0)");
	x.action.push("addFee(\"WDR\",fs3,pe,0)");
	x.action.push("addFee(\"WM\",fs3,pe,0)");
	x.action.push("addFee(\"WPF\",fs3,pe,0)");
	x.action.push("addFee(\"WPIF\",fs3,pe,0)");
	x.action.push("addFee(\"WRT\",fs3,pe,0)");
	x.action.push("addFee(\"SPIF\",fs3,pe,0)");
	x.action.push("addFee(\"SDR\",fs3,pe,0)");
	x.action.push("addFee(\"SW\",fs3,pe,0)");
	x.action.push("addFee(\"SW1\",fs3,pe,0)");
//-----------------------------------------------------------------------------------------------------*/
// CONDITION 5 : SECONDARY BUILDING
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("Secondary Building (05SSP-00448/Cond 5)")
	x.appType.push("Building/New/Residential/Secondary Building");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"BPF-SUB\",fs1,pe,1)");
	x.action.push("addFee(\"CT\",fs1,pe,1)");
	x.action.push("addFee(\"CST\",fs1,pe,1)");
	x.action.push("addFee(\"SW\",fs3,pe,0)");
//-----------------------------------------------------------------------------------------------------*/
// CONDITION 6 : MANUFACTURED HOME
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("Manufactured Home (05SSP-00448/Cond 6)")
	x.appType.push("Building/New/Residential/Manufactured Home");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"BPF-SUB\",fs1,pe,1)");
	x.action.push("addFee(\"CT\",fs1,pe,1)");
	x.action.push("addFee(\"CST\",fs1,pe,1)");
	x.action.push("addFee(\"PN\",fs1,pe,houseCount)");
	x.action.push("addFee(\"PC\",fs1,pe,houseCount)");
	x.action.push("addFee(\"LCE\",fs1,pe,houseCount)");
	x.action.push("addFee(\"GGCE-RES\",fs1,pe,houseCount)");
	x.action.push("addFee(\"PCE-RES\",fs1,pe,houseCount)");
	x.action.push("addFee(\"FCP-RES\",fs1,pe,houseCount)");
//	x.action.push("addFee(\"SS\",fs2,pe,0)");
	x.action.push("addFee(\"SS-2\",fs1,pe,1)");
	x.action.push("addFee(\"SO-D\",fs1,pe,houseCount)");
	x.action.push("addFee(\"LAR-D\",fs1,pe,houseCount)");
//-----------------------------------------------------------------------------------------------------*/
// CONDITION 7 : Building/Addition/Residential/NA or Building/Alteration/Residential/General
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("Residential NA/General (05SSP-00448/Cond 7)")
	x.appType.push("Building/Addition/Residential/NA");
	x.appType.push("Building/Alteration/Residential/General");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"BPF-SUB\",fs1,pe,1)");
	x.action.push("addFee(\"CT\",fs1,pe,1)");
	x.action.push("addFee(\"CST\",fs1,pe,1)");
	x.action.push("addFee(\"PRF\",fs1,pe,1)");
	x.action.push("addFee(\"SPIF\",fs3,pe,0)");
	x.action.push("addFee(\"SDR\",fs3,pe,0)");
	x.action.push("addFee(\"SW\",fs3,pe,0)");
	x.action.push("addFee(\"SW1\",fs3,pe,0)");
//-----------------------------------------------------------------------------------------------------*/
// CONDITION 8 : Building/New/Commercial/Com-Ind-Mixed-Use Building
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("Manufactured Home (05SSP-00448/Cond 8)")
	x.appType.push("Building/New/Commercial/Com-Ind-Mixed-Use Building");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"BPF-SUB\",fs1,pe,1)");
	x.action.push("addFee(\"CT\",fs1,pe,1)");
	x.action.push("addFee(\"CST\",fs1,pe,1)");
	x.action.push("addFee(\"PN\",fs1,pe,houseCount)");
	x.action.push("addFee(\"PC\",fs1,pe,houseCount)");
	x.action.push("addFee(\"LCE\",fs1,pe,houseCount)");
	x.action.push("addFee(\"GGCE-RES\",fs1,pe,houseCount)");
	x.action.push("addFee(\"GGCE-COM\",fs1,pe,1)");
	x.action.push("addFee(\"GGCE-IND\",fs1,pe,1)");
	x.action.push("addFee(\"PCE-RES\",fs1,pe,houseCount)");
	x.action.push("addFee(\"PCE-COM\",fs1,pe,1)");
	x.action.push("addFee(\"PCE-IND\",fs1,pe,1)");
	x.action.push("addFee(\"FCP-RES\",fs1,pe,houseCount)");
	x.action.push("addFee(\"FCP-COM\",fs1,pe,1)");
	x.action.push("addFee(\"FCP-IND\",fs1,pe,1)");
	x.action.push("addFee(\"SS\",fs2,pe,0)");
	x.action.push("addFee(\"LAR\",fs3,pe,0)");
	x.action.push("addFee(\"SOC-1\",fs1,pe,0)");
	x.action.push("addFee(\"SO-A\",fs1,pe,houseCount)");
	x.action.push("addFee(\"LAR-RES\",fs1,pe,houseCount)");
	x.action.push("addFee(\"CW\",fs3,pe,0)");
	x.action.push("addFee(\"WDR\",fs3,pe,0)");
	x.action.push("addFee(\"WM\",fs3,pe,0)");
	x.action.push("addFee(\"WPF\",fs3,pe,0)");
	x.action.push("addFee(\"WPIF\",fs3,pe,0)");
	x.action.push("addFee(\"WRT\",fs3,pe,0)");
	x.action.push("addFee(\"SPIF\",fs3,pe,0)");
	x.action.push("addFee(\"SDR\",fs3,pe,0)");
	x.action.push("addFee(\"SW\",fs3,pe,0)");
	x.action.push("addFee(\"SW1\",fs3,pe,0)");
//-----------------------------------------------------------------------------------------------------*/
// CONDITION 9 : Building/Addition/Commercial/NA or Building/Alteration/Commercial/General
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("Commercial Addition & Alteration (05SSP-00448/Cond 9)")
	x.appType.push("Building/Addition/Commercial/NA");
	x.appType.push("Building/Alteration/Commercial/General");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"BPF-SUB\",fs1,pe,1)");
	x.action.push("addFee(\"CT\",fs1,pe,1)");
	x.action.push("addFee(\"CST\",fs1,pe,1)");
	x.action.push("addFee(\"PRF\",fs1,pe,1)");
	x.action.push("addFee(\"SPIF\",fs3,pe,0)");
	x.action.push("addFee(\"SDR\",fs3,pe,0)");
	x.action.push("addFee(\"SW\",fs3,pe,0)");
	x.action.push("addFee(\"SW1\",fs3,pe,0)");
//-----------------------------------------------------------------------------------------------------*/
// CONDITION 10,11,12 : Various
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("Various Permits (05SSP-00448/Cond 10)")
	x.appType.push("Building/Minor Permit/Awning/NA");
	x.appType.push("Building/Minor Permit/Fence/NA");
	x.appType.push("Building/Minor Permit/Patio Cover/NA");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"BPF-SUB\",fs1,pe,1)");
	x.action.push("addFee(\"CT\",fs1,pe,1)");
	x.action.push("addFee(\"CST\",fs1,pe,1)");
	x.action.push("addFee(\"PRF\",fs4,pe,1)");

x = AddControl("Various Permits (05SSP-00448/Cond 11)")
	x.appType.push("Building/Alteration/Commercial/Minor");
	x.appType.push("Building/Alteration/Residential/Minor");
	x.appType.push("Building/OTC/Residential/Basement Finish");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"BPF-SUB\",fs4,pe,1)");
	x.action.push("addFee(\"CT\",fs4,pe,1)");
	x.action.push("addFee(\"CST\",fs4,pe,1)");

x = AddControl("Various Permits (05SSP-00448/Cond 12)")
	x.appType.push("Building/Minor Permit/Temporary Structure/NA");
	x.appType.push("Building/Minor Permit/Commercial/Pool");
	x.appType.push("Building/Minor Permit/Residential/Pool");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"BPF-SUB\",fs4,pe,1)");
	x.action.push("addFee(\"CT\",fs4,pe,1)");
	x.action.push("addFee(\"CST\",fs4,pe,1)");
	x.action.push("addFee(\"PRF\",fs4,pe,1)");
//-----------------------------------------------------------------------------------------------------*/
// CONDITION 13: DEMOLITION
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("Demolition (05SSP-00448/Cond 13)")
	x.appType.push("Building/Minor Permit/Demolition/NA");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"BPF-1\",fs4,pe,1)");
//	x.action.push("addFee(\"PRF\",fs4,pe,1)");
//-----------------------------------------------------------------------------------------------------*/
// CONDITION 14,17: DECK, STORAGE SHED, VARIOUS
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("Various Permits (05SSP-00448/Cond 14,17)")
	x.appType.push("Building/Minor Permit/Deck/NA");
	x.appType.push("Building/Minor Permit/Storage Shed/NA");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"BPF\",fs4,pe,1)");
	x.action.push("addFee(\"CT\",fs4,pe,1)");
	x.action.push("addFee(\"CST\",fs4,pe,1)");
	x.action.push("addFee(\"PRF\",fs4,pe,1)");

x = AddControl("Various Permits (05SSP-00448/Cond 14,17)")
	x.appType.push("Building/Minor Permit/Sign/NA");
	x.appType.push("Building/Minor Permit/Commercial/Electrical");
	x.appType.push("Building/Minor Permit/Commercial/Fireplace-Wood Burning Stove");
	x.appType.push("Building/Minor Permit/Commercial/Gas Log-Gas Lighter");
	x.appType.push("Building/Minor Permit/Commercial/Mechanical");
	x.appType.push("Building/Minor Permit/Commercial/Plumbing");
	x.appType.push("Building/Minor Permit/Commercial/Roofing - Re-roofing");
	x.appType.push("Building/Minor Permit/Commercial/Water Heater");
	x.appType.push("Building/OTC/Residential/Electrical");
	x.appType.push("Building/OTC/Residential/Plumbing");
	x.appType.push("Building/OTC/Residential/Roofing - Re-roofing");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"BPF\",fs4,pe,1)");
	x.action.push("addFee(\"CT\",fs4,pe,1)");
	x.action.push("addFee(\"CST\",fs4,pe,1)");
//-----------------------------------------------------------------------------------------------------*/
// CONDITION 15: CHANGE OF USE 
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("Change of Use/Storage Shed (05SSP-00448/Cond 15)")
	x.appType.push("Building/Minor Permit/Change Of Use/NA");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"BPF-1\",fs4,pe,1)");
//-----------------------------------------------------------------------------------------------------*/
// CONDITION 16: ELECTRIC SERVICE CHANGE
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("Electric Service Change (05SSP-00448/Cond 16)")
	x.appType.push("Building/Minor Permit/Electric Service Change/NA");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"BPF-3\",fs4,pe,1)");
	x.action.push("addFee(\"CT\",fs4,pe,1)");
	x.action.push("addFee(\"CST\",fs4,pe,1)");
	x.action.push("addFee(\"PRF\",fs4,pe,1)");
//-----------------------------------------------------------------------------------------------------*/
// CONDITION 18: NEW MOBILE HOME
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("New Mobile Home (05SSP-00448/Cond 18)")
	x.appType.push("Building/Minor Permit/New Mobile Home/NA");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"BPF-4\",fs4,pe,1)");
	x.action.push("addFee(\"PN\",fs1,pe,houseCount)");
	x.action.push("addFee(\"PC\",fs1,pe,houseCount)");
	x.action.push("addFee(\"LCE\",fs1,pe,houseCount)");
	x.action.push("addFee(\"GGCE-RES\",fs1,pe,houseCount)");
	x.action.push("addFee(\"PCE-RES\",fs1,pe,houseCount)");
	x.action.push("addFee(\"FCP-RES\",fs1,pe,houseCount)");
	x.action.push("addFee(\"SO-MH\",fs1,pe,houseCount)");
	x.action.push("addFee(\"LAR-NMH\",fs1,pe,houseCount)");
	x.action.push("addFee(\"SPIF\",fs3,pe,0)");
	x.action.push("addFee(\"SDR\",fs3,pe,0)");
	x.action.push("addFee(\"SW\",fs3,pe,0)");
	x.action.push("addFee(\"SW1\",fs3,pe,0)");
//-----------------------------------------------------------------------------------------------------*/
// CONDITION 19: NEW SALES TRAILER
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("New Sales Trailer (05SSP-00448/Cond 19)")
	x.appType.push("Building/Minor Permit/Sales Trailer/NA");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"BPF-2\",fs4,pe,1)");
//-----------------------------------------------------------------------------------------------------*/
// CONDITION 20: VARIOUS RESIDENTIAL
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("Various Residential Permits (05SSP-00448/Cond 20)")
	x.appType.push("Building/Minor Permit/Commercial/Electric Sprinkler Cntrl Clock");
	x.appType.push("Building/OTC/Residential/Electric Sprinkler Cntrl Clock");
	x.appType.push("Building/OTC/Residential/Fireplace-Wood Burning Stove");
	x.appType.push("Building/OTC/Residential/Gas Log-Gas Lighter");
	x.appType.push("Building/OTC/Residential/Mechanical");
	x.appType.push("Building/OTC/Residential/Sprinkler");
	x.appType.push("Building/OTC/Residential/Water Heater");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"BPF-3\",fs4,pe,1)");
	x.action.push("addFee(\"CT\",fs4,pe,1)");
	x.action.push("addFee(\"CST\",fs4,pe,1)");
//-----------------------------------------------------------------------------------------------------*/
// CONDITION 21: MOBILE HOME INSTALLATION
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("Mobile Home Installation (05SSP-00448/Cond 21)")
	x.appType.push("Building/OTC/Residential/Mobile Home Installation");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"BPF-4\",fs4,pe,1)");
//-----------------------------------------------------------------------------------------------------*/
// CONDITION 22: COMMERCIAL SPRINKLER
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("Commercial Sprinkler (05SSP-00448/Cond 22)")
	x.appType.push("Building/Minor Permit/Commercial/Sprinkler");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"BPF-5\",fs4,pe,1)");
	x.action.push("addFee(\"CT\",fs4,pe,1)");
	x.action.push("addFee(\"CST\",fs4,pe,1)");
//-----------------------------------------------------------------------------------------------------*/
// CONDITION 24: BUILDING BOARD OF APPEALS
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("Building Board of Appeals (05SSP-00448/Cond 24)")
	x.appType.push("Building/Misc/Building Board of Appeals/NA");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"BRB\",fs3,pe,1)");
//-----------------------------------------------------------------------------------------------------*/
// CONDITION 25: ZONING BOARD OF APPEALS
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("Zoning Board of Appeals (05SSP-00448/Cond 25)")
	x.appType.push("Building/Misc/Zoning Board of Appeals/NA");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"ZBOA\",fs3,pe,0)");
//-----------------------------------------------------------------------------------------------------*/
// CONDITION 26: HOME OCCUPATION
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("Home Occupation (05SSP-00448/Cond 26)")
	x.appType.push("Building/Misc/Home Occupation License/NA");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"HOL\",fs3,pe,1)");
//-----------------------------------------------------------------------------------------------------*/
// CONDITION 27: MINOR AMENDMENT
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("Minor Amendment (05SSP-00448/Cond 27)")
	x.appType.push("Building/Minor Amendment/NA/NA");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"MA\",fs3,pe,1)");
//-----------------------------------------------------------------------------------------------------*/
// CONDITION 28: Contractor Licensing
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("Contractor Licensing (05SSP-00448/Cond 28)")
	x.appType.push("Building/Misc/Contractor Licensing/NA");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"CL\",fs3,pe,0)");
//-----------------------------------------------------------------------------------------------------*/
// CONDITION 29: Misc Sales Tax
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("General (05SSP-00448/Cond 29)")
	x.appType.push("Building/Misc/General/NA");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.action.push("addFee(\"GST\",fs3,pe,1)");
//-----------------------------------------------------------------------------------------------------*/
// SUB-CONDITIONS 1-7 for CONDITIONS 1-9
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("STOCK PLAN NUMBER (05SSP-00448/Sub 1)")
	x.appType.push("Building/New/Residential/Single Family Attached");
	x.appType.push("Building/New/Residential/Single Family Detached");
	x.appType.push("Building/New/Residential/Multi-Family");
	x.appType.push("Building/New/Residential/Duplex");
	x.appType.push("Building/New/Residential/Secondary Building");
	x.appType.push("Building/New/Residential/Manufactured Home");
	x.appType.push("Building/New/Commercial/Com-Ind-Mixed-Use Building");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.criteria.push("AInfo[\"STOCK PLAN NUMBER\"] != \"\" && AInfo[\"STOCK PLAN NUMBER\"] != null");
	x.action.push("addFee(\"PRF-SP\",fs1,pe,1)");

x = AddControl("no STOCK PLAN NUMBER (05SSP-00448/Sub 2)")
	x.appType.push("Building/New/Residential/Single Family Attached");
	x.appType.push("Building/New/Residential/Single Family Detached");
	x.appType.push("Building/New/Residential/Multi-Family");
	x.appType.push("Building/New/Residential/Duplex");
	x.appType.push("Building/New/Residential/Secondary Building");
	x.appType.push("Building/New/Residential/Manufactured Home");
	x.appType.push("Building/New/Commercial/Com-Ind-Mixed-Use Building");
	x.criteria.push("exists(appTypeString,x.appType)");
        x.criteria.push("AInfo[\"STOCK PLAN NUMBER\"] == \"\" || AInfo[\"STOCK PLAN NUMBER\"] == null");
	x.action.push("addFee(\"PRF\",fs1,pe,1)");

x = AddControl("Thompson Valley School District (05SSP-00448/Sub 3)")
	x.appType.push("Building/New/Residential/Single Family Attached");
	x.appType.push("Building/New/Residential/Single Family Detached");
	x.appType.push("Building/New/Residential/Multi-Family");
	x.appType.push("Building/New/Residential/Duplex");
	x.appType.push("Building/New/Residential/Manufactured Home");
	x.appType.push("Building/Minor Permit/New Mobile Home/NA");
	x.appType.push("Building/New/Commercial/Com-Ind-Mixed-Use Building");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.criteria.push("PInfo[\"SCHOOL DISTRICT\"] == \"Thompson Valley\"");
	x.criteria.push("houseCount < 5");
	x.action.push("addFee(\"TSD\",fs1,pe,houseCount)");


x = AddControl("Thompson Valley School District (05SSP-00448/Sub 4)")
	x.appType.push("Building/New/Residential/Single Family Attached");
	x.appType.push("Building/New/Residential/Single Family Detached");
	x.appType.push("Building/New/Residential/Multi-Family");
	x.appType.push("Building/New/Residential/Duplex");
	x.appType.push("Building/New/Residential/Manufactured Home");
	x.appType.push("Building/Minor Permit/New Mobile Home/NA");
	x.appType.push("Building/New/Commercial/Com-Ind-Mixed-Use Building");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.criteria.push("PInfo[\"SCHOOL DISTRICT\"] == \"Thompson Valley\"");
	x.criteria.push("houseCount > 4");
	x.action.push("addFee(\"TSD-5\",fs1,pe,houseCount)");

x = AddControl("Poudre School District (05SSP-00448/Sub 5)")
	x.appType.push("Building/New/Residential/Single Family Attached");
	x.appType.push("Building/New/Residential/Single Family Detached");
	x.appType.push("Building/New/Residential/Multi-Family");
	x.appType.push("Building/New/Residential/Duplex");
	x.appType.push("Building/New/Residential/Manufactured Home");
	x.appType.push("Building/Minor Permit/New Mobile Home/NA");
	x.appType.push("Building/New/Commercial/Com-Ind-Mixed-Use Building");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.criteria.push("PInfo[\"SCHOOL DISTRICT\"] == \"Poudre\"");
	x.criteria.push("houseCount < 5");
	x.action.push("addFee(\"PSD\",fs1,pe,houseCount)");


x = AddControl("Poudre School District (05SSP-00448/Sub 6)")
	x.appType.push("Building/New/Residential/Single Family Attached");
	x.appType.push("Building/New/Residential/Single Family Detached");
	x.appType.push("Building/New/Residential/Multi-Family");
	x.appType.push("Building/New/Residential/Duplex");
	x.appType.push("Building/New/Residential/Manufactured Home");
	x.appType.push("Building/Minor Permit/New Mobile Home/NA");
	x.appType.push("Building/New/Commercial/Com-Ind-Mixed-Use Building");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.criteria.push("PInfo[\"SCHOOL DISTRICT\"] == \"Poudre\"");
	x.criteria.push("houseCount > 4");
	x.action.push("addFee(\"PSD-5\",fs1,pe,houseCount)");


//x = AddControl("150AMP Breaker (05SSP-00448/Sub 5)")
//	x.appType.push("Building/New/Residential/Single Family Attached");
//	x.appType.push("Building/New/Residential/Single Family Detached");
//	x.appType.push("Building/New/Residential/Multi-Family");
//	x.appType.push("Building/New/Residential/Duplex");
////	x.appType.push("Building/New/Residential/Manufactured Home");
//	x.criteria.push("exists(appTypeString,x.appType)");
//	x.criteria.push("AInfo[\"ELEC. BREAKER SIZE\"] == \"150 AMPS\"");
//	x.action.push("addFee(\"SS-1\",fs1,pe,1)");
	
//x = AddControl("200AMP Breaker (05SSP-00448/Sub 6)")
//	x.appType.push("Building/New/Residential/Single Family Attached");
//	x.appType.push("Building/New/Residential/Single Family Detached");
//	x.appType.push("Building/New/Residential/Multi-Family");
//	x.appType.push("Building/New/Residential/Duplex");
//	x.appType.push("Building/New/Residential/Manufactured Home");
//	x.criteria.push("exists(appTypeString,x.appType)");
//	x.criteria.push("AInfo[\"ELEC. BREAKER SIZE\"] == \"200 AMPS\"");
//	x.action.push("addFee(\"SS-2\",fs1,pe,1)");

x = AddControl("Temp Elec. Pedestal is Y (05SSP-00448/Sub 7)")
	x.appType.push("Building/New/Residential/Single Family Attached");
	x.appType.push("Building/New/Residential/Single Family Detached");
	x.appType.push("Building/New/Residential/Multi-Family");
	x.appType.push("Building/New/Residential/Duplex");
	x.appType.push("Building/New/Residential/Manufactured Home");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.criteria.push("AInfo[\"TEMP. ELEC. PEDESTAL\"] == \"Yes\"");
	x.action.push("addFee(\"CET\",fs1,pe,1)");
	x.action.push("addFee(\"CR\",fs1,pe,1)");
	x.action.push("addFee(\"PIL\",fs1,pe,1)");
	x.action.push("addFee(\"STCO\",fs1,pe,1)");
	x.action.push("addFee(\"TP\",fs1,pe,1)");

x = AddControl("Energy Rebate is Y (05SSP-00448/Sub 8)")
	x.appType.push("Building/New/Residential/Single Family Attached");
	x.appType.push("Building/New/Residential/Single Family Detached");
	x.appType.push("Building/New/Residential/Multi-Family");
	x.appType.push("Building/New/Residential/Duplex");
        x.appType.push("Building/New/Residential/Secondary Building");
	x.appType.push("Building/New/Residential/Manufactured Home");
//	x.appType.push("Building/New/Commercial/Com-Ind-Mixed-Use Building");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.criteria.push("AInfo[\"ENERGY REBATE\"] == \"Yes\"");
	x.action.push("addFee(\"BPF-DISC\",fs1,pe,1)");

x = AddControl("Energy Rebate is N (05SSP-00448/Sub 8)")
	x.appType.push("Building/New/Residential/Single Family Attached");
	x.appType.push("Building/New/Residential/Single Family Detached");
	x.appType.push("Building/New/Residential/Multi-Family");
	x.appType.push("Building/New/Residential/Duplex");
        x.appType.push("Building/New/Residential/Secondary Building");
	x.appType.push("Building/New/Residential/Manufactured Home");
//	x.appType.push("Building/New/Commercial/Com-Ind-Mixed-Use Building");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.criteria.push("AInfo[\"ENERGY REBATE\"] != \"Yes\"");
	x.action.push("addFee(\"BPF-DISC\",fs1,pe,0)");
//-----------------------------------------------------------------------------------------------------*/
// SUB-CONDITION 1-2 for CONDITION 11
//-----------------------------------------------------------------------------------------------------*/
x = AddControl("Valuation more than $3000 (05SSP-00448/Sub 1)")
//	x.appType.push("Building/Alteration/Commercial/Minor");
	x.appType.push("Building/Alteration/Residential/Minor");
	x.appType.push("Building/OTC/Residential/Basement Finish");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.criteria.push("eVal > 3000");
	x.action.push("addFee(\"PRF-1\",fs4,pe,1)");

x = AddControl("Valuation more than $3000 (05SSP-00448/Sub 2)")
	x.appType.push("Building/Alteration/Commercial/Minor");
	x.criteria.push("exists(appTypeString,x.appType)");
	x.criteria.push("eVal > 3000");
	x.action.push("addFee(\"PRF\",fs4,pe,1)");

/*------------------------------------------------------------------------------------------------------/
| <=========== END Configuration================>
/------------------------------------------------------------------------------------------------------*/

if (docRequest)
	doDocument();

if (docReqApp)
	doDocApp();
//
// Testing Parameters
//
//aa.env.setValue("PermitId1", "05COM"); 
//aa.env.setValue("PermitId2", "00000");
//aa.env.setValue("PermitId3", "00005");
//aa.env.setValue("PermitId1", "05STD"); 
//aa.env.setValue("PermitId3", "29971");
//aa.env.setValue("WorkflowTask","Application Submittal");
//aa.env.setValue("WorkflowStatus","Applied");
//
//
// Get the Cap, CapID objects, set some variables
//
var message =	"";					// Message String
var debug = "";
var br = 	"<BR>";					// Break Tag
var capId = getCapId();					// CapId object
var cap = aa.cap.getCap(capId).getOutput();		// Cap object
var capIDString = capId.getCustomID();			// alternate cap id string
var appTypeResult = cap.getCapType();			// Get Application Type
var appTypeString = appTypeResult.toString();		// Convert application type to string ("Building/A/B/C")
var AInfo = AppSpecific(capId);				// Associative array of appspecifc info
var PInfo = ParcelAttribute(capId);			// Associative array of parcel attributes
var valobj = aa.finance.getContractorSuppliedValuation(capId,null).getOutput();			// Calculated valuation 
if (valobj.length > 0) {				// If no valuation, then one of those different types of apps
	var eVal = valobj[0].getEstimatedValue();		// Contractor Value
	var cVal = valobj[0].getCalculatedValue();		// Calcuated Value
	var capDetail = aa.cap.getCapDetail(capId).getOutput();	// Cap Detail
	var houseCount = capDetail.getHouseCount()		// Housing Unit
    }
else
    {
    var eVal = 0;
    var cVal = 0;
    var houseCount = 0;
    }

/*------------------------------------------------------------------------------------------------------/
| <===========Main=Loop================>
| 
| For each control, check criteria.  If all are met, execute the update
| 
/-----------------------------------------------------------------------------------------------------*/
debug+="Cap ID: " + capIDString + br;
debug+="apptypestring = " + appTypeString + br;
for (y in MCA)
	{
	x =MCA[y];
	//
	// Check the criteria
	//
	if (x.checkCriteria())
		x.process();
	}			
/*------------------------------------------------------------------------------------------------------/
| <===========END=Main=Loop================>
/-----------------------------------------------------------------------------------------------------*/

if (message.indexOf("ERROR") > 0)
	{
	aa.env.setValue("ScriptReturnCode", "1");
	aa.env.setValue("ScriptReturnMessage", message);
	}
else
	{
	aa.env.setValue("ScriptReturnCode", "0");
	if (showMessage) aa.env.setValue("ScriptReturnMessage", message);
	if (showDebug) 	aa.env.setValue("ScriptReturnMessage", debug);
	}

/*------------------------------------------------------------------------------------------------------/
| <===========Functions and Classes================>
/-----------------------------------------------------------------------------------------------------*/

function Controller(name) {

	this.name = name;
	this.workflow = new Array();
	this.appType = new Array();
	this.criteria = new Array();
	this.action = new Array();
        	
	this.checkCriteria = function() { 
         	//
         	// checkCriteria: eval all criteria elements and return true if all are true
         	//
         	var passed = true;
         	for (z in this.criteria)
         		{
         		if (!eval(this.criteria[z]))
         			passed = false;
         		else
         			debug+=this.name + " Passed Criteria " + z + " : " + this.criteria[z] + br;
         		}
         	return passed;
         	}
         	
	this.process = function() { 
         	//
         	// process() : executes all the update strings for this object
         	//
         	for (z in this.action)
         		{
         		debug+=this.name +":passed, executing " + this.action[z] + br;
         		eval(this.action[z]);
         		}
  		}
} 

function AddControl(name){ 
	MCA[MCA.length] = new Controller(name);
	return MCA[MCA.length-1];
}

function AppSpecific(myCapId) {
	// 
	// Returns an associative array of App Specific Info
	//
  	appArray = new Array();
    	var appSpecInfoResult = aa.appSpecificInfo.getByCapID(myCapId);
	if (appSpecInfoResult.getSuccess())
	 	{
		var fAppSpecInfoObj = appSpecInfoResult.getOutput();

		for (loopk in fAppSpecInfoObj)
			{
			appArray[fAppSpecInfoObj[loopk].checkboxDesc.toUpperCase()] = fAppSpecInfoObj[loopk].checklistComment;
			debug+="AInfo[" + fAppSpecInfoObj[loopk].checkboxDesc.toUpperCase() + "] = " + fAppSpecInfoObj[loopk].checklistComment + br;
			}
		}
	return appArray;
}

function ParcelAttribute(myCapId) {
	//
	// Returns an associative array of Parcel Attributes
	//
	parcelArray = new Array();
	fcapParcelObj = null;
   	capParcelResult = aa.parcel.getParcelandAttribute(myCapId, null);
   	if (capParcelResult.getSuccess())
   		fcapParcelObj = capParcelResult.getOutput().toArray();
  	 else
     		debug+="ERROR: Failed to get Parcel object: " + capParcelResult.getErrorType() + ":" + capParcelResult.getErrorMessage() + br;
  	
  	for (i in fcapParcelObj)
  		{
  		parcelAttrObj = fcapParcelObj[i].getParcelAttribute().toArray();
  		for (z in parcelAttrObj)
  			{
			parcelArray[parcelAttrObj[z].getB1AttributeName().toUpperCase()]=parcelAttrObj[z].getB1AttributeValue();
			debug+="PInfo[" + parcelAttrObj[z].getB1AttributeName() + "] = " + parcelAttrObj[z].getB1AttributeValue() + br;
			}
  		}
  		
 	return parcelArray;
 }
 
  
function getCapId()  {

    var s_id1 = aa.env.getValue("PermitId1");
    var s_id2 = aa.env.getValue("PermitId2");
    var s_id3 = aa.env.getValue("PermitId3");

    var s_capResult = aa.cap.getCapID(s_id1, s_id2, s_id3);
    if(s_capResult.getSuccess())
      return s_capResult.getOutput();
    else
    {
      message+="ERROR: Failed to get capId: " + s_capResult.getErrorMessage() + br;
      return null;
    }
  }
  
function addFee(fcode,fsched,fperiod,fqty) {
	
	//if (fqty > 0)
	//	{
		assessFeeResult = aa.finance.createFeeItem(capId,fsched,fcode,fperiod,fqty);
		if (assessFeeResult.getSuccess())
			{
			feeSeq = assessFeeResult.getOutput();
			message+="Added Fee " + fcode + ", Qty " + fqty + br;
			debug+="The assessed fee Sequence Number " + feeSeq + br;
			}
		else
			{
			message+= "ERROR: assessing fee (" + fcode + "): " + assessFeeResult.getErrorMessage() + br;
			}
	//	}
	//else
	//	{
	//	message+="Could not add fee " + fcode + ", due to Qty " + fqty + br;
	//	}
}

//
// calcAvgResSqFtAdded() - Calculates and populates app specific info field
//
function calcAvgResSqFtAdded(avgFld,numerFld,denom) {
 var appSpecInfoRes = aa.appSpecificInfo.getByCapID(capId);
 if (appSpecInfoRes.getSuccess())
 	{
	var appInfo = appSpecInfoRes.getOutput();
	//
	//  Initialize
	//
	var appTotalIndex = null;
	//
	//  Loop through each app specific info object
	//
	
	iTotalSqFt = 0;
	
	for (loopk in appInfo)
		{
		var aText = appInfo[loopk].checklistComment;
		var aField = appInfo[loopk].checkboxDesc;
		//
		// Grab the total object for later
		//
		if (aField == avgFld)
			appTotalIndex = loopk;
		//
		//  Sum up the values
		//
		if (aText != null && aField == numerFld)
				{
				if (denom > 0) {
					iTotalSqFt = parseInt(parseInt(aText)/denom);
					}
				else	{
					iTotalSqFt = parseInt(aText);
					}
				}
		} // loop through app specific info
	

        if (iTotalSqFt <= 0) iTotalSqFt = 1;
	//
	//  Now update the destination field
	//

	if (appTotalIndex && iTotalSqFt)
		{
		appInfo[appTotalIndex].setChecklistComment(iTotalSqFt.toString());
		var actionResult = aa.appSpecificInfo.editAppSpecInfos(appInfo);
		if (actionResult.getSuccess())
			message+=avgFld + " updated to : " + iTotalSqFt.toString();
		else
			message+=actionResult.getErrorMessage();
		}
	}  // successful appspecificinfo

}



//
// exists:  return true if Value is in Array
//
function exists(eVal, eArray) {
	  for (ii in eArray) 
	  	if (eArray[ii] == eVal) return true;
	  return false;
}

//
// doDocument() Documents controls.
//		Exits the script without doing any logic -- used only for documentation.
//		Execute this script from with the "SCRIPT TEST" window
//
function doDocument() {
	for (y in MCA)
		{
		x =MCA[y];
		aa.print("************************************************************************")
		aa.print("Name        : " + x.name)
		for (y1 in x.appType)
			aa.print("App Type(s) : " + x.appType[y1]);
		for (y2 in x.criteria)
			aa.print("Criteria    : " + x.criteria[y2]);
		for (y3 in x.action)
			aa.print("Action      : " + x.action[y3]);
		}
	aa.abortScript()
	}
	
//
// doDocApp() :	Documents controls grouped by application type.
//		Exits the script without doing any logic -- used only for documentation.
//		Execute this script from with the "SCRIPT TEST" window
//
function doDocApp() {
	var cta = aa.cap.getCapTypeList(null).getOutput();
	for (y in cta)
		{
		var ct = cta[y].getCapType();
		var first = true;
		for (z in MCA)
			{
			x = MCA[z];
			if (exists(ct,x.appType))
				{
				if (first)
					{
					aa.print("************************************************************************")
					aa.print(ct.toString());
					aa.print("************************************************************************")
					first = false;
					}
				for (y2 in x.criteria)
					if (x.criteria[y2] != "exists(appTypeString,x.appType)")
						aa.print("Criteria    : " + x.criteria[y2]);
				for (y3 in x.action)
					aa.print("Action      : " + x.action[y3]);
				aa.print(" ");
				}
			} // MCA list
		} // app type list
		
	aa.abortScript();
	}