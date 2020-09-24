import config, { IConfig } from 'config';
import { createPool, Pool } from 'mysql';

const dbConfig: IConfig = config.get('App.database');

export const connect = async (): Promise<Pool> =>
  await createPool({
    host: dbConfig.get('HOST'),
    user: dbConfig.get('USER'),
    password: dbConfig.get('PASSWORD'),
    database: dbConfig.get('DB'),
    connectionLimit: 10,
  });

// close the connection
// export const close = async (): Promise<void> =>
//  await mysql.end((error) => {
//    if (error) throw error;
//    logger.info('Successfully close to the database.');
//  });
