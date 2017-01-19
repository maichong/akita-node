'use strict';

var akita = require('akita');
var fetch = require('node-fetch');

akita.setOptions({ fetch: fetch });

var create = akita.create;

akita.create = function (options) {
  options = options || {};
  if (!options.fetch) {
    options.fetch = fetch;
  }
  return create(options);
};

module.exports = akita;
