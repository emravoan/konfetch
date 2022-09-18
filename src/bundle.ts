import { IFetchOption } from './constant';
import './scss/app.scss';
import Utils from './utils';

let konFetchInstance: KonFetch;

export default class KonFetch {
	static getInstance() {
		if (!konFetchInstance) konFetchInstance = new KonFetch();
		return konFetchInstance;
	}

	loaderInject() {
		const parser = new DOMParser();
		const elLoader = document.createElement('div');
		const elLoaderDOM = `
			<div class="lds-roller d-inline-block position-relative" style="width: 80px; height: 80px; z-index: 2">
				<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
			</div>
		`;

		elLoader.id = 'lds-loader';
		elLoader.classList.add('lds-container');
		elLoader.style.setProperty('display', 'none');
		elLoader.appendChild(parser.parseFromString(elLoaderDOM, 'text/html').body.firstChild as HTMLElement);

		document.body.appendChild(elLoader);
	}

	static init() {
		KonFetch.getInstance().loaderInject();
	}

	static get(url: string, option?: IFetchOption) {
		return Utils.fetch(url, 'get', null, option);
	}

	static post(url: string, body: FormData, option?: IFetchOption) {
		return Utils.fetch(url, 'post', body, option);
	}

	static showLoader() {
		Utils.toggleLoader();
	}

	static hideLoader() {
		Utils.toggleLoader(true);
	}
}
