import {
  BaseRepository,
  TrackerRepositoryInternalError,
} from '@src/repositories/base-repository';
import { Tracker } from '@src/models/tracker';
import { connect } from '@src/database';
import config, { IConfig } from 'config';
import logger from '@src/logger';
import moment from 'moment';

export class TrackerRepository extends BaseRepository<Tracker> {
  private dbConfig: IConfig = config.get('App.database');

  async getAll(
    orderBy: 'ASC' | 'DESC' = 'ASC',
    orderField?: string,
    start_date?: Date,
    end_date?: Date
  ): Promise<Tracker[]> {
    // Get users from database
    try {
      const conn = await connect();
      const query = `SELECT DISTINCT tracker_uid, speed
      FROM ${this.dbConfig.get('TABLE')}
      WHERE (speed IS NOT NULL OR speed != '') and (tracker_uid IS NOT NULL OR tracker_uid != '')
      ${
        this.validateDate(start_date, end_date)
          ? 'AND (insert_time BETWEEN FROM_UNIXTIME(' +
            moment(start_date).unix() +
            ') AND FROM_UNIXTIME(' +
            moment(end_date).unix() +
            '))'
          : ' '
      }
      GROUP BY  tracker_uid, speed
      ORDER BY ${orderField ?? 'speed, tracker_uid'} ${orderBy ?? 'ASC'};`;

      // https://stackoverflow.com/questions/54583950/using-typescript-how-do-i-strongly-type-mysql-query-results
      // const[rows]: [Tracker[], FieldPacket[]]
      const [rows] = await conn.query<Tracker[]>(query, []);
      await conn.end();
      logger.info(`rows: ${rows.length}`);
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
      const query = `SELECT DISTINCT * , DATE_FORMAT(insert_time,'%d/%m/%Y') AS insert_time FROM ${this.dbConfig.get(
        'TABLE'
      )} WHERE (tracker_uid = ${tracker_uid} ) 
      ${
        this.validateDate(start_date, end_date)
          ? 'AND (insert_time BETWEEN FROM_UNIXTIME(' +
            moment(start_date).unix() +
            ') AND FROM_UNIXTIME(' +
            moment(end_date).unix() +
            '))'
          : ' '
      } ;`;
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

  /**
   * Compares two Date objects
   * @param date1 First date object to compare.
   * @param date2 Second date object to compare.
   */
  private validateDate(start?: Date, end?: Date): boolean {
    if (!start || !end) {
      // throw new TrackerRepositoryInternalError('Non-standard dates');
      return false;
    }

    // With Date object we can compare dates them using the >, <, <= or >=.
    // The ==, !=, ===, and !== operators require to use date.getTime(),
    // so we need to create a new instance of Date with 'new Date()'
    const d1 = new Date(start);
    const d2 = new Date(end);

    // Check if the dates are equal
    if (d1.getTime() === d2.getTime()) {
      //throw new TrackerRepositoryInternalError('Same dates');
      return false;
    }

    // Check if the first is less than second
    if (d1 < d2) {
      //throw new TrackerRepositoryInternalError('End date greater than the start date');
      return false;
    }

    return true;
  }
}
