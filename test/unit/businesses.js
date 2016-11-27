'use strict';

// requires for testing
const Code      = require('code');
const expect    = Code.expect;
const Lab       = require('lab');
const lab       = exports.lab = Lab.script();

// use some BDD verbage instead of lab default
const describe  = lab.describe;
const it        = lab.it;

// we require the handlers directly, so we can test the "Lib" functions in isolation
const BusinessHandlers = require('../../handlers/businesses');

describe('unit tests - businesses', () => {

    it('should return all businesses', (done) => {

        // test lib function
        BusinessHandlers.lib.getBusinesses().done(businesses) => {

            expect(businesses.to.be.an.array().and.have.length(2);

            done();
        }, (err) => {

            done(err);
        });
    });
});
