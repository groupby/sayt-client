import qs = require('qs');
import rawJsonp = require('jsonp');

export function jsonp(url: string, body: any): Promise<any> {
  return new Promise((resolve, reject) => {
    rawJsonp(`${url}?${qs.stringify(body)}`, (err, data) => err ? reject(err) : resolve(data));
  });
}
