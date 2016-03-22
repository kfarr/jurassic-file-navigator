
module.exports = function(tokens, req, res){
  var url = req.originalUrl || req.url
    , color = 32 // green
    , status = res.statusCode
    , diff, speed, speedColor, str, refer;

  if(status >= 400) color = 31;
  else if(status >= 300) color = 36;

  diff = (!res._header || !req._startAt) ? 0 : process.hrtime(req._startAt);
  if(!diff){
    speedColor = 90;
    speed = '-';
  } else {
    speed = diff[0] * 1e3 + diff[1] * 1e-6;
    speedColor = 31; // red;
    if( speed >= 1000) speedColor = 31;
    else if (speed >= 500) speedColor = 33;
    else speedColor = 90;
    speed = speed.toFixed(2);
  }

  str ='\x1b[0m\x1b['+ color +'m' + status +'\x1b[0m\x1b[90m '  + req.method
   + ' \x1b[0m\x1b[32m'+ url + '\x1b[0m \x1b['+ speedColor +'m' + speed + '\x1b[0m';

  refer = req.headers.referer || req.headers.referrer;
  if(status == 404) str += ' \x1b[33m' + refer + '\x1b[0m';

  return str;
}
