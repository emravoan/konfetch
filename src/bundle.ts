import './scss/app.scss';
import Utils from './utils';
import type { IFetchOption, IObject } from './constant';

export default class KonFetch {
  static async get(url: string, headers: Record<string, string> = {}, params: IObject = {}, option: IFetchOption = {}) {
    const nUrl = new URL(url);
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        nUrl.searchParams.set(key, val?.toString() || '');
      });
    }
    return Utils.fetch('get', nUrl.toString(), headers, null, option);
  }

  static async post(
    url: string,
    headers: Record<string, string> = {},
    data: FormData | IObject = {},
    option: IFetchOption = {}
  ) {
    const payload = await KonFetch.buildPayload(data);
    return Utils.fetch('post', url, headers, JSON.stringify(payload), option);
  }

  static async put(
    url: string,
    headers: Record<string, string> = {},
    data: FormData | IObject = {},
    option: IFetchOption = {}
  ) {
    const payload = await KonFetch.buildPayload(data);
    return Utils.fetch('put', url, headers, JSON.stringify(payload), option);
  }

  static async patch(
    url: string,
    headers: Record<string, string> = {},
    data: FormData | IObject = {},
    option: IFetchOption = {}
  ) {
    const payload = await KonFetch.buildPayload(data);
    return Utils.fetch('patch', url, headers, JSON.stringify(payload), option);
  }

  static async delete(
    url: string,
    headers: Record<string, string> = {},
    data: FormData | IObject = {},
    option: IFetchOption = {}
  ) {
    const payload = await KonFetch.buildPayload(data);
    return Utils.fetch('delete', url, headers, JSON.stringify(payload), option);
  }

  static async buildPayload(data: FormData | IObject) {
    if (!(data instanceof FormData)) {
      return data;
    }

    const payload = {};
    data.forEach((value, key) => {
      payload[key] = value;
    });

    return payload;
  }
}

export { IFetchOption, IObject };
