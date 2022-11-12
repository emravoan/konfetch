export const qs = document.querySelector.bind(document);
export const qsa = document.querySelectorAll.bind(document);

export interface IObject {
  [index: string]: string;
}

export interface IFetchOption {
  isShowLoading?: boolean;
  isReloadOnError?: boolean;
  isReloadOnSuccess?: boolean;
}
