const { MongoClient, ObjectId } = require('mongodb');

const url = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017';
const dbName = 'hackbid';

const client = new MongoClient(url);
let db;

const connectDB = async () => {
    try {
        await client.connect();
        db = client.db(dbName);
    } catch (err) {
        await client.close();
        throw err;
    }
};

const getDb = () => {
    return db;
};

module.exports = {
    connectDB,
    getDb,
};
