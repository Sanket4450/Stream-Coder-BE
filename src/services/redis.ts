import { redis } from '../config/redis'

export class RedisService {
  public get = async (key: string): Promise<string | null> => {
    return redis.get(key)
  }

  public set = async (key: string, value: string): Promise<void> => {
    await redis.set(key, value)
  }
}
