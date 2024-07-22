import { DataSource } from 'typeorm'
import { Feature, File, Permission, Role, Room, User } from '../entities'

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: true,
  entities: [Feature, File, Permission, Role, Room, User],
  subscribers: [],
  migrations: [],
})

export const initializeDB = async () => {
  try {
    await AppDataSource.initialize()
    console.log('Database connected successfully')
  } catch (err) {
    console.error('Failed to connect to the database:', err.message)
    process.exit(1)
  }
}
