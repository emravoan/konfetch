import { IFetchOption } from './constant';
import KonToast from '@emravoan/kontoast';
import KonLoader from '@emravoan/konloader';

export default class Utils {
  static async fetch(
    method: string,
    url: string,
    headers?: HeadersInit,
    body?: BodyInit,
    option: IFetchOption = { isShowLoading: true, isShowToast: true }
  ) {
    const { isShowLoading, isShowToast, isReloadOnSuccess, isReloadOnError } = option;

    if (isShowLoading || typeof isShowLoading === 'undefined') {
      KonLoader.show();
    }

    return fetch(url, { method: method?.toUpperCase() || 'GET', headers, body })
      .then(async res => {
        // redirect handler
        if (res.redirected) {
          window.location.href = res.url;
          return;
        }

        const jsonRes = await res.json();
        const { message } = jsonRes;

        // throw error
        if (!res.ok) throw jsonRes;

        // show toast and alert
        if (message) {
          if (!isReloadOnSuccess && (isShowToast || typeof isShowToast === 'undefined')) {
            KonToast.success({
              title: 'Success',
              text: message,
            });
          }
        }

        if (!isReloadOnSuccess) return jsonRes;

        window.location.reload();
      })
      .catch(error => {
        console.debug(Object.keys(error).length === 0);
        if (typeof error !== 'object' || Object.keys(error).length === 0) {
          KonToast.error({
            title: 'Error',
            text: `<div class="text-center"><h6 class="mb-1">Oops!</h6>Something went wrong.</div>`,
          });
          throw new Error(error);
        }

        if (typeof error.message !== 'undefined') {
          if (!isReloadOnError && (isShowToast || typeof isShowToast === 'undefined')) {
            KonToast.error({
              title: 'Error',
              text: error.message,
            });
          }
        }

        if (!isReloadOnError) throw error;

        window.location.reload();
      })
      .finally(() => {
        if (isShowLoading || typeof isShowLoading === 'undefined') {
          KonLoader.hide();
        }
      });
  }
}
