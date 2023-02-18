const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

const cors = require('cors');
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mbkcs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('Database connected successfully');

        const database = client.db('holidayNourish');
        const productCollection = database.collection('services');



        //POST API(DATA ADD)
        app.post('/services', async (req, res) => {
            const service = req.body;
            const result = await productCollection.insertOne(service);
            res.json(result);
        });


        //get all data
        app.get('/services', async (req, res) => {
            const cursor = productCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })
    }

    finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Holiday Nourish server is running');

});

app.listen(port, () => {
    console.log('server running at port', port);
});