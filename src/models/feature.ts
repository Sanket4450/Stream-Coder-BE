import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Permission } from './permission'

@Entity()
export class Feature {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @Column({ type: 'varchar' })
  name: string

  @OneToMany(() => Permission, (permission) => permission.feature)
  permissions: Permission[]

  @CreateDateColumn()
  created_at: Date

  @CreateDateColumn()
  updated_at: Date
}
