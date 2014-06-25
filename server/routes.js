var helpers = require('./helpers');
module.exports=function(app){
	app.get('/', helpers.sendHome);
}