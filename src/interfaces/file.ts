export interface CreateFileDto {
  type: string
  name: string
  parent_folder_id?: number
}

export interface UpdateFileDto {
  name?: string
}

export interface DeleteFileDto {
  id: number
}
