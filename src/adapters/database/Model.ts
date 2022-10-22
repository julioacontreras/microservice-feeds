export interface Model {
    insertOne: <T>(data: T) => Promise<void>
    deleteOne: (settings: unknown) => Promise<void>
    find: <T>(settings: unknown, options?: unknown) => Promise<[T]>
}
