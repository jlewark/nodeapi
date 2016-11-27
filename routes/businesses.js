'use strict';

const Joi           = require('joi');
const Handlers      = require('../handlers/businesses');
const SCHEMAS       = require('../lib/schemas');

const API_BASE_PATH = '/businesses';

const routes = [];

// GET /businesses
routes.push({
    method: 'GET',
    path: API_BASE_PATH,
    config: {
        auth: false,
        handler: Handlers.handlers.get,
        description: 'get businesses',
        notes: 'This endpoint allows for the retrieval of businesses.',
        plugins: {
            'hapi-swagger': {
                responses: {
                    '200': { description: 'Success', schema: Joi.object(SCHEMAS.Businesses).label('Response') },
                    '400': { description: 'Bad Request', schema: SCHEMAS.Error }
                },
                security: {}
            }
        },
        tags: ['api'],
        validate: {
            query: {
              q: Joi.string(),
              offset: Joi.number().integer().default(0),
              size: Joi.number().integer().default(10)
            }
        },
        response: {
            schema: Joi.object(SCHEMAS.Businesses).label('Response')
        }
    }
});

module.exports = routes;
