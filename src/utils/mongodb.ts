import {Schema, SchemaDefinition, SchemaOptions} from 'mongoose'

export function generateSchema<SchemaT>(
  schemaDefinition: SchemaDefinition<SchemaT>,
  options?: SchemaOptions,
) {
  const schema = new Schema(
    {...schemaDefinition, deletedAt: {type: Date, default: null}},
    {timestamps: true, ...options},
  )

  return schema
}
