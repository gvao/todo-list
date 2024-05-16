export interface SaveRepository<T> {
    save(item: T): void
}

export interface GetAllRepository<T> {
    getAll(): T[]
}

export interface GetByIdRepository<T> {
    getById(id: string): T | undefined
}

export interface DeleteByIdRepository<T> {
    deleteById(id: string): void
}

type Repository<T> = SaveRepository<T> & GetAllRepository<T> & GetByIdRepository<T> & DeleteByIdRepository<T>

export default Repository