set names utf8;
drop database if exists db_demo;
create database db_demo;

use db_demo;

create table users (
    id int primary key auto_increment,
    username varchar(255) not null,
    password varchar(255) not null
)
    comment '用户表';

