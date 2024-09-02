const express = require('express');
const app = express();


app.get('/',function(req,res){
    res.send('Hello World')
})

let youtuber = [{
    channelTitle : "침착맨",
    sub : "227만",
    videoCnt : "6600"
},
{
    channelTitle : "십오야",
    sub : "593만",
    videoCnt : "993"
},
{
    channelTitle : "테오",
    sub : "54.8만",
    videoCnt : "726"
}]

app.get('/:nickname',function(req,res){
    const {nickname} = req.params;
    res.json({
        channel : nickname
    })
})


app.listen(3000);