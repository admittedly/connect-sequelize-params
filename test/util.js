var util = require("../lib/util");

describe("Utility functions", function(){
	it("must derive the parameter name correctly", function(){
		util.deriveParameterName("my_model").must.be("my_model");
		util.deriveParameterName("my_models").must.be("my_model");
		util.deriveParameterName("MyModel").must.be("my_model");
		util.deriveParameterName("MyModels").must.be("my_model");
		util.deriveParameterName("myModel").must.be("my_model");
		util.deriveParameterName("myModels").must.be("my_model");
		util.deriveParameterName("my_awesome_model").must.be("my_awesome_model");
		util.deriveParameterName("my_awesome_models").must.be("my_awesome_model");
		util.deriveParameterName("MyAwesomeModel").must.be("my_awesome_model");
		util.deriveParameterName("MyAwesomeModels").must.be("my_awesome_model");
		util.deriveParameterName("myAwesomeModel").must.be("my_awesome_model");
		util.deriveParameterName("myAwesomeModels").must.be("my_awesome_model");
		util.deriveParameterName("model").must.be("model");
		util.deriveParameterName("models").must.be("model");
		util.deriveParameterName("Model").must.be("model");
		util.deriveParameterName("Models").must.be("model");
		util.deriveParameterName("bee").must.be("bee");
		util.deriveParameterName("bees").must.be("bee");
		util.deriveParameterName("Bee").must.be("bee");
		util.deriveParameterName("Bees").must.be("bee");
		util.deriveParameterName("dress").must.be("dress");
		util.deriveParameterName("dresses").must.be("dress");
		util.deriveParameterName("Dress").must.be("dress");
		util.deriveParameterName("Dress").must.be("dress");
		util.deriveParameterName("my_bee").must.be("my_bee");
		util.deriveParameterName("my_bees").must.be("my_bee");
		util.deriveParameterName("MyBee").must.be("my_bee");
		util.deriveParameterName("MyBees").must.be("my_bee");
		util.deriveParameterName("myBee").must.be("my_bee");
		util.deriveParameterName("myBees").must.be("my_bee");
		util.deriveParameterName("my_dress").must.be("my_dress");
		util.deriveParameterName("my_dresses").must.be("my_dress");
		util.deriveParameterName("MyDress").must.be("my_dress");
		util.deriveParameterName("MyDress").must.be("my_dress");
		util.deriveParameterName("myDress").must.be("my_dress");
		util.deriveParameterName("myDress").must.be("my_dress");
	});
})
