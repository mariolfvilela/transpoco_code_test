export interface ITrackerRepository<T> {
  getByTrackerUid(
    tracker_uid: number,
    start_date?: Date,
    end_date?: Date
  ): Promise<T[]>;

  getAll(
    orderBy?: string,
    orderField?: string,
    start_date?: Date,
    end_date?: Date
  ): Promise<T[]>;
}
