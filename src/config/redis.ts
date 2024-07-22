import Redis from 'ioredis'

export const redis = new Redis({
  port: 6379,
  retryStrategy: (times) => Math.min(times * 50, 2000),
})
