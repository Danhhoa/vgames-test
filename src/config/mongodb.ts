import mongoose from 'mongoose'

export const initDB = () => {
  // set up mongoose
  const dbUri = process.env.DB_URI
  const dbName = process.env.DB_NAME
  mongoose
    .connect(dbUri, {dbName})
    .then(() => console.log('DB status: success at: ', dbUri))
    .catch(() => console.log('DB status: failed'))
}
