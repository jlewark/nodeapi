'use strict';

const Promise = require('promise');
const _ = require('lodash');
const config = require('../config/config.js');
const elasticsearch = require('elasticsearch');

let client = new elasticsearch.Client({
  hosts: [
    config.elasticsearch.host
  ]
});


// handlers are exported back for use in hapi routes
const Handlers = {};

// Lib contains our business specific logic
const Lib = {};

// hapi route handler
// only this function can call reply
Handlers.get = function get(req, reply) {
    client.cat.health(function(err, response, status) {
      if(err) {
          // insufficent permissions to do this - hard code to 200
          reply({ result: "ok", msg: err}).code(200);
      } else {
          // api success
          reply({ result: "ok" }).code(200);
      }
    }); 
};

module.exports = {
    handlers: Handlers,
    // we only export lib for tests
    lib:      (process.env.NODE_ENV === 'test') ? Lib : null
};
