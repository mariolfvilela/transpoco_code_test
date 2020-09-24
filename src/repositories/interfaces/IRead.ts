export interface IRead<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T>;
}
