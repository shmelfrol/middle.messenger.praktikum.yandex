import {inputs} from "./propsforms";
import {AppComponent} from "../../modules/AppComponent";
import form_login_tpl from "./form_login.hbs"
import form_reg_tpl from "./form_reg.hbs"
import form_settings_tpl from "./form_settings.hbs"
import page_form_tpl from './page_form.hbs'
import {validform, validEl} from "../../utility/valid";
import {button} from "../../component/button/button";
import {input} from "../../component/input/input";
import {Children} from "src/type_component";

function Input_events(el:HTMLDivElement){
    let errordiv:Element|null=null
    errordiv=el.querySelector('#errormessage')
    if(errordiv!==null){
        el.querySelectorAll('input').forEach(item=> {
            item.addEventListener('blur',()=>{validEl(item, errordiv)} )
        })
    }

}

function Form_login_events(el:HTMLDivElement){
    let values={}
    el.querySelectorAll('input[type="submit"]').forEach(item=> {
      item.addEventListener('click',(event)=>{validform(el,values, event )} )
    })
}

//const  first_name =new AppComponent('div', inputs.first_name, 'form-example', input_tpl, Input_events)

//создаем кнопку
const button_login_props={btn_name:"Войти"}

function form_props(login_fields:string[]){
    let props:Children={}
    for(let key in login_fields){
        switch(login_fields[key]){
            case 'login':{
               let login:AppComponent=input(inputs.login, Input_events)
                props[login_fields[key]]=login
                break
            }
            case 'Password':{
                let Password:AppComponent=input(inputs.Password, Input_events)
                props[login_fields[key]]=Password
                break
            }
            case 'first_name':{
                let first_name:AppComponent=input(inputs.first_name, Input_events)
                props[login_fields[key]]=first_name
                break
            }
            case 'second_name':{
                let second_name:AppComponent=input(inputs.second_name, Input_events)
                props[login_fields[key]]=second_name
                break
            }
            case 'display_name':{
                let display_name:AppComponent=input(inputs.display_name, Input_events)
                props[login_fields[key]]=display_name
                break
            }
            case 'email':{
                let email:AppComponent=input(inputs.email, Input_events)
                props[login_fields[key]]=email
                break
            }
            case 'phone':{
                let phone:AppComponent=input(inputs.phone, Input_events)
                props[login_fields[key]]=phone
                break
            }
            case 'oldPassword':{
                let oldPassword:AppComponent=input(inputs.oldPassword, Input_events)
                props[login_fields[key]]=oldPassword
                break
            }
            case 'newPassword':{
                let newPassword:AppComponent=input(inputs.newPassword, Input_events)
                props[login_fields[key]]=newPassword
                break
            }
            case 'avatar':{
                let avatar:AppComponent=input(inputs.avatar, Input_events)
                props[login_fields[key]]=avatar
                break
            }
            case 'button_login':{
                let button_login:AppComponent=button(button_login_props)
                props[login_fields[key]]=button_login
                break
            }
        }
    }
    return props
}
const login_fields=['login','Password', 'button_login' ]
const reg_fields=['first_name','second_name', 'display_name','email' , 'phone' ,'login','Password', 'button_login' ]
const settings_fields=['first_name','second_name', 'display_name','email' , 'phone' ,'login','oldPassword', 'newPassword', 'avatar', 'button_login' ]
export function formPage(path:string){
    let props:Children;
    let tpl
    switch(path){
        case '/login':{
           props=form_props(login_fields)
           tpl=form_login_tpl
            break
        }
        case '/reg':{
           props=form_props(reg_fields)
           tpl=form_reg_tpl
           break
        }
        case '/settings':{
            props=form_props(settings_fields)
            tpl=form_settings_tpl
            break
        }
    }
    const form= new AppComponent('form', props, 'form-example', tpl, Form_login_events)
    const page = new AppComponent('div', {form:form}, 'testmain', page_form_tpl)
    return page
}


