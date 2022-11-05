import {navbar_item} from "../navbar_item/navbar_item";
import navbar_tpl from './navbar.hbs';
import {AppComponent} from "../../modules/AppComponent";

let menuitems: object={
    chat: {id: 0, name: "/chat", path:"/chat", title: "Чат", active:false},
    contacts: {id: 1, name: "/contacts", title: "Контакты", active:false},
    login: {id: 2, name: "/login", title: "Вход", active:false},
    settings: {id: 3, name: "/settings", title: "Настройки", active:false},
    reg:  {id: 3, name: "/reg", title: "Регистрация", active:false},
    }


function MyaddEvents(el, props:object): void{
    let path:string=window.location.pathname
    el.querySelectorAll('.menuitem').forEach(item=>{
        if(path==props.name){
           // props.active=true
            item.classList.add('active')
        }
    })
    //console.log('myaddev_el', props.name)

}

export function navbar_items(){
    const chat= navbar_item(menuitems.chat, MyaddEvents)
    const contacts= navbar_item(menuitems.contacts, MyaddEvents)
    const settings= navbar_item(menuitems.settings, MyaddEvents)
    const reg= navbar_item(menuitems.reg, MyaddEvents)
    const login= navbar_item(menuitems.login, MyaddEvents)
    const navbar_props={login:login, reg:reg, chat:chat, contacts:contacts, settings:settings}
    const navbar= new AppComponent('div', navbar_props, 'mainmenu', navbar_tpl)
    return navbar
}