const express = require('express');
const app = express();

app.listen(3000);
let youtuberDB = new Map([
    [1, {
        channelTitle: "침착맨",
        sub: "227만",
        videoCnt: "6600"
    }],
    [2, {
        channelTitle: "십오야",
        sub: "593만",
        videoCnt: "993"
    }],
    [3, {
        channelTitle: "테오",
        sub: "54.8만",
        videoCnt: "726"
    }]
]);

app.get('/youtubers/:id',function(req,res){
    const id = req.params.id;
    // const {id} = req.params // 이래도됨
    let youtuber = youtuberDB.get(parseInt(id));
    if(youtuber == undefined){
        youtuber = {message : "등록되지 않은 유튜버 입니다."};
    }
    res.json(youtuber);
})

app.get('/youtubers',function(req,res){
    res.json(youtuberDB);
})

app.use(express.json())
app.post('/youtubers',(req,res) => {
    const {channelTitle, sub, videoCnt} = req.body;
    let postJson = {
        channelTitle : channelTitle,
        sub : sub,
        videoCnt : videoCnt
    };
    youtuberDB.set(youtuberDB.size + 1, postJson)
    res.json({message : "유튜버가 등록되었습니다."})
})