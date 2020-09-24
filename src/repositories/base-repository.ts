// import all interfaces
import { IWrite } from '@src/repositories/interfaces/IWrite';
import { IRead } from '@src/repositories/interfaces/IRead';
import { connect } from '@src/database';
import { InternalError } from '../util/errors/internal-error';
import logger from '@src/logger';

// that class only can be extended
export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
  async create(item: T): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async update(id: string, item: T): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async get(): Promise<T[]> {
    // Get users from database
    try {
      const conn = await connect();
      const rows = await conn.query('SELECT * FROM tracking_202007_new');
      logger.info(`Testando: ${rows} \n ${rows.RowDataPacket instanceof Array}`);
      await conn.end();
      return [];
    } catch (error) {
      throw new TrackerRepositoryInternalError(error.message);
    }
  }
  async getById(id: number): Promise<T> {
    throw new Error('Method not implemented.');
  }
}

export class TrackerRepositoryInternalError extends InternalError {
  constructor(message: string) {
    super(`Unexpected error repository processing: ${message}`);
  }
}
