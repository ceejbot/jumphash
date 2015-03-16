var
    assert   = require('assert'),
    bindings = require('bindings'),
    jumpsuit = bindings('jumpsuit').jumphash
    ;

module.exports = function wrapper(key, buckets)
{
    assert(typeof key == 'number' && (key >= 0), 'you must pass a non-negative integer key');
    assert(typeof buckets == 'number' && (buckets > 0), 'you must pass a positive integer bucketCount');

    return jumpsuit(key, buckets);
};
