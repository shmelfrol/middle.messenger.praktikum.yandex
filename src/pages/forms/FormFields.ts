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
        case '/': {
            Fields = formfields.LoginFields;
            break;
        }
        case '/sign-up': {
            Fields = formfields.RegFields;
            break;
        }
        case '/settings': {
            Fields = formfields.SettingsFields;
            break;
        }
        case '/messenger': {
            Fields = formfields.ChatFields;
            break;
        }
    }




    for (const LoginField of Fields) {
        const regex = /^btn/gm;
        if(LoginField.match(regex)===null){
            components[LoginField] = input({...props.forChildrens[LoginField], value:(props.currentUser)?props.currentUser[LoginField]:null, events:props.events});
        }else {
            components[LoginField]  = button({...props.forChildrens[LoginField]});
        }
    }
    console.log("FIELDS", components)
    return components;
}