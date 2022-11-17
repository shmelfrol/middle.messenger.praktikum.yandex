import { Children } from '../../type_component';
import {formsdata} from '../../Storage/propsForms';

import FormLoginTpl from './FormLogin.hbs';
import FormRegTpl from './FormReg.hbs';
import FormSettingsTpl from './FormSettings.hbs';
import { validform} from '../../utility/valid';
import { FormFields} from "src/pages/forms/FormFields";
import {Component} from "src/modules/Component";




export class Form extends Component {
  constructor(
      tag: string,
      myprops: Children,
      classofTag: string,
      template: string,
      MyaddEvents = null,
  ) {
    let children=FormFields(myprops)
    myprops={...myprops, ...children }
    super(tag, myprops, classofTag, template, MyaddEvents);
    //console.log("_____________________",this.props)
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