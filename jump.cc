#include <node.h>
#include "nan.h"

using namespace v8;

int32_t jumpConsistentHash(uint64_t key, int32_t num_buckets)
{
    int64_t b = -1, j = 0;
    while (j < num_buckets)
    {
        b = j;
        key = key * 2862933555777941757ULL + 1;
        j = (b + 1) * (double(1LL << 31) / double((key >> 33) + 1));
    }

    return b;
}

NAN_METHOD(JumpConsistentHash)
{
    NanScope();

    uint64_t key = args[0]->IntegerValue();
    int32_t buckets = args[1]->Uint32Value();

    int32_t dest = jumpConsistentHash(key, buckets);

    NanReturnValue(NanNew<Number>(dest));
}

NAN_METHOD(JumpBuffer)
{
    NanScope();

    Local<Object> buffer = args[0].As<Object>();
    size_t length = node::Buffer::Length(buffer);
    const uint8_t* data = reinterpret_cast<const uint8_t* >(node::Buffer::Data(buffer));
    int bytelen = (length < 8 ? length : 8);
    int32_t buckets = args[1]->Uint32Value();

    uint64_t key = 0;
    for (int i = 0; i < bytelen; i++)
        key = (key << 8) ^ data[i];

    int32_t dest = jumpConsistentHash(key, buckets);
    NanReturnValue(NanNew<Number>(dest));
}

// ------------ ceremony

void InitAll(Handle<Object> exports, Handle<Object> module)
{
    exports->Set(NanNew<String>("jumphash"), NanNew<FunctionTemplate>(JumpConsistentHash)->GetFunction());
    exports->Set(NanNew<String>("jumpbuffer"), NanNew<FunctionTemplate>(JumpBuffer)->GetFunction());
}

NODE_MODULE(jumpsuit, InitAll)
