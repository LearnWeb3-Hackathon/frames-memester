// mongodb.js

import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || ''
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
} || {}

if (!process.env.MONGODB_URI) {
    throw new Error('Add Mongo URI to .env.local')
}
let clientPromise
if (uri && uri.length) {
    let client = new MongoClient(uri)
    clientPromise = client.connect()

} else {
    console.log("PLEASE_PASS_DB_URL")
}


export default clientPromise