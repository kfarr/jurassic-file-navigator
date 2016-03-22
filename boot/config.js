var path = require('path')
  , cookieParser = require('cookie-parser')
  , morgan = require('morgan') // logger
  , swig = require('swig')
  , customLogFormatter = require('../lib/util/dev-express-log')
  , bodyParser = require('body-parser')
  , compression = require('compression')
  , timeout = require('connect-timeout')
  , responseTime = require('response-time');

module.exports = function config(app) {
  
  app.set('app name', 'FSN');
  
  app.disable('x-powered-by');
  
  // Development Config
  if(app.get('env') === 'development') {
    app
      .use(morgan(customLogFormatter))
      .use(timeout('20s'))
      .enable('dev')
      .enable('debug')
      .disable('compress')
      .set('port', process.env.PORT || 3333);
  }
  
  if(app.get('env') === 'production') {
    app
      .use(morgan('combined'))
      .use(timeout('60s'))
      .enable('prod')
      .enable('view cache')
      .disable('debug')
      .enable('compress')
      .set('port', process.env.PORT || 3333);
  }
  
  // General Config
  app
    .set('root', path.normalize(__dirname + '/..'))
    .set('public', path.normalize(__dirname + '/../public'))
    .set('views', __dirname + '/../views')
    .set('view engine', 'html')
    .engine('html', swig.renderFile)
  
    // shared middleware
    .use(responseTime({digits: 3}))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(cookieParser());
  
  if(app.enabled('compress')) app.use(compression());
  
  return app
}