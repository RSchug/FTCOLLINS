var bizdomain = "APPLICATIONSTATUSUPDATEAFTER";var result = null;result = aa.bizDomain.getBizDomain(bizdomain);if(result.getSuccess() == false){	aa.print("error:" + result.getErrorMessage());}else{	aa.print("success ");	result = result.getOutput();	if(result != '')	{		var it = result.iterator();		while(it.hasNext())		{			var scriptBizModel = it.next();			var biz = scriptBizModel.getBizDomain();			aa.print("bizdomain = " + biz.getBizdomain());			aa.print("dispositionID = " +biz.getDispositionID());			aa.print("serviceProviderCode = " + biz.getServiceProviderCode());			aa.print("bizdomainValue = " + biz.getBizdomainValue());			aa.print("auditDate = " +biz.getAuditDate());			aa.print("auditID = " + biz.getAuditID());			aa.print("auditStatus = " + biz.getAuditStatus());			aa.print("description = " + biz.getDescription());			aa.print("sortOrder = " + biz.getSortOrder());			aa.print("parentID = " + biz.getParentID());			aa.print("-----------------------------------------");		}	}}