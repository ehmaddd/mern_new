const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';
const dbName = 'local';

let db;

// Connect to MongoDB
MongoClient.connect(uri)
  .then(client => {
    console.log('Connected to Database');
    db = client.db(dbName);

    // Start Express server
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(error => console.error(error));

// Define a route to verify the connection
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define a route to fetch data from the database
app.get('/data', (req, res) => {
  const collection = db.collection('myCollection');
  collection.find().toArray()
    .then(results => {
      res.json(results);
    })
    .catch(error => console.error(error));
});
