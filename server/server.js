const express = require('express');
const {MongoClient} = require('mongodb');
const cors = require('cors');


const app = express();
const port = 3000;

app.use(cors());

const connectionString = 'mongodb://localhost:27017/ContactForms';

const client = new MongoClient(connectionString);

async function connectToMongoDB() {
    try{
        await client.connect();
        console.log('Connected to MongoDB Server')
    } catch (error) {
        console.error(error);
    }
}

connectToMongoDB();

app.post('/submitFormData', (req, res) => {
    console.log('Post successfully called');
})


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

