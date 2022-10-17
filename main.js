import {contacts} from "./modules/contacts/contacts";
import {form} from "./modules/form/form";

var ejs = require('ejs');
var fs = require('fs');
var pages=['/chat', '/contacts', '/settings', '/login', '/reg'];
var path=window.location.pathname;
var getparam=window.location.search
//var fullpath='/modules'+path+path+'.ejs'

var htmlContent = fs.readFileSync(__dirname + '/modules/navbar/navbar.ejs', 'utf8');
var htmlRenderized = ejs.render(htmlContent, {active: path});


if(path=="/contacts"){
    var mainContent = fs.readFileSync(__dirname + '/modules/contacts/contacts.ejs', 'utf8');
    var mainRenderized = ejs.render(mainContent, {contacts: contacts()});
}


if(path=="/chat"){
let chatId='x';
    if(getparam){
        const regex = /\?id=/gm;
        chatId=getparam.replace(regex, "")
    }
    var mainContent = fs.readFileSync(__dirname + '/modules/chat/chat.ejs', 'utf8');
    var mainRenderized = ejs.render(mainContent, {contacts: contacts(), path:path, chatId:chatId});
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
    let fields=['first_name', 'second_name', 'login', 'email', 'phone','Password']
    let btn_name= 'Зарегистрироваться'
    let inputs=form(fields);
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




