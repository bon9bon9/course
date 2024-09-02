const express = require("express");
const app = express();
app.listen(3000);

app.get('/',function(req,res){

})


app.use(express.json())
app.post('/test',(req,res) => {
    let body = req.body;
    console.log(body)
    res.send(body)
})