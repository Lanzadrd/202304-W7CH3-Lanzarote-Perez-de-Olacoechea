/* eslint-disable no-unused-vars */
export interface Repo<T extends { id: string | number }> {
  getAll: () => Promise<T[]>;
  getById: (id: T['id']) => Promise<T>;
  search: (query: { key: string; value: unknown }) => Promise<T[]>;
  post: (data: T) => Promise<T>;
  patch: (id: T['id'], data: Partial<T>) => Promise<T>;
  delete: (id: T['id']) => Promise<void>;
}
