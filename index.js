module.exports = function(Model, options){
	var options = options || {};

	if(typeof options.parameterName == "undefined"){
		options.parameterName = require("./lib/util").deriveParameterName(Model.name);
	}

	return function(req, res, next, id){
		Model.find(id)
		.success(function(model){
			if(!model){
				if(options.notFound === "next"){
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
