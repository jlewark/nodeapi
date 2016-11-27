'use strict';

//
// We should store all of our shared schemas in one place
//

const Joi = require('joi');

module.exports.Error = Joi.object({
    error: {
        msg: Joi.string().min(3).description('Human readable error').default('An error has occurred.'),
        type: Joi.string().min(3).description('Type of error').default('GENERIC_ERR')
    }
}).label('Error');

module.exports.Business = {
    id: Joi.string(),
    name: Joi.string(),
    full_address: Joi.string(),
    total_checkins: Joi.number()
};

module.exports.Businesses = {
    total: Joi.number(),
    businesses:  Joi.array().items(Joi.object().keys(module.exports.Business))
};

