const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const mongoUri = 'mongodb+srv://ehmaddd:mongoahmad@cluster.mongodb.net/shopdb?retryWrites=true&w=majority';

// mongoose.connect(mongoUri);

// mongoose.connection.on('connected', () => {
//     console.log('Connected to MongoDB');
// });

// mongoose.connection.on('error', (err) => {
//     console.log('Error connecting to MongoDB:', err);
// });

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
