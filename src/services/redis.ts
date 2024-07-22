import { redis } from '../config/redis'

const get = async (key: string): Promise<string | null> => {
  return redis.get(key)
}

const set = async (key: string, value: string): Promise<void> => {
  await redis.set(key, value)
}

export default { get, set }
