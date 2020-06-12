function afterResubmitDocument() {
	var docModelList = aa.env.getValue("DocumentModelList");
	var originalDocStatus = "Resubmitted";
	var resubmitDocStatus = "Uploaded";
	var it = docModelList.iterator();
	while (it.hasNext()) {
		var docModel = it.next();
		if (docModel == null) {
			aa.print("docModel is null");
			break;
		}
		//Set resubmit document status as "Uploaded"
		docModel.setDocStatus(resubmitDocStatus);
		var affectResubmitDocNum = aa.document.updateDocument(docModel);
		if (affectResubmitDocNum != null && affectResubmitDocNum.getOutput() != null && affectResubmitDocNum.getOutput() > 0) {
			aa.print("The resubmit document status has been set to " + resubmitDocStatus);
		}
		//Get all original document associations by resubmit document model.
		var originalDocModel = aa.document.getOriginalDoc(docModel);
		if (originalDocModel != null && originalDocModel.getOutput() != null) {
			//Set original document status as "Resubmitted"
			originalDocModel.getOutput().setDocStatus(originalDocStatus)
			var affectOriginalDocNum = aa.document.updateDocument(originalDocModel.getOutput());
			if (affectOriginalDocNum != null && affectOriginalDocNum.getOutput() != null && affectOriginalDocNum.getOutput() > 0) {
				aa.print("The original document status has been set to " + originalDocStatus);
			}
		}
	}
}
