const express = require('express');
const app = express();


app.get('/',function(req,res){
    res.send('Hello World')
})

let book = {
    title : "Node.js 를 공부해봅쇼",
    price : 20000,
    decription : "냥냥"
}

app.get('/products/:n',function(req,res){
    // : => 나한테 URL로 매개변수를 전달해줄려나보다!
    // req.params에 다 담을게!
    // req.params.n 으로 함봐봐 거기에 넣어놨어~

    res.json({
        num : parseInt(req.params.n)
    })
})
// https://www.youtube.com/watch?v=sQSHwBDsDVA&t=251s
app.get('/watch',function(req,res){
    // param에는 url에 있는애가 나오고 query에는 쿼리스트링에 있는애가 나온다
    const watch = req.params;
    const q = req.query;
    // json 객체의 비구조화
    const {v, t} = req.query; // 이렇게 해서 v랑 t라는 변수에 받아도됨, querystring에서 전달해주는 변수이름이랑 통일해야함
    res.json({
        video : q.v,
        timeline : q.t
    })
})


app.listen(3000);