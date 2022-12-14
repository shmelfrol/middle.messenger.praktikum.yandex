import {Children, Props} from "src/type_component";
import input from "src/component/Input/Input";
import button from "src/component/Button/Button";
import {formfields} from "src/Storage/propsForms";

export function FormFields(props:Props) {
    const components: Children = {};
    let Fields:string[]=[]
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


            if(LoginField==="avatar"){
                console.log(LoginField, props.eventsForInput)
                components[LoginField] = input({...props.forChildrens[LoginField], value:(props.currentUser)?props.currentUser[LoginField]:null});
            }else{
                components[LoginField] = input({...props.forChildrens[LoginField], value:(props.currentUser)?props.currentUser[LoginField]:null, events:props.eventsForInput});
            }

        }else {
            components[LoginField]  = button({...props.forChildrens[LoginField]});
        }
    }

    return components;
}