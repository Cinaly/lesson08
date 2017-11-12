/**
 * Created by web-01 on 2017/11/12.
 */
const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql');

let app=express();
let pool=mysql.createPool({
    connectionLimit:10,
    username:"root",
    password:"",
    database:"db_demo"
});
/*取得表单参数*/
app.use(bodyParser.urlencoded({
    extended:true
}));

app.get('/',(req,res)=>{
   // res.send("hello,expressss");
    res.sendfile("./public/index.html","",(err,res)=>{
        console.log('....',res);
    });

});
app.get('/sign-up', (req, res) => { // get post put delete
    res.sendfile('./public/sign_up.html');
});

app.post('/signIn',(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    res.send(username+":"+password);
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        conn.query("select * from db_demo.users where username=? and password=?",[username,password],(err,result,fields)=>{
            if(err) throw err;
            if(result.length>0){
                res.sendfile('./home.html');
            }else{
                res.sendfile('./index.html');
            }
            conn.release();
        });
    });
});

app.post('/signUp',(req,res)=>{
    let username=req.body.username;
    let password=req.body.password;
    res.send(username+":"+password);
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        conn.query("insert into db_demo.users value(null,?,?)",[username,password],(err,result,fields)=>{
            if(err) throw err;
            if(result.affectedRows>0){
                res.sendfile('./index.html');
            }else{
                res.sendfile('./sign_up.html');
            }
            conn.release();
        });
    });
});
app.listen(80);