var pluralize = require("pluralize");
module.exports = {
	deriveParameterName : function(modelName){
		if(modelName.indexOf("_") > -1){
			//Table is underscored, leave as is
		}else{
			//Table is camel case or caplitalized
			modelName = modelName.slice(0,1).toUpperCase() + modelName.slice(1);
			var r = /([A-Z][a-z]+)/g;
			var modelParts = [];
			while(m = r.exec(modelName)){modelParts.push(m[0]);};
			modelName = modelParts.map(function(c){return c.toLowerCase();}).join("_");
		}
		//Depluralize table name if necessary
		modelName = pluralize.singular(modelName);
		// if(modelName.length > 2 && modelName.slice(-3) == "ses"){
		// 	modelName = modelName.slice(0,-2);
		// }else if(modelName.length > 1 && modelName.slice(-2) != "ss" && modelName.slice(-1) == "s"){
		// 	modelName = modelName.slice(0,-1);
		// }
		return modelName;
	}
}
