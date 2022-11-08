import { IFetchOption, qs } from './constant';
import KonLoader from '@emravoan/konloader';
import '@emravoan/konloader/dist/bundle.css';

export default class Utils {
	static async fetch(
		url: string,
		method: string,
		body?: FormData | null,
		option: IFetchOption = { isShowLoader: true }
	) {
		const konloader = KonLoader.getInstance();
		const { isShowLoader, isReloadOnSuccess, isReloadOnError } = option;

		konloader.initialize();
		konloader.hide();
		konloader.hideFlash();

		if (isShowLoader || typeof isShowLoader === 'undefined') {
			konloader.show();
		}

		return fetch(url, {
			method: method || 'GET',
			headers: {
				Accept: 'application/json',
				'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZjZmZjkwZDI1OGVkNTdhNjBjNGYyY2Q2ZGZiNzI5MzIzNzNhMDljZmFkMjMwNDIxODBhZTBkMDEyZGUwODc4OTQzZWJlNDA1MDllNGE4MTciLCJpYXQiOjE2Njc4MTM4NzUuOTIyNjExLCJuYmYiOjE2Njc4MTM4NzUuOTIyNjE2LCJleHAiOjE2OTkzNDk4NzUuOTIwMTM5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.llhkdDpYQCp_ZREtnCgTvvLglNJrPBSNeFeWsiKxEOzncAVJFC5Gcp0AjM81bkNKzUXunac3Sja0RpjkZT94FA`,
			},
			body: body,
		})
			.then(async res => {
				// redirect handler
				if (res.redirected) {
					window.location.href = res.url;
					return;
				}

				const jsonRes = await res.json();
				// const { message } = jsonRes;

				// throw error
				if (!res.ok) throw jsonRes;

				// show toast and alert
				// if (message) {
				// 	if (!isReloadOnSuccess) {
				// 		Utils.initToast(message);
				// 	}
				// }

				if (!isReloadOnSuccess) return jsonRes;

				window.location.reload();
			})
			.catch(error => {
				if (typeof error !== 'object' || Object.keys(error).length === 0) {
					// Utils.initToast(
					// 	`<div class="text-center"><h6 class="mb-1">Technical Error!</h6>Please contact to administrator.</div>`,
					// 	'error'
					// );
					throw new Error(error);
				}

				if (typeof error.message !== 'undefined') {
					if (!isReloadOnError) {
						// Utils.initToast(error.message, 'error');
					} else {
						// Utils.delCookie(STR_RESMSG_SUCCESS);
						// Utils.setCookie(STR_RESMSG_ERROR, error.message);
					}
				}

				if (!isReloadOnError) throw error;

				window.location.reload();
			})
			.finally(() => {
				if (isShowLoader || typeof isShowLoader === 'undefined') {
					konloader.hide();
				}
			});
	}
}
