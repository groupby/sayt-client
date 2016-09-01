declare function jsonp(url: string, params?: IOptions, cb?: (err: Error, data: any) => void): () => void;
declare interface IOptions {
  param?: string;
  timeout?: number;
  prefix?: string;
  name?: string;
}
declare module 'jsonp' {
  export = jsonp;
}
