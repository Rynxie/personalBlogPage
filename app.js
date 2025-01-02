const express = require('express')
const fileUpload = require('express-fileupload')
const fs = require("fs")
require("dotenv").config()
const app = express()
const port = 8080
const path = require('path');
const { stringify } = require('querystring')
const internal = require('stream')
const mongoose = require("mongoose");
const cors = require("cors")

const blog = require("./models/blog")


app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(fileUpload())
app.use(cors())
app.set("view engine","pug")
app.set("views",path.join(__dirname,"views"))

var dbURL = process.env.MONGODB_CONNECTION_URL
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => console.log("Connected to DB"))
  .catch((error)=>console.log("There is an error occured while conecting to DB: " + error))

app.get('/', (req, res) => {
    console.log("Hello World")
    
    blog.find({draft: false})
        .then(blogs =>{
            res.render("index",{blogs})
        })
    
    
})


app.get("/blog/:id",(req,res)=>{

    blog.findOne({_id: req.params.id, draft: false})
        .then(blog => {
            res.render("blogPage",{currentBlog : blog})
        })
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})