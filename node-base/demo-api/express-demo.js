const express = require('express');
const app = express();


app.get('/',function(req,res){
    res.send('Hello World')
})

app.get('/test',function(req,res){
    res.send('TEST SUCCESS')
})

app.get('/test/1',function(req,res){
    res.send("ONE!")
})

app.get('/hello',function(req,res){
    res.json({msg:'안녕하세요'})
})

app.get('/bye',function(req,res){
    res.json({msg:'안녕히가세요'})
})

app.get('/nicetomeetyou',function(req,res){
    res.json({msg:'만나서반가워유'})
})
let book = {
    title : "Node.js 를 공부해봅쇼",
    price : 20000,
    decription : "냥냥"
}

app.get('/products/1',function(req,res){
    res.json(book)
})


app.listen(3000);