// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: strong-build
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

var assert = require('assert');
var debug = require('debug')('strong-build:test');
var sh = require('shelljs');

require('./build-example')('suite', ['-i', '--scripts'], function(er) {
  debug('built with error?', er);
  assert.ifError(er);
  assert(sh.test('-d', 'node_modules'));

  var addons = sh.find('node_modules').filter(function(path) {
    // .../mongodb/node_modules/bson/ contains compiled addons. Others could in
    // the future, but for now, this works to assert addons weren't compiled
    // during the `npm install`
    return path.match(/.*\.node$/) && !path.match(/node_modules\/bson/);
  });

  debug('addons:', addons);

  assert(addons.length > 0);
});
