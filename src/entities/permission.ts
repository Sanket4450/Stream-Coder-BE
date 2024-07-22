import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Role } from './role'
import { Feature } from './feature'

@Entity()
export class Permission {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @Column({ type: 'boolean' })
  modify: boolean

  @Column({ type: 'boolean' })
  delete: boolean

  @ManyToOne(() => Role, (role) => role.permissions)
  @JoinColumn({ name: 'role_id' })
  role: Role

  @ManyToOne(() => Feature, (feature) => feature.permissions)
  @JoinColumn({ name: 'feature_id' })
  feature: Feature
}
