import {AppComponent} from "../../modules/AppComponent";
import input_tpl from "./input.hbs"

export function input(props, Input_events){
    return new AppComponent('div', props, 'form-example', input_tpl, Input_events)
}