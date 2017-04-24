require('dotenv').config();
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

redis.defineCommand('mhgetall', {
  numberOfKeys: 1,
  lua: [
    `local ks = {}`,
    `KEYS[1]:gsub("([^%s]+)", function(item) table.insert(ks, item) end)`,
    `local result = {}`,
    `for _, v in pairs(ks) do`,
      `result[#result + 1] = redis.call('HGETALL', v)`,
    `end`,

    `return result`
  ].join(' ')
});

module.exports = redis;
