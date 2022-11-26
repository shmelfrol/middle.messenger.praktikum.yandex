import {validEl, validform} from "src/utility/valid";
import {authapi} from "src/api/auth-api";
import {authreg} from "src/utility/authrequest";
import {AuthCtr} from "src/Controllers/AuthController";
import {UserCtr} from "src/Controllers/UserController";


export function EventForInput(el, e){
    console.log("INPUT", el)
    const errordiv = el.querySelector('#errormessage');
    const input = el.querySelector('input')

    validEl(input, errordiv );
}

export function EventForButton(el, e){
    console.log(el)
    e.preventDefault()


    const values = {};
    const formdata={}
    let divErr = el.querySelector("#err");
    el.querySelectorAll('input').forEach((item) => {
        if (item.type !== 'submit') { formdata[item.name] = item.value; }
    });
    console.log("formdata", formdata)


    let data = ''
    let err = null
    try {
        data = validform(el, values, event);
    } catch (e) {
        err = e
    }
    if (err === null) {
        let path = window.location.pathname
        if (path === "/login") {
            AuthCtr.signIn(data).catch((res) => {
                divErr.textContent += res.reason
            })
        }
        if (path === "/reg") {
            authreg(data)
        }
    }
    console.log("BUTTONCLICK")
}

export function EventForButtonSettings(el, e){
    let type=e.target.getAttribute("type")
    console.log("TARGET", e.target.getAttribute("type"))

if(type==="submit"){
    e.preventDefault()
    let data = ''
    let err = null
    let divErr = el.querySelector("#err");
    try {
        data = validform(el);
        console.log("data in EVENTs", data)
    } catch (e) {
        console.log(e)
        err = e
    }
    if (err === null) {
        if(data.hasOwnProperty("oldPassword")){
            let passwordsData={oldPassword:data.oldPassword, newPassword:data.newPassword}
        }
        if(data.hasOwnProperty("avatar")){
           let file=el.querySelector("input[type=file]").files[0];
           console.log("MYFILE",file.files)
            UserCtr.changeAvatar(file)
        }



        UserCtr.changeProfile(data)
    }
}

}


