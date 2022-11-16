import {Children} from "src/type_component";
import input from "src/component/Input/Input";
import button from "src/component/Button/Button";
import {formfields} from "src/pages/forms/propsForms";

export function FormFields(props) {
    const components: Children = {};
    let Fields=[]
    let path = window.location.pathname
    // eslint-disable-next-line default-case
    switch (path) {
        case '/login': {
            Fields = formfields.LoginFields;
            break;
        }
        case '/reg': {
            Fields = formfields.RegFields;
            break;
        }
        case '/settings': {
            Fields = formfields.SettingsFields;
            break;
        }
    }




    for (const LoginField of Fields) {
        // eslint-disable-next-line default-case
        switch (LoginField) {
            case 'login': {
                const login = input(props.inputs.login);
                components[LoginField] = login;
                break;
            }
            case 'Password': {
                const Password = input(props.inputs.Password);
                components[LoginField] = Password;
                break;
            }
            case 'first_name': {
                const FirstName = input(props.inputs.first_name);
                components[LoginField] = FirstName;
                break;
            }
            case 'second_name': {
                const SecondName = input(props.inputs.second_name);
                components[LoginField] = SecondName;
                break;
            }
            case 'display_name': {
                const DisplayName = input(props.inputs.display_name);
                components[LoginField] = DisplayName;
                break;
            }
            case 'email': {
                const email = input(props.inputs.email);
                components[LoginField] = email;
                break;
            }
            case 'phone': {
                const phone = input(props.inputs.phone);
                components[LoginField] = phone;
                break;
            }
            case 'oldPassword': {
                const oldPassword= input(props.inputs.oldPassword);
                components[LoginField] = oldPassword;
                break;
            }
            case 'newPassword': {
                const newPassword= input(props.inputs.newPassword);
                components[LoginField] = newPassword;
                break;
            }
            case 'avatar': {
                const avatar= input(props.inputs.avatar);
                components[LoginField] = avatar;
                break;
            }
            case 'button_login': {
                const ButtonLogin = button(props.buttons.btnLogin);
                components[LoginField] = ButtonLogin;
                break;
            }
        }
    }
    return components;
}