//Accela Automation//File: Expression-ValidateLP.js//Accela, Inc.//Copyright (C): 2008////Description: Used to validate Daily side license professional via expression////Notes:////Revision History:var isEmpty=function(value){ return value=='' || value==null || value==undefined;};var validateLP=function(licNbr,licType){	//Always give them both lic_nub and lic_type:	var notEmpty= !isEmpty(licType.value)&& !isEmpty(licNbr.value);	//Give them lic_nub or lic_type or both	//var pass= !isEmpty(licType.value)&& !isEmpty(licNbr.value);	if(notEmpty){		var client=expression.httpClient;		var params=client.initPostParameters();		params.put('p_lic_type',licType.value);		params.put('p_lic_num',licNbr.value)		//var url='https://www4.cbs.state.or.us/exs/bcd/accela/ws/accelaws.cfc?method=lic_valid&returnformat=json&p_lic_num=1234e&p_lic_type=Electric';		var url='https://www4.cbs.state.or.us/exs/bcd/accela/ws/accelaws.cfc?method=lic_valid&returnformat=json';		var scripResult=client.post(url,params);		expression.print(scripResult);		var result=String(scripResult.getOutput());		expression.print(result);		if(!isEmpty(result)){			var jsonResult=eval('('+result+')');			if(jsonResult["VALID"]){				expression.addMessage("The License Type and License Number Valid successfully!");			}else{				expression.addMessage("The License Type and License Number are invalid!");								//If the valid failure,clear the licNbr and licType value.				licNbr.value='';				licType.value='';				expression.setReturn(licNbr);				expression.setReturn(licType);			}		}		return;	}	if(isEmpty(licNbr.value)){		licNbr.message='is required';		expression.setReturn(licNbr);	}	if(isEmpty(licType.value)){		licType.message='is required'		expression.setReturn(licType);	}}var licNbr=expression.getValue('LP::professionalModel*licensenbr');var licType=expression.getValue('LP::professionalModel*licensetype');validateLP(licNbr,licType);