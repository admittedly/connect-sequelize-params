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
```
var app = express();
var esp = require("express-sequelize-params");
app.param(":my_model", esp(self.models.MyModel));
```

Running tests
---
Tests assume that you have a test mysql database accessible without password.
```
echo 'CREATE DATABASE express_sequelize_params_test;' | mysql -uroot
```

