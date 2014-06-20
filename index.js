module.exports = function(Model, options){
	var options = options || {};

	if(typeof options.parameterName == "undefined"){
		var r = /([A-Z][a-z]+)/g;
		var modelParts = [];
		while(m = r.exec(Model.name)){modelParts.push(m[0]);};
		options.parameterName = modelParts.map(function(c){return c.toLowerCase();}).join("_");
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
