export interface IReadService<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T>;
}
