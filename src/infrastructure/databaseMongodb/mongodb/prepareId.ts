import { ObjectId } from 'mongodb'

export const prepareId = (id: string) => {
  return new ObjectId(id)
}
