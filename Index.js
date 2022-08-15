const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")
require('dotenv').config()

app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dj06fwm.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

 async function run () {
    try{
        await client.connect()
        const collection = client.db("table").collection("data");
        app.post("/tableData" , async(req , res) =>{
            const data = req.body
            console.log(data)
            const result = await collection.insertOne(data)
            res.send(result)
        })
        app.get("/tableDataShow" , async(req , res) =>{
            const result = await collection.find().toArray()
            res.send(result)
        })
    }finally{

    } 
 }
 run().catch(console.dir);
app.get('/', (req, res) => {
  res.send('Red prositive company Limited')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})