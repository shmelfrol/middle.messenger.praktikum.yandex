import contact_tpl from "./contact.hbs"
import {AppComponent} from "../../modules/AppComponent";

export function contact(props){

    return new AppComponent('div', props, 'form-example', contact_tpl)
}

