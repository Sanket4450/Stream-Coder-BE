import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Room } from './room'

@Entity()
export class File {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @Column({ type: 'varchar', enum: ['file', 'folder'] })
  type: string

  @Column({ type: 'varchar' })
  name: string

  @Column({ type: 'text', nullable: true, select: false })
  content: string

  @ManyToOne(() => File, (file) => file.children, { nullable: true })
  @JoinColumn({ name: 'parent_folder_id' })
  parent: File

  @OneToMany(() => File, (file) => file.parent)
  children: File[]

  @ManyToOne(() => Room, (room) => room.files)
  @JoinColumn({ name: 'room_id' })
  room: Room

  @CreateDateColumn()
  created_at: Date

  @CreateDateColumn()
  updated_at: Date
}
