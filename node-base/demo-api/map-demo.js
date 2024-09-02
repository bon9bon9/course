const express = require("express");
const app = express();
app.listen(3000);

let db = new Map(); // 키 밸류 꼴로 저장하는 자료구조
db.set(1, "NoteBook");
console.log(db.get(1));
let youtuber = new Map([
    ["chim", {
        channelTitle: "침착맨",
        sub: "227만",
        videoCnt: "6600"
    }],
    ["15", {
        channelTitle: "십오야",
        sub: "593만",
        videoCnt: "993"
    }],
    ["teo", {
        channelTitle: "테오",
        sub: "54.8만",
        videoCnt: "726"
    }]
]);
app.get('/:youtuberName',function(req,res){
    const {youtuberName} = req.params;
    res.json(youtuber.get(youtuberName));
})
db.set(2, "Cup");
db.set(3, "Chair");
db.set(1, "hmm");

console.log(db.get(1));
