/**
 * Created by web-01 on 2017/11/12.
 */
const express=require('express');
const bodyParser=require('body-parser');

let app=express();
app.use(bodyParser.urlencoded({
    extended:true
}));

app.get('/',(req,res)=>{
   // res.send("hello,expressss");
    res.sendfile("./public/index.html","",(err,res)=>{
        console.log('....',res);
    });

});

app.post('/signIn',(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    res.send(username+":"+password);
});
app.listen(80);