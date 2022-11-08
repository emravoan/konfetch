import { IFetchOption } from './constant';
import Utils from './utils';
import './scss/app.scss';

export default class KonFetch {
	static get(url: string, option?: IFetchOption) {
		return Utils.fetch(url, 'get', null, option);
	}

	static post(url: string, body: FormData, option?: IFetchOption) {
		return Utils.fetch(url, 'post', body, option);
	}
}
