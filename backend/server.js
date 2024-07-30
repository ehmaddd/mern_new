const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { connectToMongo } = require('./db');

const app = express();
const port = 3000;
app.use(cors());

app.use(express.json());
app.use(bodyParser.json());

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

// Insert documents
app.post('/insert', async (req, res) => {
    try {
        const db = await connectToMongo();
        const collection = db.collection('myCollection');
        const result = await collection.insertOne(req.body);
        res.send(result);
        console.log(req.body);
    } catch (err) {
        res.status(500).send('Failed to insert document into MongoDB');
    }
});

// Read documents
app.get('/read', async (req, res) => {
    try {
        const db = await connectToMongo();
        const collection = db.collection('myCollection');
        const documents = await collection.find({}).toArray();
        res.send(documents);
    } catch (err) {
        res.status(500);
    }
});

// Fetch all ids
app.get('/fetchid', async (req, res) => {
    try {
        const db = await connectToMongo();
        const collection = db.collection('myCollection');
        const documents = await collection.find({}, { projection: { id: 1 } }).toArray();
        const ids = documents.map(doc => doc.id);
        res.send(ids);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to read documents from MongoDB');
    }
});

app.post('/dataget', async (req, res) => {
    try {
        const { id } = req.body;
        const db = await connectToMongo();
        const collection = db.collection('myCollection');
        const document = await collection.findOne({ id: id });
        if (document) {
            // res.status(200).json(document);
            console.log(document);
        } else {
            res.status(404).send('Document not found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to search documents in MongoDB');
    }
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
