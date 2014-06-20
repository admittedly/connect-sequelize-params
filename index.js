module.exports = function(Model){
	var r = /([A-Z][a-z]+)/g;
	var modelParts = [];
	while(m = r.exec(Model.name)){modelParts.push(m[0]);};
	var modelNameUnderscored = modelParts.map(function(c){return c.toLowerCase();}).join("_");

	return function(req, res, next, id){
		Model.find(id)
		.success(function(model){
			if(!model) return res.send(404);
			req.params[modelNameUnderscored] = model;
			next();
		})
		.error(next);
	};
};
