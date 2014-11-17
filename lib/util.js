var inflection = require("inflection");

module.exports = {
	deriveParameterName : function(modelName){
		return inflection.singularize(inflection.underscore(modelName));
	}
}
