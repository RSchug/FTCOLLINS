var capIDmodel = getCapId();aa.print("capID="+capIDmodel.toString());getStructEStablByCapId(capIDmodel);function getStructEStablByCapId(capID){   	aa.print("ListStructEstablByCapMethodScript debug");		 	var struEstabResult =aa.structEstabScript.getStructEStablByCapId(capID);		if (struEstabResult.getSuccess())	{		var StructEstabScriptList = struEstabResult.getOutput();  	if(StructEstabScriptList != '')			{						var it=StructEstabScriptList.iterator();						while(it.hasNext())							{								 	var structEstabScriptModel=it.next();				 			 				aa.print("ServProvCode:"    			+ structEstabScriptModel.getServiceProviderCode());					 				aa.print("StructureNumber:"      + structEstabScriptModel.getId());					 					 				aa.print("StructureName:"        + structEstabScriptModel.getName());					 				aa.print("Status:"    						+ structEstabScriptModel.getStatus());					 				aa.print("StatusDate:"    				+ structEstabScriptModel.getStatusDate());					 				aa.print("Description:"    			+ structEstabScriptModel.getDescription());					 				aa.print("Coordinator_X:"    		+ structEstabScriptModel.getCoordinator_X());					 				aa.print("Coordinator_Y:"    		+ structEstabScriptModel.getCoordinator_Y());					 				aa.print("LandUseValue:"    			+ structEstabScriptModel.getLandUseValue());					 				aa.print("Height:"    						+ structEstabScriptModel.getHeight());					 				aa.print("FrontDimension:"    		+ structEstabScriptModel.getFrontDimension());					 				aa.print("RearDimension:"    		+ structEstabScriptModel.getRearDimension());					 				aa.print("SideDimension1:"    		+ structEstabScriptModel.getSideDimension1());					 				aa.print("SideDimension2:"    		+ structEstabScriptModel.getSideDimension2());					 				aa.print("TotalFloors:"    			+ structEstabScriptModel.getTotalFloors());					 				aa.print("FloorArea_1st:"    		+ structEstabScriptModel.getFloorArea_1st());					 				aa.print("TotalFloorArea:"    		+ structEstabScriptModel.getTotalFloorArea());					 				aa.print("NumberRooms:"    			+ structEstabScriptModel.getNumberRooms());					 				aa.print("DateBuilt:"    				+ structEstabScriptModel.getDateBuilt());					 				aa.print("Garage:"    						+ structEstabScriptModel.getGarage());					 				aa.print("Beds:"    							+ structEstabScriptModel.getBeds());					 				aa.print("Pool:"    							+ structEstabScriptModel.getPool());					 				aa.print("SourceSeqNumber:"    	+ structEstabScriptModel.getSourceSeqNumber());					 				aa.print("AuditID:"    					+ structEstabScriptModel.getAuditID());					 				aa.print("AuditDate:"    				+ structEstabScriptModel.getAuditDate());					 				aa.print("AuditStatus:"    			+ structEstabScriptModel.getAuditStatus());					 				aa.print("ResId:"    						+ structEstabScriptModel.getResId());									aa.print("Group:"    						+ structEstabScriptModel.getGroup());									aa.print("Floor:"    						+ structEstabScriptModel.getFloor());					 				aa.print("Employees:"    				+ structEstabScriptModel.getPercentEmployees());					 				aa.print("ResidentialUnits:"    	+ structEstabScriptModel.getPercentResidentialUnits());					 				aa.print("Structure:"    				+ structEstabScriptModel.getPercentStructure());					 				aa.print("ParcelsAreas:"    			+ structEstabScriptModel.getParcelsAreas());					 				aa.print("TotalArea:"    				+ structEstabScriptModel.getTotalArea());					 				aa.print("RecordStatus:"    			+ structEstabScriptModel.getRecordStatus());					 				aa.print("Baths:"    						+ structEstabScriptModel.getBaths());					 				aa.print("PercentUsed:"    			+ structEstabScriptModel.getPercentUsed());					 				aa.print("StrucEstaSeq:"    			+ structEstabScriptModel.getStrucEstaSeq());					 				var attributes=	structEstabScriptModel.getAttributes();				 					 				if(attributes !='')										{											for(i=0;i<attributes.length;i++)											{												aa.print("Attributes " + i + ":" + attributes[i]);											}								  			}						  		aa.print("-----------------------------------------------------------------");								 }								}			  }				else	{      aa.print("Error: " + struEstabResult.getErrorMessage());	}	}function getCapId()  	{    //var s_id1 = aa.env.getValue("PermitId1");    //var s_id2 = aa.env.getValue("PermitId2");    //var s_id3 = aa.env.getValue("PermitId3");     var s_id1 = "08333";    var s_id2 = "00000";    var s_id3 = "00382";    var s_capResult = aa.cap.getCapID(s_id1, s_id2, s_id3);    if(s_capResult.getSuccess())    {      return s_capResult.getOutput();    }     else    {      aa.print("ERROR: Failed to get capId: " + s_capResult.getErrorMessage());      return null;    }	}