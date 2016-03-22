var config = require('./config')
  , error_handlers = require('../lib/error-handlers')
  , routes = require('../routes');

module.exports = function boot(app) {
  
  config(app);
  
  routes(app);
  
  error_handlers(app);
  
  return app;

}