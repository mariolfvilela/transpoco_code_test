import { Tracker } from '@src/models/tracker';
import { InternalError } from '@src/util/errors/internal-error';
import { TrackerRepository } from '@src/repositories/tracker-repository';

export class TrackerService {
  private readonly _trackerRepository = new TrackerRepository();

  async getAll(
    orderBy: 'ASC' | 'DESC' = 'ASC',
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

export class TrackerServiceInternalError extends InternalError {
  constructor(message: string) {
    super(`Unexpected error during the tracking processing: ${message}`);
  }
}
