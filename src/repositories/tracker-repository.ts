import { Util } from '@src/util/util';
import {
  BaseRepository,
  TrackerRepositoryInternalError,
} from '@src/repositories/base-repository';
import { Tracker } from '@src/models/tracker';
import { connect } from '@src/database';
import config, { IConfig } from 'config';
import moment from 'moment';

export class TrackerRepository extends BaseRepository<Tracker> {
  private dbConfig: IConfig = config.get('App.database');

  async getAll(
    orderBy: 'ASC' | 'DESC' = 'DESC',
    orderField?: string,
    start_date?: Date,
    end_date?: Date
  ): Promise<Tracker[]> {
    // Get users from database
    try {
      const validatedDates = Util.validateDate(start_date, end_date);
      const conn = await connect();
      const query = `SELECT DISTINCT tracker_uid, speed
      ${
        validatedDates
          ? ", DATE_FORMAT(insert_time,'%d/%m/%Y') AS insert_time"
          : ''
      }
      FROM ${this.dbConfig.get('TABLE')}
      WHERE (speed IS NOT NULL OR speed != '') and (tracker_uid IS NOT NULL OR tracker_uid != '')
      ${
        validatedDates
          ? 'AND (insert_time BETWEEN FROM_UNIXTIME(' +
            moment(end_date).unix() +
            ') AND FROM_UNIXTIME(' +
            moment(start_date).unix() +
            '))'
          : ' '
      }
      GROUP BY  tracker_uid, speed
      ORDER BY ${orderField ?? 'speed, tracker_uid'} ${orderBy ?? 'ASC'};`;

      // https://stackoverflow.com/questions/54583950/using-typescript-how-do-i-strongly-type-mysql-query-results
      // const[rows]: [Tracker[], FieldPacket[]]
      const [rows] = await conn.query<Tracker[]>(query, []);
      await conn.end();
      return rows;
    } catch (error) {
      throw new TrackerRepositoryInternalError(error.message);
    }
  }

  async getByTrackerUid(
    tracker_uid: number,
    start_date?: Date,
    end_date?: Date
  ): Promise<Tracker[]> {
    // Get Tracker from database
    try {
      const query = `SELECT
      /*+ MAX_EXECUTION_TIME = 30000 */
       DISTINCT * 
      , DATE_FORMAT(insert_time,'%d/%m/%Y') AS insert_time FROM 
      ${this.dbConfig.get('TABLE')} WHERE (tracker_uid = ${tracker_uid} ) 
      ${
        Util.validateDate(start_date, end_date)
          ? 'AND (insert_time BETWEEN FROM_UNIXTIME(' +
            moment(end_date).unix() +
            ') AND FROM_UNIXTIME(' +
            moment(start_date).unix() +
            '))'
          : ' '
      };`;
      const conn = await connect();
      const [rows] = await conn.query<Tracker[]>(
        query,
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
