module.exports = function(Model, options){
	var options = options || {};

	if(typeof options.parameterName == "undefined"){
		var modelName = Model.name;
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
		if(modelName.length > 2 && modelName.slice(-3) == "ses"){
			modelName = modelName.slice(0,-2);
		}else if(modelName.length > 1 && modelName.slice(-1) == "s"){
			modelName = modelName.slice(0,-1);
		}
		options.parameterName = modelName;
	}

	return function(req, res, next, id){
		Model.find(id)
		.success(function(model){
			if(!model){
				if(options.notFound == "next"){
					if(options.deleteParamOnNotFound === true) delete req.params[options.parameterName];
					return next();
				}
				return res.send(404);
			}
			req.params[options.parameterName] = model;
			next();
		})
		.error(next);
	};
};
