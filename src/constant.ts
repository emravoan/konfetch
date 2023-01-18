export const qs = document.querySelector.bind(document);
export const qsa = document.querySelectorAll.bind(document);

export interface IObject {
  [key: string]: string | null | undefined;
}

export interface IFetchOption {
  isShowToast?: boolean;
  isShowLoading?: boolean;
  isReloadOnError?: boolean;
  isReloadOnSuccess?: boolean;
}
