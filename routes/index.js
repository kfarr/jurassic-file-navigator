var express = require('express')
  , favicons = require('connect-favicons')
  , fsn = require('./fsn');

module.exports = function(app) {
  
  app.use(favicons(app.get('public') + '/images/icons'));

  // allowing for many include possibilities
  app.use('/scripts/aframe', express.static(app.get('root') + '/node_modules/aframe/'));
  app.use('/scripts/aframe/dist', express.static(app.get('root') + '/node_modules/aframe/dist/'));
  app.use('/scripts/aframe-text-component/dist', express.static(app.get('root') + '/node_modules/aframe-text-component/dist/'));
  
  
  app.use('/browse', fsn(app));
  
  app.use(express.static(app.get('public')));

}