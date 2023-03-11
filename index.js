const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors({
    origin:"*",
}))

mongoose.connect(
    "mongodb+srv://panda:panda@cluster0.z2yoygw.mongodb.net/?retryWrites=true&w=majority",
    console.log("DB connection succefull")
)
const schema = new mongoose.Schema({
    name : String,
    pswd : String
})

const template = mongoose.model('user',schema)

app.get('/',(req,res)=>{
    res.send("Hello world")
})
app.post('/post',(req,res)=>{
    const data = new template({
        name: req.body.name,
        pswd : req.body.pswd
    })
    data.save()
    .then((result)=>res.send(result))
    .catch((err)=>console.log(err))
})
app.get('/get',(req,res)=>{
    template.find()
    .then((result)=>res.send(result))
    .catch((err)=>console.log(result))
})
const port = 7000 || process.env.Port
app.listen(port,console.log(`server running on ${port}`));