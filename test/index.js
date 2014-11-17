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
			logging : false
		});
		self.models.MyModel = sequelize.define("MyModels", {name : Sequelize.STRING});
		self.models.MyModel.sync({force : true})
		.success(function(){
			self.models.MyModel.create({name : "Test"})
			.success(function(){
				self.app = express();
				done();
			})
			.error(done);
		})
		.error(done);
	});

	describe("Default options", function(){
		beforeEach(function(){
			var self = this;

			self.app.param("my_model", middleware(self.models.MyModel));
		});

		it("must find and replace a parameter with its object", function(done){
			var self = this;

			self.app.get("/my_models/:my_model", function(req, res, next){
				req.params.my_model.must.exist();
				req.params.my_model.id.must.be(1);
				req.params.my_model.name.must.be("Test");
				done();
			});

			request(self.app)
			.get("/my_models/1")
			.end();
		});

		it("must send a 404 when the object is not found", function(done){
			var self = this;

			self.app.get("/my_models/:my_model", function(req, res, next){
				//This should never get called
				demand(true).be(false);
			});

			request(self.app)
			.get("/my_models/2")
			.expect(404)
			.end(done);
		});
	});

	describe("Parameter name options", function(){
		it("must find and replace a parameter with a custom name with its object", function(done){
			var self = this;

			self.app.param("myModel", middleware(self.models.MyModel, {parameterName : "myModel"}));

			self.app.get("/my_models/:myModel", function(req, res, next){
				req.params.myModel.must.exist();
				req.params.myModel.id.must.be(1);
				req.params.myModel.name.must.be("Test");
				done();
			});

			request(self.app)
			.get("/my_models/1")
			.end();
		});

		it("must find and replace a parameter with a parameter format with its object", function(done){
			var self = this;

			self.app.param("myModel", middleware(self.models.MyModel, {parameterFormat : "camelcase"}));

			self.app.get("/my_models/:myModel", function(req, res, next){
				req.params.myModel.must.exist();
				req.params.myModel.id.must.be(1);
				req.params.myModel.name.must.be("Test");
				done();
			});

			request(self.app)
			.get("/my_models/1")
			.end();
		});
	});

	describe("Not found options", function(){
		describe("when notFound is set to 'next'", function(){
			beforeEach(function(){
				var self = this;
				self.app.param("my_model", middleware(self.models.MyModel, {notFound : "next"}));
			});

			it("must pass to next if param is not found", function(done){
				var self = this;

				self.app.get("/my_models/:my_model", function(req, res, next){
					req.params.my_model.must.exist();
					demand(req.params.my_model.name).not.exist();
					done();
				});

				request(self.app)
				.get("/my_models/2")
				.end();
			});

			describe("when deleteOnNotFound is set to true", function(){
				beforeEach(function(){
					var self = this;
					self.app.param("my_model", middleware(self.models.MyModel, {notFound : "next", deleteParamOnNotFound : true}));
				});

				it("must clear the param if model instance is not found", function(done){
					var self = this;

					self.app.get("/my_models/:my_model", function(req, res, next){
						demand(req.params.my_model).not.exist();
						done();
					});

					request(self.app)
					.get("/my_models/2")
					.end();
				});

			});
		});
	});
});
