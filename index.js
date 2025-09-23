const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app=express();

const port =process.env.PORT || 5002;
// middleware
app.use(cors())
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.xzyjuex.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the clien t to the server	(optional starting in v4.7)
    await client.connect();
    const JobCollection = client.db('careerCode').collection('jobs');
    const applicationCollection =client.db('careerCode').collection('appilcations')
    app.get('/jobs',async(req,res)=>{
        const cursor=JobCollection.find();
        const result=await cursor.toArray();
        res.send(result);
    })
    app.get('/jobs/:id',async(req,res)=>{
        const id =req.params.id;
        const quary ={_id: new ObjectId(id)};
        const result= await JobCollection.findOne(quary);
        res.send(result);
    })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



// get
app.get('/',(req,res)=>{
    res.send('Api is working ..... ');
})

app.listen(port,()=>{
    console.log(`Server is runing on the port http://localhost:${port}`);
})
