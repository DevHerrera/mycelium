import { DataSource, DataSourceOptions } from 'typeorm';
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'password',
  database: 'mycelium',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  migrationsRun: true,
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
