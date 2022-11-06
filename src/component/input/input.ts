import {AppComponent} from "../../modules/AppComponent";
import input_tpl from "./input.hbs"
import {Props} from "src/type_component";

export function input(props:Props, Input_events:Function){
    return new AppComponent('div', props, 'form-example', input_tpl, Input_events)
}