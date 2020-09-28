import { Tracker } from '@src/models/tracker';
import { TrackerRepository } from '@src/repositories/tracker-repository';
import { BaseService, TrackerServiceInternalError } from './base-service';

export class TrackerService extends BaseService<Tracker> {
  private readonly _trackerRepository = new TrackerRepository();

  async getAll(
    orderBy: 'ASC' | 'DESC' = 'DESC',
    orderField?: string,
    start_date?: Date,
    end_date?: Date
  ): Promise<Tracker[]> {
    try {
      return await this._trackerRepository.getAll(
        orderBy,
        orderField,
        start_date,
        end_date
      );
    } catch (error) {
      throw new TrackerServiceInternalError(error.message);
    }
  }

  async getByTrackerUid(
    tracker_uid: number,
    start_date?: Date,
    end_date?: Date
  ): Promise<Tracker[]> {
    try {
      return await this._trackerRepository.getByTrackerUid(
        tracker_uid,
        start_date,
        end_date
      );
    } catch (error) {
      throw new TrackerServiceInternalError(error.message);
    }
  }
}
