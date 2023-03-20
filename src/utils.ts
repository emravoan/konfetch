import { IFetchOption } from './constant';
import KonToast from '@emravoan/kontoast';
import KonLoader from '@emravoan/konloader';

export default class Utils {
  static async fetch(
    method: string,
    url: string,
    headers?: Record<string, string>,
    body?: BodyInit,
    option: IFetchOption = { isShowLoading: true, isShowToast: true }
  ) {
    const { isShowToast, isShowLoading, isReloadOnError, isReloadOnSuccess } = option;

    // todo: show loading as default
    if (isShowLoading || typeof isShowLoading === 'undefined') {
      KonLoader.show();
    }

    return fetch(url, { method: method.toUpperCase(), headers, body })
      .then(async res => {
        // todo: redirect handler
        if (res.redirected) {
          window.location.href = res.url;
          return;
        }

        const jsonRes = await res.json();
        const { message } = jsonRes;

        // todo: throw error
        if (!res.ok) throw jsonRes;

        // todo: show success toast
        if (message) {
          if (!isReloadOnSuccess && (isShowToast || typeof isShowToast === 'undefined')) {
            KonToast.success({
              title: 'Success',
              text: message,
            });
          }
        }

        // todo: resolve response
        if (!isReloadOnSuccess) return jsonRes;

        // todo: reload page
        window.location.reload();
      })
      .catch(error => {
        if (typeof error !== 'object' || Object.keys(error).length === 0) {
          KonToast.error({
            title: 'Error',
            text: `<div class="text-center"><h6 class="mb-1">Oops!</h6>Something went wrong.</div>`,
          });
          throw new Error(error);
        }

        if (typeof error.message !== 'undefined') {
          // todo: show error toast
          if (!isReloadOnError && (isShowToast || typeof isShowToast === 'undefined')) {
            KonToast.error({
              title: 'Error',
              text: error.message,
            });
          }
        }

        // todo: throw error
        if (!isReloadOnError) throw new Error(error);

        // todo: reload page
        window.location.reload();
      })
      .finally(() => {
        // todo: hide loader
        if (isShowLoading || typeof isShowLoading === 'undefined') {
          KonLoader.hide();
        }
      });
  }
}
