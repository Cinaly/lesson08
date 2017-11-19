/**
 * Created by web-01 on 2017/11/12.
 */
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
//const http=require('http');

let app = express();

/*取得表单参数*/
app.use(bodyParser.urlencoded({
    extended: true
}));

console.log("======" + __dirname);

let pool = mysql.createPool({
    connectionLimit: 10,
    user: 'root',
    password: '',
    database: 'db_demo'
});

app.use(express.static(__dirname+'/public')); //配置静态目录 public 处理html页面的链接

app.get('/', (req, res) => {

    //res.end("hello,express");
    console.log("---" + __dirname);
    res.sendFile(__dirname + "/public/index.html");

});
/*
app.get('/signUp', (req, res) => { // get post put delete
    res.sendFile(__dirname + '/public/sign-up.html');
});
*/


app.post('/signIn', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    // res.send(username+":"+password);
    console.log("======" + __dirname);
    pool.getConnection((err, conn) => {
        if (err) throw err;

        conn.query("select * from db_demo.users where username=? and password=?", [username, password], (err, result, fields) => {
            if (err) throw err;
            console.log(result);
            if (result.length > 0) {
                res.sendFile(__dirname + '/public/home.html');
            } else {
                res.sendfile(__dirname + '/public/index.html');
            }
            conn.release();
        });
    });
});

app.post('/signUp', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    pool.getConnection((err, conn) => {
        if (err) throw err;
        conn.query("select * from db_demo.users where username=?", [username], (err, result, fields) => {
            if (err) throw err;
            console.log(result);
            if (result.length > 0) {
                res.sendFile(__dirname + '/public/sign-up.html');
            } else {
                pool.getConnection((err, conn) => {
                    conn.query("insert into db_demo.users value(null,?,?)", [username, password], (err, result, fields) => {
                        if (err) throw err;

                        if (result.affectedRows > 0) {
                            res.sendFile(__dirname + '/public/index.html');
                        } else {
                            res.sendFile(__dirname + '/public/sign-up.html');
                        }
                    });
                });
            }
            conn.release();
        });

    });
});

app.listen(80);