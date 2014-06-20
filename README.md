[![Build Status](https://travis-ci.org/admittedly/express-sequelize-params.svg?branch=master)](https://travis-ci.org/admittedly/express-sequelize-params)

express-sequelize-params
========================

Express middleware for populating params with sequelize objects.

Installation
---
```
npm install express-sequelize-params
```

Basic usage
---
This middleware will replace a given param with the corresponding instance of the given model.
```
var app = express();
var MyModel = sequelize.define("MyModel");
var esp = require("express-sequelize-params");
app.param("my_model", esp(MyModel));
```
You can specify the parameter to replace with an option
```
app.param("myModel", esp(MyModel, {parameterName: "myModel"}));
```

Running tests
---
Tests assume that you have a test mysql database accessible without password.
```
echo 'CREATE DATABASE express_sequelize_params_test;' | mysql -uroot
```

