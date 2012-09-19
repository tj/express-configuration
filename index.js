
/*!
 * Express - Contrib - configure
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var application = require('express').application;

// Proxy listen
var listen = application.listen;

/**
 * Proxy listen() to provide async support.
 *
 * @api public
 */

exports.listen = function(){
  if (this.__config) {
    this.__listen = arguments;
  } else {
    listen.apply(this, arguments);
  }
};

/**
 * Proxy configure() to provide async support.
 *
 * @api public
 */

exports.configure = function(env, fn){
  var self = this,
  envs = 'all',
  args = [].slice.call(arguments);
  this.__config = this.__config || 0,


  fn = args.pop();
  if (args.length) {
      envs = args;
  }
  if ('all' === envs || ~envs.indexOf(this.settings.env)) {
    if (fn.length) {
      ++this.__config;
      fn.call(this, function(err){
        if (err) {
          throw err;
        }
        if (!--self.__config) {
          listen.apply(self, self.__listen);
        }
      });
    } else {
      fn.call(this);
    }
  }
  return this;
};

// merge
for (var key in exports) {
  application[key] = exports[key];
}
