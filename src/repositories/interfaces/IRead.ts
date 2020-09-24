export interface IRead<T> {
  get(): Promise<T[]>;
  getById(id: number): Promise<T>;
}
