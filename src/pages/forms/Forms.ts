import {Children} from '../../type_component';
import {formsdata} from '../../Storage/propsForms';
import FormLoginTpl from './FormLogin.hbs';
import FormRegTpl from './FormReg.hbs';
import FormSettingsTpl from './FormSettings.hbs';
import {FormFields} from "src/pages/forms/FormFields";
import {Component} from "src/modules/Component";
import {validformData} from "src/utility/valid";
import {AuthCtr} from "src/Controllers/AuthController";
import {InPut} from "src/component/Input/Input";

export class Form extends Component {
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
    ) {
        let children = FormFields({...myprops})
        myprops = {...myprops, ...children}

        super(tag, myprops, classofTag, template);

        let events = {click: this.ButtonClick}
        this.SetEvents(events)


        // this.addChildren(inputs);
    }


    ButtonClick = (e:Event) => {
        e.preventDefault()
        let path = window.location.pathname
        let targetType = e!.target!.getAttribute("type")
        let formdata = {}
        let divErr:HTMLDivElement|null|undefined = null
        if (this?.getContent()) {
            divErr = this?.getContent()?.querySelector("#err");
        }

        if (targetType === "submit") {
            Object.keys(this.children).forEach((key) => {
                if (this.children[key] instanceof InPut) {
                    let inputData = this.children[key].getInputValue();
                    formdata = {...formdata, ...inputData};
                }
            })
            let error = validformData(formdata)
            if(divErr !== null && divErr !== undefined){
                if (error === null) {
                    if (path === "/") {
                        AuthCtr.signIn(formdata).catch((res) => {
                            if (typeof res === 'object') {
                                if (res?.reason) {
                                    divErr!.textContent += res.reason
                                }
                                if (res?.type) {
                                    divErr!.textContent += res.type
                                }

                            } else {
                                divErr!.textContent += res
                            }
                        })
                    }
                    if (path === "/sign-up") {
                        AuthCtr.signUp(formdata).catch((res) => {
                            divErr!.textContent += res.reason
                        })
                    }
                } else {
                    divErr.textContent = error
                }
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