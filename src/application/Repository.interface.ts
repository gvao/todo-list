export interface SaveRepository<T> {
    save(item: T): Promise<void>
}

export interface GetAllRepository<T> {
    getAll(): Promise<T[]>
}

export interface GetByIdRepository<T> {
    getById(id: string): Promise<T | undefined>
}

export interface DeleteByIdRepository<T> {
    deleteById(id: string): Promise<void>
}

type Repository<T> = SaveRepository<T> & GetAllRepository<T> & GetByIdRepository<T> & DeleteByIdRepository<T>

export default Repository