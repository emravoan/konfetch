import { IFetchOption, qs } from './constant';

export default class Utils {
	static toggleLoader(isHide: boolean = false) {
		const elLoader = qs('#lds-loader') as HTMLElement;
		elLoader?.style.setProperty('display', isHide ? 'none' : '');
	}

	static async fetch(
		url: string,
		method: string,
		body?: FormData | null,
		option: IFetchOption = { isShowLoader: true }
	) {
		const { isShowLoader, isReloadOnSuccess, isReloadOnError } = option;

		// show loading screen
		if (isShowLoader || typeof isShowLoader === 'undefined') Utils.toggleLoader();

		return fetch(url, { method: method || 'GET', body: body })
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
				if (isShowLoader || typeof isShowLoader === 'undefined') Utils.toggleLoader(true);
			});
	}
}
