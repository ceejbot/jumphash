# jumpsuit

Really remarkably trivial node bindings for Google's [jump consistent hash](http://arxiv.org/pdf/1406.2294v1.pdf).

## Usage

This module provides one function: `jumpsuit(key, bucketCount)`. `key` must be a non-negative integer. (0 is okay.) `bucketCount` must be a positive integer (0 is an invalid bucket count).

The return value is a integer in the range `[0, bucketCount)` that you can use as you wish. The paper linked above describes the intended data storage use.

```javascript
var jumpsuit = require('jumpsuit')
    assert = require('assert');

var location = jumpsuit(23102, 16);
assert(location >= 0);
assert(location < 16);
```

## License

ISC
