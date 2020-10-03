import { InternalError } from '@src/util/errors/internal-error';
import config, { IConfig } from 'config';
import CacheUtil from '@src/util/cache';
import logger from '@src/logger';

// that class only can be extended
export abstract class BaseRepository<T> {
  protected dbConfig: IConfig = config.get('App.database');
  private cacheTtl?: number = config.get('App.cacheTtl');

  constructor(protected cacheUtil = CacheUtil) {}

  protected getValuesFromCache(key: string): T[] | undefined {
    const valuesFromCache = this.cacheUtil.get<T[]>(key);

    if (!valuesFromCache) {
      return;
    }

    logger.info(`Using cache to return objects for key: ${key}`);
    return valuesFromCache;
  }
  protected setValuesInCache(key: string, values: T[]): boolean {
    logger.info(`Updating cache to return object for key: ${key}`);
    return this.cacheUtil.set(key, values, this.cacheTtl);
  }
}

export class TrackerRepositoryInternalError extends InternalError {
  constructor(message: string) {
    super(`Unexpected error repository processing: ${message}`);
  }
}
