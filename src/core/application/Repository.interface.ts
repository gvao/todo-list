export default interface Repository<T> {
    save(item: T): void
    getAll(): T[]
    getById(id: string): T | undefined
    deleteById(id: string): void
}
