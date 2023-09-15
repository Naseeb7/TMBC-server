const express =require('express')
const cors =require('cors')
const bodyParser = require('body-parser')

const app=express()

app.use(cors())
app.use(bodyParser.json())

app.listen(3001,()=>{
    console.log("Server Started")
})

app.use("/",(req,res)=>{
    console.log(req.body)
    const user = req.body
    res.send(user)
})

app.put("/user",(req,res)=>{
    console.log(req.body)
    const user = req.body
    res.json(user)
})