import { jsonp } from './utils';
import filterObject = require('filter-object');

const SAYT_URL = '.groupbycloud.com/api/v1/sayt/search';

export class Sayt {

  private config: SaytConfig = {
    autocomplete: {
      numNavigations: 5,
      numSearchTerms: 5,
    },
    productSearch: {
      numProducts: 4,
    },
  };

  constructor(config?: SaytConfig) {
    this.configure(config);
  }

  configure(config: SaytConfig = {}) {
    Object.assign(this.config, filterObject(config, '!{autocomplete,productSearch}'));
    Object.assign(this.config.autocomplete, config.autocomplete || {});
    Object.assign(this.config.productSearch, config.productSearch || {});
  }

  autocomplete(query: string = '', config?: QueryTimeAutocompleteConfig, cb?: SearchCallback): Promise<AutocompleteResponse> {
    const finalConfig: QueryTimeAutocompleteConfig =
      Object.assign({ collection: this.config.collection }, this.config.autocomplete, config);
    const response = jsonp(this.url, {
      alphabetize: finalConfig.sortAlphabetically,
      collection: finalConfig.collection,
      fuzzy: finalConfig.fuzzyMatch,
      query,
      language: finalConfig.language,
      navigationItems: finalConfig.numNavigations,
      productItems: 0,
      searchItems: finalConfig.numSearchTerms,
    });

    return this.callbackOrPromise(response, cb);
  }

  productSearch(query: string = '', config?: QueryTimeProductSearchConfig, cb?: SearchCallback): Promise<AutocompleteResponse> {
    const finalConfig: QueryTimeProductSearchConfig =
      Object.assign({ collection: this.config.collection }, this.config.productSearch, config);
    const response = jsonp(this.url, {
      area: finalConfig.area,
      collection: finalConfig.collection,
      query,
      language: finalConfig.language,
      navigationItems: 0,
      productItems: finalConfig.numProducts,
      productSort: finalConfig.productSort,
      refinements: finalConfig.refinements,
      searchItems: 0,
    });

    return this.callbackOrPromise(response, cb);
  }

  private callbackOrPromise(promise: Promise<any>, cb: (error?: Error, response?: any) => void): Promise<any> {
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
  language?: string;
  numSearchTerms?: number;
  numNavigations?: number;
  sortAlphabetically?: boolean;
  fuzzyMatch?: boolean;
}

export interface ProductSearchConfig {
  language?: string;
  area?: string;
  numProducts?: number;
  productSort?: any;
}

export interface AutocompleteResponse {
  status: {
    code: number;
    internalCode: number;
    message: 'string';
    additionalInfo: any;
    serverTimeStamp: number;
  }
  result: {
    stats: {
      navigationCount: number;
      searchCount: number;
      productCount: number;
      autocompleteResponse: number;
      productSearchResponse: number;
    }
    searchTerms: AutocompleteSearchTerm[] | null;
    navigations: AutocompleteNavigation[] | null;
    products: any;
  }
}

export interface AutocompleteSearchTerm {
  additionalInfo: {
    [key: string]: any;
  }
  distanceToDepluralized: number;
  distanceToSearch: number;
  value: string;
}

export interface AutocompleteNavigation {
  name: string;
  values: string[];
}

export type QueryTimeAutocompleteConfig = AutocompleteConfig & { collection?: string };
export type QueryTimeProductSearchConfig = ProductSearchConfig & { collection?: string, refinements?: string };
export type SearchCallback = (err: Error, res?: any) => void;
