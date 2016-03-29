/*global describe:true, it:true, beforeEach: true, afterEach:true */

var
    demand = require('must'),
    jumphash = require('./index');

describe('jumphash', function()
{
    it('exports a function', function()
    {
        jumphash.must.be.a.function();
    });

    it('requires that the key argument be non-negative', function()
    {
        function shouldThrow() { return jumphash(-1, 20); }
        shouldThrow.must.throw(/non-negative/);
    });

    it('requires that the bucket count argument be greater than zero', function()
    {
        function shouldThrow() { return jumphash(1, -1); }
        shouldThrow.must.throw(/positive integer/);
        function shouldThrow2() { return jumphash(1, 0); }
        shouldThrow2.must.throw(/positive integer/);
    });

    it('returns an integer', function()
    {
        var result = jumphash(5000, 20);
        result.must.be.a.number();
        result.must.be.above(-1);
        result.must.be.below(20 + 1);
    });

    it('has reasonable output for a number of possibilities', function()
    {
        var key = 42;

        for (var i = 1; i < 1000; i++)
        {
            var comp = jumphash(key, i);
            comp.must.be.above(-1);
            comp.must.be.below(i);
        }
    });

    it('distributes the output somewhere reasonable', function()
    {
        var buckets = 16;
        var hits = {};

        for (var i = 1; i < 16000; i++)
        {
            var result = jumphash(i, buckets);
            hits[result] = true;
        }

        for (var i = 0; i < 16; i++)
            hits[i].must.be.true();
    });

    it('does something reasonable with non-integer input', function()
    {
        var result = jumphash(45344.2, 2.4);
        result.must.be.above(-1);
        result.must.be.below(2);
    });

    it('accepts a buffer as a key', function()
    {
        var buf = new Buffer([1, 2, 3, 4]);
        var result = jumphash(buf, 20);
        result.must.be.a.number();
        result.must.be.above(-1);
        result.must.be.below(20 + 1);
    });

    it('accepts larger buffers than it needs', function()
    {
        var crypto = require('crypto');
        var md5sum = crypto
            .createHash('md5')
            .update('once more into the breach dear friends or stop up this wall')
            .digest();

        var result = jumphash(md5sum, 16);
        result.must.be.a.number();
        result.must.be.above(-1);
        result.must.be.below(20 + 1);
        result.must.equal(11);
    });

    it('does not blow up with zero-length buffers', function()
    {
        var buf = new Buffer(0);
        var result = jumphash(buf, 20);
        result.must.be.a.number();
        result.must.be.above(-1);
        result.must.be.below(20 + 1);
    });
});
