<h1 align="center">KonFetch - Javascript Fetch API Utility</h1>

## Example

```js
import KonFetch from '@emravoan/konfetch';

const params = { search: 'foobar', page: 1 };
const header = { 'X-Custom-Header': 'foobar' };
KonFetch.get('https://some-domain.com/api', header, params, { isShowLoading: true })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

## Usage

### Initialize

```js
// ES6 Modules or TypeScript
import KonFetch from '@emravoan/konfetch';

// CommonJS
const KonFetch = require('@emravoan/konfetch');
```

### Methods

```js
KonFetch.get(url, header, params, options);

KonFetch.delete(url, header, data, options);

KonFetch.post(url, header, data, options);

KonFetch.put(url, header, data, options);
```

### Config

```js
  // `url` is the server URL that will be used for the request
  url: 'https://some-domain.com/api',

  // `headers` are custom headers to be sent
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` are the URL parameters to be sent with the request
  // Must be a plain object or a URLSearchParams object
  // NOTE: params that are null or undefined are not rendered in the URL.
  params: {
    search: 'foobar'
  },

  // `data` is the data to be sent as the request body
  // Only applicable for request methods 'PUT', 'POST' and 'DELETE'
  // Must be a plain object or a FormData
  data: {
    name: 'Foo Bar'
  },

  // `options` is the setting
  // - isShowLoading: show loading while request to server
  // - isReloadOnError: reload the page if request is error
  // - isReloadOnError: reload the page if request is successful
  options: {
    isShowLoading: true // default
    isReloadOnError: false // default
    isReloadOnSuccess: false // default
  },
```
