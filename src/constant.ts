export const qs = document.querySelector.bind(document);
export const qsa = document.querySelectorAll.bind(document);

export interface IFetchOption {
    isShowLoader?: boolean,
    isReloadOnError?: boolean,
    isReloadOnSuccess?: boolean,
}
