const express = require('express')
const fileUpload = require('express-fileupload')
const fs = require("fs")
require("dotenv").config()
const app = express()
const port = 8080
const path = require('path');
const { stringify } = require('querystring')
const internal = require('stream')


app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(fileUpload())
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

app.get('/', (req, res) => {
    console.log("Hello World")
    let blogsFile = fs.readFileSync("json/blogs.json",(err)=>{if(err){console.log(err)}});
    let blogs = JSON.parse(blogsFile)
    res.render("index",{blogs})
})

app.get("/postBlog", (req,res)=>{


    
    res.render("postBlog")
  

    
})

app.post("/postBlog",(req,res)=>{
    let blogsFile = fs.readFileSync("json/blogs.json",(err)=>{if(err){console.log(err)}});
    let blogs = JSON.parse(blogsFile)
    const idCreator = () =>{
        for(let i=0;i<blogs.length+1;i++){
            if(blogs.length == 0){
                return 0
            }
            if(i==blogs.length-1){
                let idNumber = i + 1
                
                return idNumber
                break
            }
        }
    }

    const id = idCreator()
    
    req.files.thumbnail.mv(__dirname+"/public/img/thumbnails/"+req.files.thumbnail.name)
    fs.rename(__dirname+"/public/img/thumbnails/"+req.files.thumbnail.name, __dirname+"/public/img/thumbnails/"+ id +".png",(err)=>{console.log(err)})
    fs.writeFile("public/readmarks/"+id+".md",req.body.content,err=>{
        if(err){
            console.log(err)
        }else{
            console.log("Content file created ")
        }
    })
    const date = new Date()
    const currentDate = date.getDate().toString() + "." + date.getMonth().toString() + "." + date.getFullYear().toString()
    let blog = {
        "id": id,
        "thumbnail": "/img/thumbnails/"+id+".png",
        "title": req.body.title,
        "author": "Tunahan KAYA",
        "publishDate": currentDate,
        "shortDesc": req.body.shortDesc,
        "content": "/readmarks/"+id+".md"

    }
    
    blogs.push(blog)
    data = JSON.stringify(blogs, null, 3)
    fs.writeFile("json/blogs.json", data, (err)=>{if(err){console.log(err)}})
    res.redirect("/postBlog")
})

app.get("/blog/:id",(req,res)=>{
    let blogsFile = fs.readFileSync("json/blogs.json",(err)=>{if(err){console.log(err)}});
    let blogs = JSON.parse(blogsFile)
    currentBlog = blogs[req.params.id]
    res.render("blogPage",{currentBlog})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})