import { Get } from '@overnightjs/core';
import { Tracker } from '@src/models/tracker';
import { InternalError } from '@src/util/errors/internal-error';
import { TrackerRepository } from '../repositories/tracker-repository';

export class TrackerService {
  private readonly _trackerRepository = new TrackerRepository();
  public async getAll(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    orderBy: 'asc' | 'desc' = 'desc'
  ): Promise<Tracker[]> {
    try {
      await this._trackerRepository.get();
      return [];
    } catch (error) {
      throw new TrackerProcessingInternalError(error.message);
    }
  }
}

export class TrackerProcessingInternalError extends InternalError {
  constructor(message: string) {
    super(`Unexpected error during the tracking processing: ${message}`);
  }
}
