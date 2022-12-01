import {Children} from '../../type_component';
import {formsdata} from '../../Storage/propsForms';

import FormLoginTpl from './FormLogin.hbs';
import FormRegTpl from './FormReg.hbs';
import FormSettingsTpl from './FormSettings.hbs';
import {validEl, validform} from '../../utility/valid';
import {FormFields} from "src/pages/forms/FormFields";
import {Component} from "src/modules/Component";

import {EventForButton, FormLoginEvents, FormSettingsEvents} from "src/events/authEvents";
import {EventForInput} from "src/events/authEvents";

export class Form extends Component {
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
    ) {
        let children = FormFields({
            ...myprops, events: {
                focusout: EventForInput
            }
        })
        myprops = {...myprops, ...children}
        myprops.events={click:EventForButton}
        super(tag, myprops, classofTag, template);
        console.log("_____________________")
    }

    /*AddEvents() {
       // FormLoginEvents(this.getContent(), this.props)
    }*/

    render() {
        console.log("propd_________________________", this.props)
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