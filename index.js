var inflection = require("inflection");

module.exports = function(Model, options){
	var options = options || {};

	if(typeof options.parameterName == "undefined"){
		if(options.parameterFormat == "camelcase"){
			options.parameterName = inflection.singularize(inflection.camelize(Model.name, true))
		}else{
			options.parameterName = inflection.singularize(inflection.underscore(Model.name))
		}
	}

	return function(req, res, next, id){
		Model.find(id)
		.then(function(model){
			if(!model){
				if(options.notFound === "next"){
					if(options.deleteParamOnNotFound === true) delete req.params[options.parameterName];
					return next();
				}
				return res.send(404);
			}
			req.params[options.parameterName] = model;
			next();
		}, next);
	};
};
