import {Children} from "src/type_component";
import input from "src/component/Input/Input";
import button from "src/component/Button/Button";
import {formfields} from "src/Storage/propsForms";

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
        const regex = /^btn/gm;
        if(LoginField.match(regex)===null){
            components[LoginField] = input({...props.forChildrens[LoginField], value:(props.currentUser)?props.currentUser[LoginField]:null});
        }else {
            components[LoginField]  = button({...props.forChildrens[LoginField]});
        }

        // eslint-disable-next-line default-case
       /* switch (LoginField) {
            case 'login': {
                components[LoginField] = input({...props.forChildrens.login, value:(props.currentUser)?props.currentUser.login:null});
                break;
            }
            case 'Password': {
                components[LoginField] = input({...props.forChildrens.Password, value:(props.currentUser)?props.currentUser.password:null});;
                break;
            }
            case 'firstName': {
                components[LoginField] = input({...props.forChildrens.firstName, value:(props.currentUser)?props.currentUser.firstName:null});
                break;
            }
            case 'second_name': {
                components[LoginField] = input({...props.forChildrens.secondName, value:(props.currentUser)?props.currentUser.secondName:null});
                break;
            }
            case 'displayName': {
                components[LoginField] = input({...props.forChildrens.displayName, value:(props.currentUser)?props.currentUser.displayName:null});
                break;
            }
            case 'email': {
                components[LoginField] = input({...props.forChildrens.email, value:(props.currentUser)?props.currentUser.email:null});
                break;
            }
            case 'phone': {
                components[LoginField] = input({...props.forChildrens.phone, value:(props.currentUser)?props.currentUser.phone:null});
                break;
            }
            case 'oldPassword': {
                components[LoginField] = input({...props.forChildrens.oldPassword});
                break;
            }
            case 'newPassword': {
                components[LoginField] = input({...props.forChildrens.newPassword});
                break;
            }
            case 'avatar': {
                components[LoginField] = input({...props.forChildrens.avatar, value:(props.currentUser)?props.currentUser.avatar:null});
                break;
            }
            case 'btnLogin': {
                components[LoginField]  = button({...props.forChildrens.btnLogin});
                break;
            }
            case 'btnReg': {
                components[LoginField] = button({...props.forChildrens.btnReg});
                break;
            }
            case 'btnSettings': {
                components[LoginField] = button({...props.forChildrens.btnSettings});
                break;
            }
        }*/
    }
    return components;
}