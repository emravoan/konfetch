const qs = document.querySelector.bind(document);
document.querySelectorAll.bind(document);

class Utils {
  static toggleLoader(isHide = false) {
    const elLoader = qs("#lds-loader");
    elLoader == null ? void 0 : elLoader.style.setProperty("display", isHide ? "none" : "");
  }
  static async fetch(url, method, body, option = { isShowLoader: true }) {
    const { isShowLoader, isReloadOnSuccess, isReloadOnError } = option;
    if (isShowLoader || typeof isShowLoader === "undefined")
      Utils.toggleLoader();
    return fetch(url, { method: method || "GET", body }).then(async (res) => {
      if (res.redirected) {
        window.location.href = res.url;
        return;
      }
      const jsonRes = await res.json();
      if (!res.ok)
        throw jsonRes;
      if (!isReloadOnSuccess)
        return jsonRes;
      window.location.reload();
    }).catch((error) => {
      if (typeof error !== "object" || Object.keys(error).length === 0) {
        throw new Error(error);
      }
      if (typeof error.message !== "undefined") ;
      if (!isReloadOnError)
        throw error;
      window.location.reload();
    }).finally(() => {
      if (isShowLoader || typeof isShowLoader === "undefined")
        Utils.toggleLoader(true);
    });
  }
}

let konFetchInstance;
class KonFetch {
  static getInstance() {
    if (!konFetchInstance)
      konFetchInstance = new KonFetch();
    return konFetchInstance;
  }
  loaderInject() {
    const parser = new DOMParser();
    const elLoader = document.createElement("div");
    const elLoaderDOM = `
			<div class="lds-roller d-inline-block position-relative" style="width: 80px; height: 80px; z-index: 2">
				<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
			</div>
		`;
    elLoader.id = "lds-loader";
    elLoader.classList.add("lds-container");
    elLoader.style.setProperty("display", "none");
    elLoader.appendChild(parser.parseFromString(elLoaderDOM, "text/html").body.firstChild);
    document.body.appendChild(elLoader);
  }
  static init() {
    KonFetch.getInstance().loaderInject();
  }
  static get(url, option) {
    return Utils.fetch(url, "get", null, option);
  }
  static post(url, body, option) {
    return Utils.fetch(url, "post", body, option);
  }
  static showLoader() {
    Utils.toggleLoader();
  }
  static hideLoader() {
    Utils.toggleLoader(true);
  }
}

export { KonFetch as default };
