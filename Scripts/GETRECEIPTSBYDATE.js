var message = "";var br = "<br>";var firstDate = aa.util.dateDiff(aa.util.now(), "day", -1);var endDate =   aa.util.dateDiff(aa.util.now(), "day", 1);firstDate.setHours(0);firstDate.setMinutes(0);firstDate.setSeconds(0);endDate.setHours(23);endDate.setMinutes(59);endDate.setSeconds(59);logMessage("Start to find receipts from " + firstDate + " to " + endDate);var receiptResult = aa.finance.getReceiptsByDate(firstDate, endDate, null);if (receiptResult.getSuccess()){	logMessage("Find receipts from " + firstDate + " to " + endDate + " success.");	var receiptArray = receiptResult.getOutput();	for (var i = 0; i < receiptArray.length; i++)	{		var receipt = receiptArray[i];		logMessage(i + ": " + receipt.getReceiptNbr());	}}else{	logMessage("Find receipts from " + firstDate + " to " + endDate + " faild.");}aa.print(message);function logMessage(dstr){	message += dstr + br;}