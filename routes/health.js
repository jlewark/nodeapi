'use strict';

const Joi           = require('joi');
const Handlers      = require('../handlers/health');
const SCHEMAS       = require('../lib/schemas');

const API_BASE_PATH = '/health';

const routes = [];

routes.push({
    method: 'GET',
    path: API_BASE_PATH,
    config: {
        auth: false,
        handler: Handlers.handlers.get,
        description: 'get health',
        notes: 'Returns Health',
        tags: ['api'],
        validate: {
            query: {
            }
        }   
    }
});

module.exports = routes;
