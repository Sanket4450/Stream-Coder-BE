import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './user'
import { File } from './file'

@Entity()
export class Room {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @Column({ type: 'char', length: 8 })
  unique_id: string

  @OneToMany(() => User, (user) => user.room)
  participants: User[]

  @OneToMany(() => File, (file) => file.room)
  files: File[]

  @CreateDateColumn()
  created_at: Date
}
