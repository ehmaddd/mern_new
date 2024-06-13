const express = require('express');
const cors = require('cors');
const { connectToMongo } = require('./db');

const app = express();
const port = 3000;
app.use(cors());

app.use(express.json());

app.get('/', async (req, res) => {
    try {
        const db = await connectToMongo();
        const collection = db.collection('myCollection');
        const data = await collection.find({}).toArray();
        res.json(data);
    } catch (err) {
        res.status(500).send('Failed to connect to MongoDB');
    }
});

app.post('/insert', async (req, res) => {
    try {
        const db = await connectToMongo();
        const collection = db.collection('myCollection');
        const result = await collection.insertOne(req.body);
        res.send(result);
    } catch (err) {
        res.status(500).send('Failed to insert document into MongoDB');
    }
});

// Read documents
app.get('/read', async (req, res) => {
//     try {
//         const db = await connectToMongo();
//         const collection = db.collection('myCollection');
//         const documents = await collection.find({}).toArray();
//         res.send(documents);
//     } catch (err) {
//         res.status(500).send('Failed to read documents from MongoDB');
//     }
});

app.put('/update', async (req, res) => {
    try {
        const db = await connectToMongo();
        const collection = db.collection('testCollection');
        const filter = { _id: req.body._id };
        const update = { $set: req.body };
        const result = await collection.updateOne(filter, update);
        res.send(result);
    } catch (err) {
        res.status(500).send('Failed to update document in MongoDB');
    }
});

// Delete a document
app.delete('/delete', async (req, res) => {
    try {
        const db = await connectToMongo();
        const collection = db.collection('testCollection');
        const filter = { _id: req.body._id };
        const result = await collection.deleteOne(filter);
        res.send(result);
    } catch (err) {
        res.status(500).send('Failed to delete document from MongoDB');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
