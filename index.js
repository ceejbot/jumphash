var
    assert   = require('assert'),
    bindings = require('bindings'),
    jumphash = bindings('jumphash')
    ;

module.exports = function wrapper(key, buckets)
{
    assert((typeof key == 'number' && (key >= 0)) ||
        Buffer.isBuffer(key), 'you must pass a non-negative integer key OR a buffer');
    assert(typeof buckets == 'number' && (buckets > 0), 'you must pass a positive integer bucketCount');

    if (Buffer.isBuffer(key))
        return jumphash.jumpbuffer(key, buckets);

    return jumphash.jumphash(key, buckets);
};
