'use strict';

var akita = require('akita');
var fetch = require('node-fetch');

akita.setOptions({ fetch: fetch });

var create = akita.create;
var resolve = akita.resolve;

function newCreate(options) {
  options = options || {};
  if (!options.fetch) {
    options.fetch = fetch;
  }
  let client = create(options);
  client.create = newCreate;
  client.resolve = newResolve;
  return client;
}

function newResolve() {
  let client = resolve.apply(this, arguments);
  if (!client._count && !client._options.fetch) {
    // 还未发送请求，新实例
    client.setOptions({ fetch: fetch });
  }
  client.create = newCreate;
  client.resolve = newResolve;
  return client;
}

akita.create = newCreate;
akita.resolve = newResolve;

module.exports = akita;
