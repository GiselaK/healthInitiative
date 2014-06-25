'use strict';

var express = require('express');
var helper  = require('./helpers');
var app     = express();

require('./express')(app);
require('./routes')(app);
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
  console.log('server running on port ' + app.get('port'));
});