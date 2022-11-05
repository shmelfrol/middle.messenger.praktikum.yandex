import {AppComponent} from "../../modules/AppComponent";
import navbar_item_tpl from "./navbar_item.hbs"



export function navbar_item(props, nav_item_events){
    return new AppComponent('div', props, '', navbar_item_tpl, nav_item_events)
}