'use strict';

var akita = require('akita');
var fetch = require('node-fetch');
var FormData = require('form-data');

akita.setOptions({ fetch: fetch, FormData: FormData });

var create = akita.create;
var resolve = akita.resolve;

function newCreate(options) {
  options = options || {};
  if (!options.fetch) {
    options.fetch = fetch;
  }
  if (!options.FormData) {
    options.FormData = FormData;
  }
  let client = create(options);
  client.create = newCreate;
  client.resolve = newResolve;
  return client;
}

function newResolve() {
  let client = resolve.apply(this, arguments);
  if (!client._count) {
    // 还未发送请求，新实例
    if (!client._options.fetch) {
      client.setOptions({ fetch: fetch });
    }
    if (!client._options.FormData) {
      // 还未发送请求，新实例
      client.setOptions({ FormData: FormData });
    }
  }
  client.create = newCreate;
  client.resolve = newResolve;
  return client;
}

akita.create = newCreate;
akita.resolve = newResolve;

module.exports = akita;
