import { Children } from '../../type_component';
import {formsdata} from './propsForms';
import { AppComponent } from '../../modules/AppComponent';
import FormLoginTpl from './FormLogin.hbs';
import FormRegTpl from './FormReg.hbs';
import FormSettingsTpl from './FormSettings.hbs';
import PageFormTpl from './PageForm.hbs';
import { validform, validEl } from '../../utility/valid';
import { FormFields} from "src/pages/forms/FormFields";
import {Component} from "src/modules/Component";

function FormLoginEvents(el: HTMLDivElement) {
  const values = {};
  el.querySelectorAll('input[type="submit"]').forEach((item) => {
    item.addEventListener('click', (event) => {
      validform(el, values, event);
    });
  });
}

// создаем кнопку
const ButtonLoginProps = { btn_name: 'Войти' };








/*export default function formPage(props) {
  console.log("forppage_props!!!!", props)
  let components  = {};
  let tpl: any;
  let path = window.location.pathname
  // eslint-disable-next-line default-case
  switch (path) {
    case '/login': {
      components = FormFields(LoginFields, props);
      tpl = FormLoginTpl;
      break;
    }
    case '/reg': {
      components = FormFields(RegFields, props);
      tpl = FormRegTpl;
      break;
    }
    case '/settings': {
      components = FormFields(SettingsFields, props);
      tpl = FormSettingsTpl;
      break;
    }
  }
  //components = { ...components, events: FormLoginEvents };
  //const form = new AppComponent('form', props, 'form-example', tpl);
  //const page = new AppComponent('div', { form }, 'testmain', PageFormTpl);
  return components;
}*/


export class Form extends Component {
  constructor(
      tag: string,
      myprops: Children,
      classofTag: string,
      template: string,
      MyaddEvents = null,
  ) {
    console.log("Myprop!!!!!!!!!!!!!!!s",myprops)
    let children=FormFields(myprops)
    myprops={...myprops, ...children }
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!",myprops)
    super(tag, myprops, classofTag, template, MyaddEvents);
  }

  render() {
    if (this.template !== null) {
      return this.compile(this.template, this.children);
    }
  }
}

export function FormPage(){
  let tpl='';
  let path = window.location.pathname;
  switch (path) {
    case '/login': {
      tpl = FormLoginTpl;
      break;
    }
    case '/reg': {
      tpl = FormRegTpl;
      break;
    }
    case '/settings': {
      tpl = FormSettingsTpl;
      break;
    }
  }

  return new Form('div', formsdata , 'testmain', tpl)
}