var express = require("express");
var Sequelize = require("sequelize");
var request = require("supertest");
var demand = require("must");

var middleware = require("..");

describe("express-sequelize-params", function(){
	beforeEach(function(done){
		var self = this;

		self.models = {};

		var sequelize = new Sequelize("express_sequelize_params_test", "root", "", {
			dialect : "mysql",
			port : 3306,
			sync : {force : true},
			logging : false
		});
		self.models.MyModel = sequelize.define("MyModel", {name : Sequelize.STRING});
		self.models.MyModel.sync();

		self.models.MyModel.create({name : "Test"})
		.success(function(){
			self.app = express();
			done();
		})
		.error(done);
	});

	describe("default options", function(){
		beforeEach(function(){
			var self = this;

			self.app.param(":my_model", middleware(self.models.MyModel));
		});

		it("must find and replace a parameter with its object", function(done){
			var self = this;

			self.app.get("/my_models/:my_model", function(req, res, next){
				req.params.my_model.must.exist();
				req.params.my_model.name.must.be("Test");
				done();
			});

			request(self.app)
			.get("/my_models/1")
			.end();
		});

		it("must send a 404 when the object is not found", function(done){
			var self = this;

			request(self.app)
			.get("/my_models/2")
			.expect(404)
			.end(done);
		});
	})
});
