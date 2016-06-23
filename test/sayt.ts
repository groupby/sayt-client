/// <reference path="../src/all.d.ts" />

import { expect } from 'chai';
import utils = require('../src/utils/index');
import { Sayt } from '../src/core/sayt';

const CLIENT_KEY = 'XXX-XXX-XXX-XXX';
const CUSTOMER_ID = 'services';
const SAYT_URL = `http://${CUSTOMER_ID}.groupbycloud.com/api/v1/sayt/search`;

describe('SAYT', () => {
  let sayt: Sayt,
    backupJsonp;

  beforeEach(() => {
    backupJsonp = utils.jsonp;
    sayt = new Sayt();
    sayt.configure({ subdomain: CUSTOMER_ID });
  });

  afterEach(() => {
    utils.jsonp = backupJsonp;
  });

  it('should be defined', () => {
    expect(sayt).to.be.ok;
    expect(sayt.configure).to.be.ok;
    expect(sayt.autocomplete).to.be.ok;
    expect(sayt.productSearch).to.be.ok;
  });

  describe('autocomplete()', () => {
    it('should send autocomplete query', done => {
      utils.jsonp = (url, body) => {
        expect(url).to.equal(SAYT_URL);
        expect(body.query).to.equal('skirts');
        expect(body.searchItems).to.equal(5);
        expect(body.navigationItems).to.equal(5);
        expect(body.productItems).to.equal(0);
        return Promise.resolve();
      };

      sayt.autocomplete('skirts')
        .then(() => done());
    });

    it('should configure autocomplete query', done => {
      sayt.configure({ autocomplete: { numSearchTerms: 4, sortAlphabetically: true } });
      utils.jsonp = (url, body) => {
        expect(body.searchItems).to.equal(4);
        expect(body.navigationItems).to.equal(5);
        expect(body.alphabetize).to.be.true;
        return Promise.resolve();
      };

      sayt.autocomplete('skirts')
        .then(() => done());
    });

    it('should allow query-time configuration', done => {
      sayt.configure({ autocomplete: { numSearchTerms: 4, sortAlphabetically: true } });
      utils.jsonp = (url, body) => {
        expect(body.searchItems).to.equal(8);
        expect(body.navigationItems).to.equal(2);
        return Promise.resolve();
      };

      sayt.autocomplete('skirts', { numSearchTerms: 8, numNavigations: 2 })
        .then(() => done());
    });
  });

  describe('productSearch()', () => {
    it('should send product search query', done => {
      utils.jsonp = (url, body) => {
        expect(url).to.equal(SAYT_URL);
        expect(body.query).to.equal('hats');
        expect(body.searchItems).to.equal(0);
        expect(body.navigationItems).to.equal(0);
        expect(body.productItems).to.equal(4);
        return Promise.resolve();
      };

      sayt.productSearch('hats')
        .then(() => done());
    });

    it('should configure autocomplete query', done => {
      sayt.configure({ productSearch: { numProducts: 8, area: 'Other' } });
      utils.jsonp = (url, body) => {
        expect(body.area).to.equal('Other');
        expect(body.productItems).to.equal(8);
        return Promise.resolve();
      };

      sayt.productSearch('hats')
        .then(() => done());
    });

    it('should allow query-time configuration', done => {
      utils.jsonp = (url, body) => {
        expect(body.area).to.equal('dev');
        expect(body.productItems).to.equal(5);
        return Promise.resolve();
      };

      sayt.productSearch('hats', { numProducts: 5, area: 'dev' })
        .then(() => done());
    });
  });
});
