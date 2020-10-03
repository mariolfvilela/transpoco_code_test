import { InternalError } from '@src/util/errors/internal-error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export abstract class BaseService<T> {}

export class TrackerServiceInternalError extends InternalError {
  constructor(message: string) {
    super(
      `Unexpected error during the service tracking processing: ${message}`
    );
  }
}
