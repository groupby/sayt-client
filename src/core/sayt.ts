import { jsonp } from '../utils/index';

const SAYT_URL = '.groupbycloud.com/api/v1/sayt/search';

export class Sayt {

  private config: SaytConfig = {
    autocomplete: {
      numSearchTerms: 5,
      numNavigations: 5
    },
    productSearch: {
      numProducts: 4
    }
  };

  configure(config: SaytConfig = this.config) {
    const finalConfig = Object.assign({}, this.config, config);
    finalConfig.autocomplete = Object.assign({}, this.config.autocomplete, config.autocomplete ? config.autocomplete : {});
    finalConfig.productSearch = Object.assign({}, this.config.productSearch, config.productSearch ? config.productSearch : {});
    this.config = finalConfig;
  }

  autocomplete(query: string = '', config?: IQueryTimeAutocompleteConfig, cb?: SearchCallback): Promise<any> {
    const finalConfig = Object.assign({ collection: this.config.collection }, this.config.autocomplete, config);
    const response = jsonp(this.url, {
      query,
      collection: finalConfig.collection,
      searchItems: finalConfig.numSearchTerms,
      navigationItems: finalConfig.numNavigations,
      alphabetize: finalConfig.sortAlphabetically,
      fuzzy: finalConfig.fuzzyMatch,

      productItems: 0
    });

    return this.callbackOrPromise(response, cb);
  }

  productSearch(query: string = '', config?: IQueryTimeProductSearchConfig, cb?: SearchCallback): Promise<any> {
    const finalConfig = Object.assign({ collection: this.config.collection }, this.config.productSearch, config);
    const response = jsonp(this.url, {
      query,
      collection: finalConfig.collection,
      area: finalConfig.area,
      refinements: finalConfig.refinements,
      productItems: finalConfig.numProducts,

      searchItems: 0,
      navigationItems: 0
    });

    return this.callbackOrPromise(response, cb);
  }

  private callbackOrPromise(promise: Promise<any>, cb: Function): Promise<any> {
    let response = promise;
    if (typeof cb === 'function') {
      response = promise.then((res) => cb(undefined, res))
        .catch((err) => cb(err));
    }
    return response;
  }

  private get url(): string {
    return `${this.config.https ? 'https' : 'http'}://${this.config.subdomain}${SAYT_URL}`;
  }
}

export interface SaytConfig {
  subdomain?: string;
  collection?: string;
  https?: boolean;

  autocomplete?: AutocompleteConfig;
  productSearch?: ProductSearchConfig;
}

export interface AutocompleteConfig {
  numSearchTerms?: number;
  numNavigations?: number;
  sortAlphabetically?: boolean;
  fuzzyMatch?: boolean;
}

export interface ProductSearchConfig {
  area?: string;
  numProducts?: number;
  productSort?: any;
}

export type IQueryTimeAutocompleteConfig = AutocompleteConfig & { collection?: string };
export type IQueryTimeProductSearchConfig = ProductSearchConfig & { collection?: string, refinements?: string };
export type SearchCallback = (err: Error, res?: any) => void;
