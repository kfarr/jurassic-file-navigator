
var boot = module.exports = require('./boot')
  , app = boot(require('express')())
  , server = require('http').createServer(app);


module.exports = app;

/**
 * Load app directly if no parent is set.
 */
if (!module.parent) {

  process.addListener('uncaughtException', function(err){
    console.error('Uncaught exception!');
    console.error(err.stack || err);
    process.exit(1);
  });
  
  server.listen(app.set('port'), function(){
    console.error('\x1b[32m'+ app.set('app name') +'\x1b[0m running on http://%s:%d',
      this.address().address.replace(/:/g, '') || 'localhost',
      this.address().port);
  });

}




