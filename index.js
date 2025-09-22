const express = require('express');
const cors = require('cors');
const app=express();

const port =process.env.PORT || 5002;
// middleware
app.use(cors())
app.use(express.json());

// get
app.get('/',(req,res)=>{
    res.send('Api is working ..... ');
})

app.listen(port,()=>{
    console.log(`Server is runing on the port http://localhost:${port}`);
})
