import { queryStringify } from 'src/utility/query-stringify';

import { router } from 'src/modules/MainRouter';
import { store, STORE_ITEM } from 'src/Storage/store';
import { TRequestOptions } from 'src/type_component';

export class HTTPTransport {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  getFullUrl(path: string) {
    return this.baseUrl + path;
  }

  get = (url: string, options: TRequestOptions = {}): Promise<XMLHttpRequest> =>
    this.request(this.getFullUrl(url), { ...options, method: 'GET' });

  post = (url: string, options: TRequestOptions = {}) =>
    this.request(this.getFullUrl(url), { ...options, method: 'POST' });

  put = (url: string, options: TRequestOptions = {}) =>
    this.request(this.getFullUrl(url), { ...options, method: 'PUT' });

  delete = (url: string, options: TRequestOptions = {}) =>
    this.request(this.getFullUrl(url), { ...options, method: 'DELETE' });

  request = (
    url: string,
    options: TRequestOptions & { method: 'GET' | 'POST' | 'PUT' | 'DELETE' }
  ): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data, timeout = 500 } = options;
    const dataIsFile = data instanceof File;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      const urlValue = method === 'GET' && !!data && !dataIsFile ? `${url}${queryStringify(data)}` : url;
      xhr.open(method, urlValue);
      // set headers
      if (!dataIsFile) {
        xhr.setRequestHeader('content-type', 'application/json');
      }
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });
      // set credentials
      xhr.withCredentials = true;
      // emit function if onload
      xhr.onload = () => {
        if (xhr.status === 401 && window.location.pathname !== '/') {
          console.log('401!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
          localStorage.removeItem(STORE_ITEM);
          console.log(localStorage);
          // window.location.reload();
          // store.setNull()
          // @ts-ignore
          store.set('currentUser', null);
          // if response 401 (Unauthorized) go to auth page
          router.go('/');
        } else if (xhr.status >= 400) {
          try {
            reject(JSON.parse(xhr.response));
          } catch {
            reject(xhr.response);
          }
        }

        resolve(xhr);
      };

      xhr.timeout = timeout;

      xhr.ontimeout = reject;
      xhr.onabort = reject;
      xhr.onerror = reject;

      if (method === 'GET' || !data) {
        xhr.send();
      } else if (dataIsFile) {
        const form = new FormData();
        form.append('avatar', data);
        xhr.send(form);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export const http = new HTTPTransport('https://ya-praktikum.tech/api/v2');
