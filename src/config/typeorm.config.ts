import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/browser';
import { config } from './env.config';
import { User } from 'src/users/users.entity';
import { Blog } from 'src/blogs/blogs.entity';
import { Cat } from 'src/cats/cats.entity';

export const TYPEORM_OPTIONS: DataSourceOptions = {
  type: 'mysql',
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  username: config.MYSQL_USERNAME,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
  entities: [User, Blog, Cat],
  migrations: [config.MIGRATIONS_PATH],
  synchronize: config.NODE_ENV === 'development',
};

export const AppDataSource = new DataSource({
  ...TYPEORM_OPTIONS,
});
