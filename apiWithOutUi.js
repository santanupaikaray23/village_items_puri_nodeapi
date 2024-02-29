const express = require('express')
const app = express();
const port = process.env.PORT || 9700;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors')
app.use(cors())
 const mongourl = "mongodb+srv://portfolio:portfolio1996@cluster0.yf62c.mongodb.net/?retryWrites=true&w=majority";
let db;
let col_name = "col1"

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/health',(req,res)=>{
    res.status(200).send('Health Check')
})

app.get('users',(req,res)=>{
    db.collection(col_name).find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})


MongoClient.connect(mongourl, (err,client)=>{
    if(err) console.log('Error while connecting');
    db=client.db('village_node_app');
    app.listen(port,(err)=>{
        console.log(`Server is running on port ${port}`)
    })
})