import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/browser';
import { config } from './env.config';
import { User } from 'src/users/users.entity';
import path from 'path';

console.log(
  'path is: ',
  path.join(process.cwd(), 'dist', 'migrations', '*{.js,.ts}'),
);

export const TYPEORM_OPTIONS: DataSourceOptions = {
  type: 'mysql',
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  username: config.MYSQL_USERNAME,
  password: config.MYSQL_PASSWORD,
  database: config.MYSQL_DATABASE,
  entities: [User],
  migrations: [config.MIGRATIONS_PATH],
  synchronize: config.NODE_ENV === 'development',
};

export const AppDataSource = new DataSource({
  ...TYPEORM_OPTIONS,
});
