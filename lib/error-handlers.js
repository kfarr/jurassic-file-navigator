var errors = require('./util/errors');

module.exports = function(app) {

  app.use(function(req, res, next) {
    next(new errors.NotFound());
  });
  
 app.use(function(err, req, res, next) {
   res.status(err.status || 500);
   res.render('error', {
     message: err.message,
     error: app.enabled('dev') ? err : {}
   });
 }); 
  
}