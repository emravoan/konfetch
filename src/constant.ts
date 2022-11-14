export const qs = document.querySelector.bind(document);
export const qsa = document.querySelectorAll.bind(document);

export interface IObject {
  [index: string]: string;
}

export interface IFetchOption {
  isShowToast?: boolean;
  isShowLoading?: boolean;
  isReloadOnError?: boolean;
  isReloadOnSuccess?: boolean;
}
