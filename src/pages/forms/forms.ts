import { Children } from '../../type_component';
import { inputs } from './propsforms';
import { AppComponent } from '../../modules/AppComponent';
import FormLoginTpl from './form_login.hbs';
import FormRegTpl from './form_reg.hbs';
import FormSettingsTpl from './form_settings.hbs';
import PageFormTpl from './page_form.hbs';
import { validform, validEl } from '../../utility/valid';
import button from '../../component/button/button';
import input from '../../component/input/input';

function InputEvents(el:HTMLDivElement) {
  const errordiv = el.querySelector('#errormessage');
  if (errordiv) {
    el.querySelectorAll('input').forEach((item) => {
      item.addEventListener('blur', () => { validEl(item, errordiv); });
    });
  }
}

function FormLoginEvents(el:HTMLDivElement) {
  const values = {};
  el.querySelectorAll('input[type="submit"]').forEach((item) => {
    item.addEventListener('click', (event) => { validform(el, values, event); });
  });
}

// создаем кнопку
const ButtonLoginProps = { btn_name: 'Войти' };

function FormProps(LoginFields:string[]) {
  const props:Children = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const LoginField of LoginFields) {
    // eslint-disable-next-line default-case
    switch (LoginField) {
      case 'login': {
        const login:AppComponent = input(inputs.login, InputEvents);
        props[LoginField] = login;
        break;
      }
      case 'Password': {
        const Password:AppComponent = input(inputs.Password, InputEvents);
        props[LoginField] = Password;
        break;
      }
      case 'first_name': {
        const FirstName:AppComponent = input(inputs.first_name, InputEvents);
        props[LoginField] = FirstName;
        break;
      }
      case 'second_name': {
        const SecondName:AppComponent = input(inputs.second_name, InputEvents);
        props[LoginField] = SecondName;
        break;
      }
      case 'display_name': {
        const DisplayName:AppComponent = input(inputs.display_name, InputEvents);
        props[LoginField] = DisplayName;
        break;
      }
      case 'email': {
        const email:AppComponent = input(inputs.email, InputEvents);
        props[LoginField] = email;
        break;
      }
      case 'phone': {
        const phone:AppComponent = input(inputs.phone, InputEvents);
        props[LoginField] = phone;
        break;
      }
      case 'oldPassword': {
        const oldPassword:AppComponent = input(inputs.oldPassword, InputEvents);
        props[LoginField] = oldPassword;
        break;
      }
      case 'newPassword': {
        const newPassword:AppComponent = input(inputs.newPassword, InputEvents);
        props[LoginField] = newPassword;
        break;
      }
      case 'avatar': {
        const avatar:AppComponent = input(inputs.avatar, InputEvents);
        props[LoginField] = avatar;
        break;
      }
      case 'button_login': {
        const ButtonLogin:AppComponent = button(ButtonLoginProps);
        props[LoginField] = ButtonLogin;
        break;
      }
    }
  }
  return props;
}
const LoginFields = ['login', 'Password', 'button_login'];
const RegFields = ['first_name', 'second_name', 'display_name', 'email', 'phone', 'login', 'Password', 'button_login'];
const SettingsFields = ['first_name', 'second_name', 'display_name', 'email', 'phone', 'login', 'oldPassword', 'newPassword', 'avatar', 'button_login'];
export default function formPage(path:string) {
  let props:Children = {};
  let tpl:any;
  // eslint-disable-next-line default-case
  switch (path) {
    case '/login': {
      props = FormProps(LoginFields);
      tpl = FormLoginTpl;
      break;
    }
    case '/reg': {
      props = FormProps(RegFields);
      tpl = FormRegTpl;
      break;
    }
    case '/settings': {
      props = FormProps(SettingsFields);
      tpl = FormSettingsTpl;
      break;
    }
  }
  const form = new AppComponent('form', props, 'form-example', tpl, FormLoginEvents);
  const page = new AppComponent('div', { form }, 'testmain', PageFormTpl);
  return page;
}
