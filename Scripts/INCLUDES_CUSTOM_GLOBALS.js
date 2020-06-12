// Set Global variables here.
aa.print("Loading INCLUDES_CUSTOM_GLOBALS");
logDebug("Loading INCLUDES_CUSTOM_GLOBALS");
if (matches(currentUserID,"KHOBDAY","ADMINTEST","KKREISHER","RSCHUG","CPROBASCO")) showDebug = true;

if (matches(currentUserID, "RSCHUG") || matches(publicUserID, "PUBLICUSER19692")) { // Ray Schug
    showDebug = 3;
    var debugScriptName = "INCLUDES_CUSTOM_DEBUG";
    try {
        eval(getScriptText(debugScriptName));
    } catch (err) {
        aa.print(debugScriptName + ": " + err)
        logDebug(debugScriptName + ": " + err)
    }
}
// 
if (typeof(sv_showDebug) != "undefined" && sv_showDebug) showDebug = true;