import contact_tpl from "./contact.hbs"
import {AppComponent} from "../../modules/AppComponent";
import {Props} from "src/type_component";

export function contact(props:Props){

    return new AppComponent('div', props, 'form-example', contact_tpl)
}

