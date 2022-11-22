import {navitems} from "src/Storage/propsNavbar";
import {Component} from "src/modules/Component";
import {Children} from "src/type_component";
import {Menuevents} from "src/events/NavbarEvents";
import {NavbarItems} from "src/component/NavBarItems/NavbarItems";
import MenuTPL from "./Menu.hbs"
import NavbarItemsTpl from "src/component/NavBarItems/NavbarItems.hbs"









export class Navbar extends Component {
  constructor(
      tag: string,
      myprops: Children,
      classofTag: string,
      template: string,
      MyaddEvents = null,
  ) {

    myprops.NavbarItems=new NavbarItems('ul', myprops, 'mainmenu', NavbarItemsTpl)
    myprops.events=Menuevents
    super(tag, myprops, classofTag, template, MyaddEvents);
  }

  render() {
    if (this.template !== null) {
      return this.compile(this.template, this.children);
    }
  }
}

export function Menu(){
  return new Navbar('div', navitems, '',MenuTPL)
}




