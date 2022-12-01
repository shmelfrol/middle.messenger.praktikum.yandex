import {getMenuItens, menuitems, navitems} from "src/Storage/propsNavbar";
import {Component} from "src/modules/Component";
import {Children} from "src/type_component";
import {Menuevents, ActiveItemMenu} from "src/events/NavbarEvents";
import MenuTPL from "./Menu.hbs"
import MenuItemTpl from "src/component/MenuItem/MenuItem.hbs"
import {store} from "src/Storage/store";
import {EVENTS} from "src/const/constsStore";

import {MenuItem} from "src/component/MenuItem/MenuItem";

import {ClickMenuItem} from "src/events/NavbarEvents";


export class Menu extends Component {
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
    ) {

        myprops.MenuItems = myprops.menuitems.map((item) => new MenuItem('li', {
            ...item,
            events: {click: ClickMenuItem}
        }, 'menuitem', MenuItemTpl, "1", {href: item.name}));

        super(tag, myprops, classofTag, template);
        store.on(EVENTS.UPDATEPATH, () => {
            let currentUser = store.getState().currentUser
            let props = getMenuItens()
            // пдписываемся на обновление компонента, передав данные из хранилища
            this.setProps({menuitems: props.menuitems, activePath: store.getState().activePath});
        });

    }


    componentDidMount() {
        ActiveItemMenu(this.getContent(), this.props)
    }

    VisualEffects() {
        ActiveItemMenu(this.getContent(), this.props)
    }

    render() {
        if (this.template !== null) {
            //ActiveItemMenu(this.getContent(), this.props)
            return this.compile(this.template, this.children);
        }
    }

    componentDidUpdate(oldProps) {
        this.children.MenuItems = this.props.menuitems.map((item) => new MenuItem('li', {
            ...item,
            events: {click: ClickMenuItem}
        }, 'menuitem', MenuItemTpl, "1", {href: item.name}));


        return true
    }


}

export function MainMenu() {
    let myprops = getMenuItens()

    return new Menu('ul', {menuitems: myprops.menuitems}, 'mainmenu', MenuTPL)
}




