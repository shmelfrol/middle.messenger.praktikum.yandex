import { assert, expect } from 'chai';
import { newMockXhr } from 'mock-xmlhttprequest';

import { HTTPTransport } from 'src/modules/HttpTransport';

const MockXhr = newMockXhr();
MockXhr.onSend = (request) => {
  const requestHeaders = request.requestHeaders.getAll();
  const requestUrl = request.url;
  const requestBody = request.body;

  const responseHeaders = { 'Content-Type': 'application/json' };

  const response = {
    message: 'Success!',
    requestUrl,
    requestHeaders,
    requestBody,
  };
  request.respond(200, responseHeaders, JSON.stringify(response));
};

// eslint-disable-next-line no-global-assign
XMLHttpRequest = MockXhr;

describe('Test HTTPTransport', () => {
  const api = new HTTPTransport('/my/url');

  it('method get should produce a success response', () =>
    api.get('').then((result) => {
      assert.equal(JSON.parse(result.response).message, 'Success!');
    }));

  it('method put should produce a success response', () =>
    api.put('').then((result) => {
      assert.equal(JSON.parse(result.response).message, 'Success!');
    }));

  it('method post should produce a success response', () =>
    api.post('').then((result) => {
      assert.equal(JSON.parse(result.response).message, 'Success!');
    }));

  it('method delete should produce a success response', () =>
    api.delete('').then((result) => {
      assert.equal(JSON.parse(result.response).message, 'Success!');
    }));

  it('should provide timeout', () =>
    api.get('', { timeout: 1000 }).then((result) => {
      assert.equal(result.timeout, 1000);
    }));

  it('should set withCredentials', () =>
    api.get('', { timeout: 1000 }).then((result) => {
      assert.equal(result.withCredentials, true);
    }));

  it('should transform data for get method in url', () =>
    api.get('', { data: { name: 'vasya' } }).then((result) => {
      assert.equal(JSON.parse(result.response).requestUrl, '/my/url?name=vasya');
    }));

  it('should provide body for post url', () =>
    api.post('', { data: { name: 'petya' } }).then((result) => {
      expect(JSON.parse(JSON.parse(result.response).requestBody)).to.eql({ name: 'petya' });
    }));
});
