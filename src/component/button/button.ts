import {AppComponent} from "../../modules/AppComponent";
import button_tpl from "./button.hbs"

export function button(button_login_props){
    return new AppComponent('div', button_login_props, 'form-example', button_tpl)
}