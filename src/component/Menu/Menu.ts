import {getMenuItens} from "src/Storage/propsNavbar";
import {Component} from "src/modules/Component";
import {Children, Props} from "src/type_component";
import MenuTPL from "./Menu.hbs"
import MenuItemTpl from "src/component/MenuItem/MenuItem.hbs"
import {store} from "src/Storage/store";
import {EVENTS} from "src/const/constsStore";
import {MenuItem} from "src/component/MenuItem/MenuItem";
import {router} from "src/modules/MainRouter";
import {AuthCtr} from "src/Controllers/AuthController";


export class Menu extends Component {
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: Function,
    ) {


        super(tag, myprops, classofTag, template);
        store.on(EVENTS.UPDATEPATH, () => {
            let props = getMenuItens()
            this.setProps({menuitems: props.menuitems, activePath: store.getState().activePath});
        });

        this.addChildren({
            MenuItems: this.props.menuitems.map((item:Props) => new MenuItem('li', {
                ...item,
                events: {click: this.ClickMenuItem},
                activePath: this.props.activePath
            }, 'menuitem', MenuItemTpl, "1", {href: item.name}))
        })

    }


    ClickMenuItem(this:HTMLElement) {
        let path = window.location.pathname
        let href = this.getAttribute("href")
        if(href){
            if (href !== "/logout") {
                if (path !== href) {
                    router.go(href)
                }
            } else {
                AuthCtr.logout()
            }
        }

    }


    render() {
        if (this.template !== null) {
            return this.compile(this.template, this.children);
        }
    }

    componentDidUpdate() {
        this.children.MenuItems = this.props.menuitems.map((item:Props) => new MenuItem('li', {
            ...item,
            events: {click: this.ClickMenuItem},
            activePath: this.props.activePath
        }, 'menuitem', MenuItemTpl, "1", {href: item.name}));
        return true
    }


}

export function MainMenu() {
    let myprops = getMenuItens()
    let activePath = store.getState().activePath
    return new Menu('ul', {menuitems: myprops.menuitems, activePath: activePath}, 'mainmenu', MenuTPL)
}




