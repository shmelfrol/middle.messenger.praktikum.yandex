import {validEl, validform} from "src/utility/valid";
import {authapi} from "src/api/auth-api";
import {authreg} from "src/utility/authrequest";
import {AuthCtr} from "src/Controllers/AuthController";
import {UserCtr} from "src/Controllers/UserController";

export function InputEvents(el: HTMLDivElement) {
    // console.log('from props');
    const errordiv = el.querySelector('#errormessage');
    if (errordiv) {
        const inputs = el.querySelectorAll('input');
        if (inputs) {
            inputs.forEach((item) => {
                item.addEventListener('blur', () => {
                    validEl(item, errordiv);
                });
            });
        }
    }
}

export function FormLoginEvents(el: HTMLDivElement) {
    const values = {};
    const formdata={}
    let divErr = el.querySelector("#err");

    el.querySelectorAll('input[type="submit"]').forEach((item) => {
        item.addEventListener('click', (event) => {
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
        });
    });
}



export function FormSettingsEvents(el: HTMLDivElement) {
    console.log("Settings")
    const values = {};
    let divErr = el.querySelector("#err");
    el.querySelectorAll('input[type="submit"]').forEach((item) => {
        item.addEventListener('click', (event) => {
            console.log("Settings")
            let data = ''
            let err = null
            try {
                data = validform(el, values, event);
                console.log("data in EVENTs", data)
            } catch (e) {
                  console.log(e)
                err = e
            }
            if (err === null) {
                UserCtr.changeProfile(data)
            }
        });
    });
}