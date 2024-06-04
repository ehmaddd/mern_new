const { MongoClient } = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'local';

let dbInstance = null;

async function connectToMongo() {
    if (dbInstance) return dbInstance;
    try {
        console.log('Attempting to connect to MongoDB...');
        const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB!");
        dbInstance = client.db(dbName);
        return dbInstance;
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        throw err;
    }
}

module.exports = { connectToMongo };
