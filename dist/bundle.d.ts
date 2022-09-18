interface IFetchOption {
    isShowLoader?: boolean;
    isReloadOnError?: boolean;
    isReloadOnSuccess?: boolean;
}

declare class KonFetch {
    static getInstance(): KonFetch;
    loaderInject(): void;
    static init(): void;
    static get(url: string, option?: IFetchOption): Promise<any>;
    static post(url: string, body: FormData, option?: IFetchOption): Promise<any>;
    static showLoader(): void;
    static hideLoader(): void;
}

export { KonFetch as default };
