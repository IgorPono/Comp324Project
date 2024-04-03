const express = require('express');
const {MongoClient} = require('mongodb');
const cors = require('cors');


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

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

app.post('/submitFormData', async (req, res) => {
    try{
        console.log('Post successfully called');
        const db = client.db('WebsiteDatabase');
        const collection = db.collection('forms');

        //console.log(db)
        //console.log(collection)

        const formData = req.body;

        console.log(formData)

        const result = await collection.insertOne(formData);
        console.log('inserted json into collection');

        res.status(200).json({message: 'Data submitted successfully'});
    } catch (error){
        console.error('Error sending data');
        res.status(500).json({error: 'Internal server error'});
    }
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

