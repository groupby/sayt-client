/// <reference path="../typings/index.d.ts" />

import { expect } from 'chai';
import mock = require('xhr-mock');
import { Sayt } from '../src/core/sayt';

const CLIENT_KEY = 'XXX-XXX-XXX-XXX';
const CUSTOMER_ID = 'services';
const SAYT_URL = `http://${CUSTOMER_ID}.groupbycloud.com/api/v1/sayt/search`;

describe('SAYT', () => {
  let sayt: Sayt;

  beforeEach(() => {
    mock.setup();
    sayt = new Sayt();
    sayt.configure({ subdomain: CUSTOMER_ID });
  });

  afterEach(() => {
    mock.teardown();
  });

  it('should be defined', () => {
    expect(sayt).to.be.ok;
    expect(sayt.configure).to.be.ok;
    expect(sayt.autocomplete).to.be.ok;
    expect(sayt.productSearch).to.be.ok;
  });

  describe('autocomplete()', () => {
    it('should send autocomplete query', done => {
      mock.get(SAYT_URL, (req, res) => {
        const body = JSON.parse(req.body());
        expect(body.query).to.equal('skirts');
        expect(body.searchItems).to.equal(5);
        expect(body.navigationItems).to.equal(5);
        expect(body.productItems).to.equal(0);
        done();
      });

      sayt.autocomplete('skirts');
    });

    it('should configure autocomplete query', done => {
      sayt.configure({ autocomplete: { numSearchTerms: 4, sortAlphabetically: true } });
      mock.get(SAYT_URL, (req, res) => {
        const body = JSON.parse(req.body());
        expect(body.searchItems).to.equal(4);
        expect(body.navigationItems).to.equal(5);
        expect(body.alphabetize).to.be.true;
        done();
      });

      sayt.autocomplete('skirts');
    });

    it('should allow query-time configuration', done => {
      sayt.configure({ autocomplete: { numSearchTerms: 4, sortAlphabetically: true } });
      mock.get(SAYT_URL, (req, res) => {
        const body = JSON.parse(req.body());
        expect(body.searchItems).to.equal(8);
        expect(body.navigationItems).to.equal(2);
        done();
      });

      sayt.autocomplete('skirts', { numSearchTerms: 8, numNavigations: 2 });
    });
  });

  describe('productSearch()', () => {
    it('should send product search query', done => {
      mock.get(SAYT_URL, (req, res) => {
        const body = JSON.parse(req.body());
        expect(body.query).to.equal('hats');
        expect(body.searchItems).to.equal(0);
        expect(body.navigationItems).to.equal(0);
        expect(body.productItems).to.equal(4);
        done();
      });

      sayt.productSearch('hats');
    });

    it('should configure autocomplete query', done => {
      sayt.configure({ productSearch: { numProducts: 8, area: 'Other' } });
      mock.get(SAYT_URL, (req, res) => {
        const body = JSON.parse(req.body());
        expect(body.area).to.equal('Other');
        expect(body.productItems).to.equal(8);
        done();
      });

      sayt.productSearch('hats');
    });

    it('should allow query-time configuration', done => {
      mock.get(SAYT_URL, (req, res) => {
        const body = JSON.parse(req.body());
        expect(body.area).to.equal('dev');
        expect(body.productItems).to.equal(5);
        done();
      });

      sayt.productSearch('hats', { numProducts: 5, area: 'dev' });
    });
  });
});
