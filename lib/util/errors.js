var NotFound = exports.NotFound = function NotFound(msg, status){
  this.name = 'NotFound';
  this.status = status || 404;
  Error.call(this, msg);
  Error.captureStackTrace(this, arguments.callee);
};

require('util').inherits(NotFound, Error);