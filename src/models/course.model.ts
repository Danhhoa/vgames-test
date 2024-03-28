import {Schema, model} from 'mongoose'
import {generateSchema} from '../utils/mongodb'

interface IBaseSchema {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}

interface ICourse extends IBaseSchema {
  _id: Schema.Types.ObjectId
  title: string
  description: string
}

const courseSchema = generateSchema<ICourse>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

export default model('Course', courseSchema)
