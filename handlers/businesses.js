'use strict';

const Promise = require('promise');
const _ = require('lodash');
const config = require('../config/config.js');
const elasticsearch = require('elasticsearch');

// handlers are exported back for use in hapi routes
const Handlers = {};

// Lib contains our business specific logic
const Lib = {};


Lib.client = new elasticsearch.Client({
  hosts: [
    config.elasticsearch.host
  ]
});

// a unit test-able function
Lib.getBusinesses = function getBusiness(query, offset, size) {
  let queryObj = null;
   if (query) {
       queryObj = {
           "index": config.elasticsearch.index,
           "from": offset,
           "size": size,
           "body": {
             "query": {
               "simple_query_string": {
                 "query": query,
                 "fields": ["name^2", "full_address"],
               }
             }
           }
       };
    } else {
       queryObj = {
           "index": config.elasticsearch.index,
           "from": offset,
           "size": size,
           "body": {
             "query": {
               "match_all": {}
             }
           }
       };
    }

    return new Promise((resolve, reject) => {
        Lib.client.search(queryObj)
            .then((resp) => {
               let businesses =  {
                   "total": resp.hits.total,
                   "businesses": []
               };
               resp.hits.hits.forEach((item) => {
                   let checkins = 0;
                   if (item._source.checkin_info) {
                       Object.keys(item._source.checkin_info).forEach((key) => {
                           checkins += item._source.checkin_info[key];
                       });
                   }
                   let business = {
                     "id": item._id,
                     "total_checkins": checkins,
                     "name": item._source.name,
                     "full_address": item._source.full_address
                   };
                   businesses.businesses.push(business);
               });
               resolve(businesses);
            }, (err) => {
               reject(err);
        });
     });
};

// hapi route handler
// only this function can call reply
Handlers.get = function get(req, reply) {
    //
    // Perform req processing & conversions for input here.
    //
    let query = null;
    let size = 10;
    let offset = 0;

    if (req.query.q) {
        query = req.query.q;
    }

    if (req.query.offset) {
        offset = req.query.offset;
    }

    if (req.query.size) {
        size = req.query.size;
    }

    // call business function
    Lib.getBusinesses(query, offset, size).done((businesses) => {
        // api success
        reply(businesses).code(200);
    }, (err) => {
        // api error
        reply(err).code(400);
    });
};

module.exports = {
    handlers: Handlers,
    // we only export lib for tests
    lib:      (process.env.NODE_ENV === 'test') ? Lib : null
};
