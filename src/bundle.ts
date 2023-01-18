import type { IFetchOption, IObject } from './constant';
import Utils from './utils';
import './scss/app.scss';

export default class KonFetch {
  static get(url: string, headers?: HeadersInit, params?: IObject, option?: IFetchOption) {
    const nUrl = new URL(url);
    Object.entries(params).forEach(param => {
      nUrl.searchParams.set(param[0], param[1] || '');
    });
    return Utils.fetch('get', nUrl.toString(), headers || [], null, option);
  }

  static delete(url: string, headers?: HeadersInit, data?: FormData | IObject, option?: IFetchOption) {
    let payload = data;
    if (data instanceof FormData) {
      data.forEach((val, key) => (payload[key] = val));
    }
    return Utils.fetch('delete', url, headers || [], JSON.stringify(payload), option);
  }

  static post(url: string, headers?: HeadersInit, data?: FormData | IObject, option?: IFetchOption) {
    let payload = data;
    if (data instanceof FormData) {
      data.forEach((val, key) => (payload[key] = val));
    }
    return Utils.fetch('post', url, headers || [], JSON.stringify(payload), option);
  }

  static put(url: string, headers?: HeadersInit, data?: FormData | IObject, option?: IFetchOption) {
    let payload = data;
    if (data instanceof FormData) {
      data.forEach((val, key) => (payload[key] = val));
    }
    return Utils.fetch('put', url, headers || [], JSON.stringify(payload), option);
  }
}

export { IFetchOption, IObject };
