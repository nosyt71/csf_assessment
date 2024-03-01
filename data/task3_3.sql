-- TODO Task 3
drop database if exists ecommerce;

create database ecommerce;

use ecommerce;

create table orders (
    orderId int not null,
    date Date not null,
    name varchar(128) not null,
    address varchar(128) not null,
    priority boolean not null,
    comments varchar(128) not null,
    cart varchar(500) not null,

    primary key(orderId)
);
