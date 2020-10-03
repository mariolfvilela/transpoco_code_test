import { Tracker } from '@src/models/tracker';
import { BaseService, TrackerServiceInternalError } from './base-service';
import { ITrackerService } from '@src/services/interfaces/i-tracker-service';
import { ITrackerRepository } from '@src/repositories/interfaces/i-tracker-repository';

export class TrackerService
  extends BaseService<Tracker>
  implements ITrackerService<Tracker> {
  constructor(
    private readonly _trackerRepository: ITrackerRepository<Tracker>
  ) {
    super();
  }
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
