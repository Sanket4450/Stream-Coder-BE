import {
  DeepPartial,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
} from 'typeorm'
import { File } from '../entities'
import { BaseRepository } from './base'

export class FileRepository extends BaseRepository<File> {
  constructor() {
    super(File)
  }

  findById = (
    id: number,
    fields?: FindOptionsSelect<File>,
    relations?: FindOptionsRelations<File>
  ) => {
    return new Promise((resolve, reject) => {
      this.repository
        .findOne({
          where: { id },
          select: fields,
          relations,
        })
        .then((results) => {
          resolve(results)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  findOne = async (
    queryObject: FindOptionsWhere<File>,
    fields?: FindOptionsSelect<File>,
    relations?: FindOptionsRelations<File>
  ) => {
    return new Promise((resolve, reject) => {
      this.repository
        .findOne({
          where: queryObject,
          select: fields,
          relations,
        })
        .then((results) => {
          resolve(results)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  find = async (
    queryObject: FindOptionsWhere<File> = {},
    fields?: FindOptionsSelect<File>,
    order?: FindOptionsOrder<File>,
    relations?: FindOptionsRelations<File>
  ) => {
    return new Promise((resolve, reject) => {
      this.repository
        .find({
          where: queryObject,
          select: fields || ['id'],
          ...(order && { order }),
          relations,
        })
        .then((results) => {
          resolve(results)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  insert = async (data: DeepPartial<File>) => {
    return new Promise((resolve, reject) => {
      this.repository
        .insert(data)
        .then((results) => {
          resolve(results)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}
