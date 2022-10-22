export interface Database {
    collection: <T>(name: string) => T
}
