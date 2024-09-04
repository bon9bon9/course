const express = require('express');
const app = express();

app.listen(3000);
app.use(express.json())

var id = 1;
let youtuberDB = new Map([
    [id++, {
        channelTitle: "침착맨",
        sub: "227만",
        videoCnt: "6600"
    }],
    [id++, {
        channelTitle: "십오야",
        sub: "593만",
        videoCnt: "993"
    }],
    [id++, {
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
        res.status(404);
        youtuber = {message : "등록되지 않은 유튜버 입니다."};
    }
    res.json(youtuber);
})

app.get('/youtubers',function(req,res){
    if(youtuberDB.size == 0){
        return res.status(404).json({message : "객체가 없습니다"});
    }
    let data = {};
    youtuberDB.forEach(function(value, key){
        data[key] = value;
    })
    res.json({message : "성공", data : data});
})

app.post('/youtubers',(req,res) => {
    const {channelTitle, sub, videoCnt} = req.body;
    if( channelTitle == undefined || sub === undefined || videoCnt === undefined){
        return res.status(400).json({message : "필수값 없음"});
    }
    let postJson = {
        channelTitle : channelTitle ,
        sub : sub,
        videoCnt : videoCnt
    };
    youtuberDB.set(id++, postJson)
    res.json({message : "유튜버가 등록되었습니다."})
})

app.delete('/youtubers/:id',(req,res) => {
    let json = {message : `등록되지 않은 유튜버 입니다.`};
    let {id} = req.params;
    id = parseInt(id);
    let youtuber = youtuberDB.get(id);
    if(youtuber != undefined){
        let channelTitle = youtuber.channelTitle;
        youtuberDB.delete(id);
        json = {message : `${channelTitle}님, 유튜버에서 삭제되었습니다.`}
    }
    res.json(json);
})

app.delete('/youtubers',(req,res) => {
    let json = {message : `등록된 유튜버가 없습니다.`}
    if(youtuberDB.size != 0){
        youtuberDB.clear();
        json = {message : `모든 유튜버가 삭제되었습니다.`}
    }
    res.json(json);
})

app.put('/youtubers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let youtuber = youtuberDB.get(id);
    let json = { message: "등록되지 않은 유튜버 입니다." };

    if (youtuber) {
        const { channelTitle, sub, videoCnt } = req.body;
        if (channelTitle !== undefined) {
            youtuber.channelTitle = channelTitle;
        }
        if (sub !== undefined) {
            youtuber.sub = sub;
        }
        if (videoCnt !== undefined) {
            youtuber.videoCnt = videoCnt;
        }
        json.message = "유튜버 정보가 성공적으로 업데이트되었습니다.";
    }
    res.json(json);
});