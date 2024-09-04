const express = require('express');
const app = express();
app.listen(3000);

const fruits = [
    { id : 1, name : 'apple'},
    { id : 2, name : 'orange'},
    { id : 3, name : 'strawberry'},
    { id : 4, name : 'blueberry'}
]

app.get('/fruits', (req,res) => {
    res.json(fruits);
})

app.get('/fruits/:id', (req,res) => {
    let returnMsg = {message : "성공", data : undefined};
    let id = req.params.id;
    let fruit = fruits.find(f => f.id == id); // 아래처럼 forEach문 안돌려도됨 // == 라서 parseInt안했지만 같다고 비교해줌! === 했으면 안됨ㅋ
    // fruits.forEach((value) => {
    //     if(value.id == id){
    //         fruit = value;
    //     }
    // })
    returnMsg.data = fruit;
    if(!fruit){ // 예외를 터트린다 = http status code 를 실패로 보내기!
        res.status(404);
        returnMsg.message = "객체 없음"
    }
    res.json(returnMsg);
})