import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/enviroment'

let trelloDatabaseInstance = null

//Khởi tạo đối tượng mongoClientInstance connect đến tới MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

export const CONNECT_DB = async () => {
    await mongoClientInstance.connect()

    trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const CLOSE_DB = async () => {
    await mongoClientInstance.close()
}

export const GET_DB = () => {
    if (!trelloDatabaseInstance) throw new Error('Must connect database first')

    return trelloDatabaseInstance   
}
