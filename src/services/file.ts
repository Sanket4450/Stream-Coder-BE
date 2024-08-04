import httpStatus from 'http-status'
import { MSG } from '../helper/messages'
import { HttpError } from '../utils/HttpError'
import { CreateFileDto, DeleteFileDto, UpdateFileDto } from '../interfaces/file'
import { File } from '../models'
import { AppDataSource } from '../config/data-source'
import { IsNull } from 'typeorm'

export class FileService {
  private fileRepository = AppDataSource.getRepository(File)

  private getFolderChildren = async (parentId: number) => {
    const children = await this.fileRepository.find({
      where: { parent: { id: parentId } },
      order: { type: 'DESC', name: 'DESC' },
    })

    const childrenWithGrandChildren = await Promise.all(
      children.map(async (child) => {
        const grandChildren = await this.getFolderChildren(child.id)
        return {
          ...child,
          children: grandChildren,
        }
      })
    )

    return childrenWithGrandChildren
  }

  public getFolderStructure = async () => {
    try {
      const roots = await this.fileRepository.find({
        where: { parent: IsNull() },
        order: { type: 'DESC' },
      })

      for (let root of roots) {
        root.children = await this.getFolderChildren(root.id)
      }

      return roots
    } catch (error) {
      throw new HttpError(
        error.message || MSG.INTERNAL_SERVER_ERROR,
        error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  public createFile = async (body: CreateFileDto) => {
    try {
      if (body.parent_folder_id) {
        if (
          !(await this.fileRepository.findOne({
            where: { id: body.parent_folder_id },
          }))
        ) {
          throw new HttpError(MSG.FOLDER_NOT_FOUND, httpStatus.NOT_FOUND)
        }
      }

      return this.fileRepository.insert({
        ...body,
        parent: { id: body.parent_folder_id },
      })
    } catch (error) {
      throw new HttpError(
        error.message || MSG.INTERNAL_SERVER_ERROR,
        error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  public updateFile = async (id: number, body: UpdateFileDto) => {
    try {
      if (
        !(await this.fileRepository.findOne({
          where: { id },
          select: ['id'],
        }))
      ) {
        throw new HttpError(MSG.FILE_FOLDER_NOT_FOUND, httpStatus.NOT_FOUND)
      }

      return this.fileRepository.update({ id }, { ...body })
    } catch (error) {
      throw new HttpError(
        error.message || MSG.INTERNAL_SERVER_ERROR,
        error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  private deleteChildFiles = async (parentId: number) => {
    const childFiles = await this.fileRepository.find({
      where: { parent: { id: parentId } },
    })

    if (childFiles.length) {
      for (const childFile of childFiles) {
        await this.deleteChildFiles(childFile.id)
      }

      await this.fileRepository.delete({ parent: { id: parentId } })
    }
  }

  public deleteFile = async (body: DeleteFileDto) => {
    try {
      if (
        !(await this.fileRepository.findOne({
          where: { id: body.id },
          select: ['id'],
        }))
      ) {
        throw new HttpError(MSG.FILE_FOLDER_NOT_FOUND, httpStatus.NOT_FOUND)
      }

      await this.deleteChildFiles(body.id)

      return this.fileRepository.delete({ id: body.id })
    } catch (error) {
      throw new HttpError(
        error.message || MSG.INTERNAL_SERVER_ERROR,
        error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  public getFileContent = async (id: number) => {
    try {
      const file = await this.fileRepository.findOne({
        where: { id },
        select: ['id', 'content'],
      })

      if (!file) {
        throw new HttpError(MSG.FILE_NOT_FOUND, httpStatus.NOT_FOUND)
      }

      return file
    } catch (error) {
      throw new HttpError(
        error.message || MSG.INTERNAL_SERVER_ERROR,
        error.statusCode || httpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
