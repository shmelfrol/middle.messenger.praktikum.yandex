import { AppComponent } from 'src/modules/AppComponent';
import NavbarItem from '../NavbarItem/NavbarItem';
import NavbarTpl from './Navbar.hbs';
import {menuitems, navitems} from "src/Storage/propsNavbar";
import {Component} from "src/modules/Component";
import {Children} from "src/type_component";

import {router} from "src/index";
import {NavbarItems} from "src/component/NavBarItems/NavbarItems";
import MenuTPL from "./Menu.hbs"
import NavbarItemsTpl from "src/component/NavBarItems/NavbarItems.hbs"
import {validform} from "src/utility/valid";

function MyaddEvents(el, props: object): void {
  const path: string = window.location.pathname;
  if (path === props.name) {
    el.classList.add('active');
  }
  // console.log('myaddev_el', props.name)
}

function Menuevents(el, props){
  let items=el.querySelectorAll('li')
  items.forEach((item) => {
    item.addEventListener('click', (event) => {
      let href=item.getAttribute("href")
      history.pushState({}, '', href);
      if(window.onpopstate){
        window.onpopstate();
      }

     // router.go(href);
    });
  });


}




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
      console.log("EVENTS", this.props.events)
      return this.compile(this.template, this.children);
    }
  }
}

export function Menu(){
  return new Navbar('div', navitems, '',MenuTPL)
}



export default function NavbarItems_old() {
  const chat = NavbarItem(menuitems.chat, MyaddEvents);
  const contacts = NavbarItem(menuitems.contacts, MyaddEvents);
  const settings = NavbarItem(menuitems.settings, MyaddEvents);
  const reg = NavbarItem(menuitems.reg, MyaddEvents);
  const login = NavbarItem(menuitems.login, MyaddEvents);
  const NavbarProps = {
    login,
    reg,
    chat,
    contacts,
    settings,
  };
  const navbar = new AppComponent('ul', NavbarProps, 'mainmenu', NavbarTpl);
  return navbar;
}
