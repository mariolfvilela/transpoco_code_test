import {
  BaseRepository,
  TrackerRepositoryInternalError,
} from '@src/repositories/base-repository';
import { Tracker } from '@src/models/tracker';
import { connect } from '@src/database';
import config, { IConfig } from 'config';

export class TrackerRepository extends BaseRepository<Tracker> {
  private dbConfig: IConfig = config.get('App.database');

  async getAll(orderBy: 'asc' | 'desc' = 'desc'): Promise<Tracker[]> {
    // Get users from database
    try {
      const conn = await connect();
      // https://stackoverflow.com/questions/54583950/using-typescript-how-do-i-strongly-type-mysql-query-results
      // const[rows]: [Tracker[], FieldPacket[]]
      const [rows] = await conn.query<Tracker[]>(
        `SELECT * FROM ${this.dbConfig.get('TABLE')} 
        WHERE speed IS NOT NULL OR speed != '' and tracker_uid IS NOT NULL OR tracker_uid != ''
        ORDER BY speed, tracker_uid ${orderBy ?? 'asc'} LIMIT 100;`,
        []
      );
      await conn.end();
      return rows;
    } catch (error) {
      throw new TrackerRepositoryInternalError(error.message);
    }
  }

  async getByTrackerUid(tracker_uid: number): Promise<Tracker[]> {
    // Get users from database
    try {
      const conn = await connect();
      const [rows] = await conn.query<Tracker[]>(
        `SELECT * FROM ${this.dbConfig.get(
          'TABLE'
        )} WHERE tracker_uid = ${tracker_uid} 
        AND speed IS NOT NULL OR speed != '' LIMIT 100`,
        []
        //AND insert_time BETWEEN ${initDate} AND ${endDate}  `,[]
      );
      await conn.end();
      return rows;
    } catch (error) {
      throw new TrackerRepositoryInternalError(error.message);
    }
  }
}
