import { EntityTarget, ObjectLiteral, Repository } from 'typeorm'
import { AppDataSource } from '../config/data-source'

export class BaseRepository<T> {
  protected readonly repository: Repository<T>

  constructor(entity: EntityTarget<T>) {
    this.repository = AppDataSource.getRepository(entity)
  }
}
