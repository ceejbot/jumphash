# @ceejbot/jumphash

Really remarkably trivial node bindings for Google's [jump consistent hash](http://arxiv.org/pdf/1406.2294v1.pdf).

[![Build Status](http://img.shields.io/travis/ceejbot/jumphash/master.svg?style=flat)](http://travis-ci.org/ceejbot/jumphash) [![on npm](http://img.shields.io/npm/v/@ceejbot/jumphash.svg?style=flat)](https://www.npmjs.com/package/@ceejbot/jumphash)

Tested on nodes 4, 6, and 7. Is probably just fine on node 0.10 too.

```
npm install --save @ceejbot/jumphash
```

## Usage

This module provides one function: `jumphash(key, bucketCount)`. `key` must be a non-negative integer or a buffer. `bucketCount` must be a positive integer (0 is an invalid bucket count).

The return value is a integer in the range `[0, bucketCount)` that you can use as you wish. The paper linked above describes the intended data storage use.

```javascript
var jumphash = require('@ceejbot/jumphash')
    assert = require('assert'),
    crypto = require('crypto');

var location = jumphash(23102, 16);
assert(location >= 0);
assert(location < 16);

var buffer = crypto
    .createHash('md5')
    .update('my-string-key-for-some-resource')
    .digest();
var location2 = jumphash(buffer, 16);
```

Only the first 64 bits of the buffer are considered, with the most significant bit first.

## License

ISC
