import { Tracker } from '@src/models/tracker';
import { InternalError } from '@src/util/errors/internal-error';
import { TrackerRepository } from '@src/repositories/tracker-repository';

export class TrackerService {
  private readonly _trackerRepository = new TrackerRepository();

  async getAll(orderBy: 'asc' | 'desc' = 'desc'): Promise<Tracker[]> {
    try {
      return await this._trackerRepository.getAll(orderBy);
    } catch (error) {
      throw new TrackerServiceInternalError(error.message);
    }
  }

  async getByTrackerUid(tracker_uid: number): Promise<Tracker[]> {
    try {
      return await this._trackerRepository.getByTrackerUid(tracker_uid);
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
