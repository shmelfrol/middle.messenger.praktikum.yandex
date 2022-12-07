import {Children} from '../../type_component';
import {formsdata} from '../../Storage/propsForms';
import FormLoginTpl from './FormLogin.hbs';
import FormRegTpl from './FormReg.hbs';
import FormSettingsTpl from './FormSettings.hbs';
import {FormFields} from "src/pages/forms/FormFields";
import {Component} from "src/modules/Component";
import {EventForButton} from "src/events/authEvents";
import {EventForInput} from "src/events/authEvents";
import {validEl, validform, validformData} from "src/utility/valid";
import {AuthCtr} from "src/Controllers/AuthController";
import {router} from "src/modules/MainRouter";

export class Form extends Component {
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
    ) {
        /*  let children = FormFields({
              ...myprops, events: {
                  focusout: EventForInput
              }
          })*/
        /*let children = FormFields({
            ...myprops, events: {
                focusout: this.focusout
            }
        })*/

        // myprops = {...myprops, ...children}
        // myprops.events = {click: EventForButton}
        super(tag, myprops, classofTag, template);


        //this.eventBus.emit(Component.EVENTS.INIT);
    }

    addChildren() {
        this.props.events = {click: this.EventForButton}
        let inputs = FormFields({
            ...this.props, events: {
                focusout: this.focusout
            }
        })

        this.children = {...this.children, ...inputs}
        console.log("children", this.children)
    }

    focusout(e) {
        let target = e.target.tagName
        if (target === "INPUT") {
            const errordiv = this.querySelector('#errormessage');
            validEl(e.target, errordiv);
        }
    }

    EventForButton(e) {
        let path = window.location.pathname
        let target = e.target.getAttribute("type")
        let formdata:{} = {}
        let divErr = this.querySelector("#err");
        divErr.textContent = ""
        if (target == "submit") {
            e.preventDefault()
            this.querySelectorAll('input').forEach((item) => {
                if (item.type !== 'submit') {
                    formdata[item.name] = item.value;
                }
            });
            try {
               validformData(formdata)
                if (path === "/") {
                    AuthCtr.signIn(formdata).catch((res) => {
                        if (typeof res === 'object') {
                            if (res?.reason) {
                                divErr.textContent += res.reason
                            }
                            if (res?.type) {
                                divErr.textContent += res.type
                            }

                        } else {
                            divErr.textContent += res
                        }

                    })
                }
            } catch (e) {
                console.log("error", e)
                divErr.textContent =e.toString()
            }

        }
    }


    render() {
        if (this.template !== null) {
            return this.compile(this.template, this.children);
        }
    }
}

export function FormPage() {
    let tpl = '';
    let path = window.location.pathname;
    switch (path) {
        case '/': {

            tpl = FormLoginTpl;
            break;
        }
        case '/sign-up': {
            tpl = FormRegTpl;
            break;
        }
        case '/settings': {


            tpl = FormSettingsTpl;
            break;
        }
    }

    return new Form('div', formsdata, 'testmain', tpl)
}