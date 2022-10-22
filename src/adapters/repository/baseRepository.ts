export abstract class BaseRepository<T> {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create (item: T): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update (id: string, item: T): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  delete (id: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  find (): Promise<T[]> {
    throw new Error('Method not implemented.')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne (id: string): Promise<T> {
    throw new Error('Method not implemented.')
  }
}
