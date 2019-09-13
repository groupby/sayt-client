import { Sayt, SaytConfig, QueryTimeAutocompleteConfig } from '../../src/core/sayt';
import utils = require('../../src/core/utils');
import { expect } from 'chai';

const CUSTOMER_ID = 'services';
const SAYT_URL = `http://${CUSTOMER_ID}.groupbycloud.com/api/v1/sayt/search`;

describe('SAYT', () => {
  let sayt: Sayt;
  let backupJsonp;

  beforeEach(() => {
    backupJsonp = utils.jsonp;
    sayt = new Sayt({ subdomain: CUSTOMER_ID });
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
    it('should send query', (done) => {
      utils.jsonp = (url, body) => {
        expect(url).to.eq(SAYT_URL);
        expect(body.query).to.eq('skirts');
        expect(body.searchItems).to.eq(5);
        expect(body.navigationItems).to.eq(5);
        expect(body.productItems).to.eq(0);
        return Promise.resolve();
      };

      sayt.autocomplete('skirts')
        .then(() => done());
    });

    it('should configure query', (done) => {
      sayt.configure(<SaytConfig>{
        autocomplete: {
          numSearchTerms: 4,
          sortAlphabetically: true,
          language: 'en',
          a: 'b',
        },
      });
      utils.jsonp = (url, body) => {
        expect(body.searchItems).to.eq(4);
        expect(body.navigationItems).to.eq(5);
        expect(body.alphabetize).to.be.true;
        expect(body.language).to.eq('en');
        expect(body.a).to.eq('b');
        return Promise.resolve();
      };

      sayt.autocomplete('skirts')
        .then(() => done());
    });

    it('should allow query-time configuration', (done) => {
      sayt.configure({ autocomplete: { numSearchTerms: 4, sortAlphabetically: true } });
      utils.jsonp = (url, body) => {
        expect(body.searchItems).to.eq(8);
        expect(body.navigationItems).to.eq(2);
        expect(body.a).to.eq('b');
        return Promise.resolve();
      };

      sayt.autocomplete('skirts', <QueryTimeAutocompleteConfig>{ numSearchTerms: 8, numNavigations: 2, a: 'b' })
        .then(() => done());
    });
  });

  describe('productSearch()', () => {
    it('should send query', (done) => {
      utils.jsonp = (url, body) => {
        expect(url).to.eq(SAYT_URL);
        expect(body.query).to.eq('hats');
        expect(body.searchItems).to.eq(0);
        expect(body.navigationItems).to.eq(0);
        expect(body.productItems).to.eq(4);
        return Promise.resolve();
      };

      sayt.productSearch('hats')
        .then(() => done());
    });

    it('should configure query', (done) => {
      sayt.configure({
        productSearch: {
          numProducts: 8,
          area: 'Other',
          language: 'en',
          productSort: '~field:Descending',
        },
      });
      utils.jsonp = (url, body) => {
        expect(body.area).to.eq('Other');
        expect(body.productItems).to.eq(8);
        expect(body.language).to.eq('en');
        expect(body.productSort).to.eq('~field:Descending');
        return Promise.resolve();
      };

      sayt.productSearch('hats')
        .then(() => done());
    });

    it('should allow query-time configuration', (done) => {
      utils.jsonp = (url, body) => {
        expect(body.area).to.eq('dev');
        expect(body.productItems).to.eq(5);
        return Promise.resolve();
      };

      sayt.productSearch('hats', { numProducts: 5, area: 'dev' })
        .then(() => done());
    });
  });
});
