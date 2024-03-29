import {Schema, model} from 'mongoose'
import {generateSchema} from '../utils/db/mongodb'
import {IBaseSchema} from '../interfaces/schema'

interface IUser extends IBaseSchema {
  _id: Schema.Types.ObjectId
  username: string
  userWalletAddress: string
}

const userSchema = generateSchema<IUser>({
  username: {
    type: String,
    required: true,
  },
  userWalletAddress: {
    type: String,
    required: true,
  },
})

export default model('Course', userSchema)
