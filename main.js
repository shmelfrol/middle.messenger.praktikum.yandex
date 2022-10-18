import {contacts} from "./modules/contacts/contacts";
import {form} from "./modules/form/form";
import img from "./public/image/user.jpg";
import "./public/cssout/mainin.css"
import "./public/cssout/chat.css"
import "./public/cssout/btn.css"
import "./public/cssout/form.css"
import fs from 'fs';

const ejs = require('ejs');
const pages=['/chat', '/contacts', '/settings', '/login', '/reg'];
let path=window.location.pathname;
let getparam=window.location.search

let htmlContent = fs.readFileSync(__dirname + '/modules/navbar/navbar.ejs', 'utf8');
let htmlRenderized = ejs.render(htmlContent, {active: path});


if(path=="/contacts"){
    var mainContent = fs.readFileSync(__dirname + '/modules/contacts/contacts.ejs', 'utf8');
    var mainRenderized = ejs.render(mainContent, {contacts: contacts(), img:img});
}


if(path=="/chat"){
let chatId='x';
    if(getparam){
        const regex = /\?id=/gm;
        chatId=getparam.replace(regex, "")
    }
    var mainContent = fs.readFileSync(__dirname + '/modules/chat/chat.ejs', 'utf8');
    var mainRenderized = ejs.render(mainContent, {contacts: contacts(), path:path, chatId:chatId, img:img});
}


if(path=="/settings"){
    let fields=['first_name', 'second_name', 'login', 'email', 'phone','oldPassword', 'newPassword', 'avatar']
    let btn_name= 'Save'
    let inputs=form(fields);
    var mainContent = fs.readFileSync(__dirname + '/modules/form/form.ejs', 'utf8');
    var mainRenderized = ejs.render(mainContent, {inputs: inputs, btn_name: btn_name, reg: false});
}

if(path=="/login"){
    let fields=['login', 'Password']
    let btn_name= 'Войти'
    let inputs=form(fields);
    var mainContent = fs.readFileSync(__dirname + '/modules/form/form.ejs', 'utf8');
    var mainRenderized = ejs.render(mainContent, {inputs: inputs, btn_name: btn_name, reg: true});
}

if(path=="/reg"){
    let fieldsreg=['first_name', 'second_name', 'login', 'email', 'phone','Password']
    let btn_name= 'Зарегистрироваться'
    let inputs=form(fieldsreg);
    console.log(inputs);
    var mainContent = fs.readFileSync(__dirname + '/modules/form/form.ejs', 'utf8');
    var mainRenderized = ejs.render(mainContent, {inputs: inputs, btn_name: btn_name, reg: false});
}

if(pages.includes(path)==false){
    var mainContent = fs.readFileSync(__dirname + '/modules/err/404.ejs', 'utf8');
    var mainRenderized = ejs.render(mainContent);
}

const navbar = document.querySelector('#navbar');
const main= document.querySelector('#main');

navbar.innerHTML+=htmlRenderized;
main.innerHTML+=mainRenderized;




