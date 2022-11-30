import {navitems} from "src/Storage/propsNavbar";
import {Component} from "src/modules/Component";
import {Children} from "src/type_component";
import {Menuevents, ActiveItemMenu} from "src/events/NavbarEvents";
import {NavbarItems} from "src/component/NavBarItems/NavbarItems";
import MenuTPL from "./Menu.hbs"
import NavbarItemsTpl from "src/component/NavBarItems/NavbarItems.hbs"
import {store} from "src/Storage/store";
import {EVENTS} from "src/const/constsStore";




export class Navbar extends Component {
  constructor(
      tag: string,
      myprops: Children,
      classofTag: string,
      template: string,
  ) {

    myprops.NavbarItems=new NavbarItems('ul', myprops, 'mainmenu', NavbarItemsTpl)
    //myprops.events=Menuevents
    super(tag, myprops, classofTag, template);
    store.on(EVENTS.UPDATEPATH, () => {
      // пдписываемся на обновление компонента, передав данные из хранилища
      this.setProps({activePath:store.getState().activePath});
    });

  }

  /*AddEvents() {
    Menuevents(this.getContent(), this.props)
  }*/

  componentDidMount() {
    ActiveItemMenu(this.getContent(), this.props)
  }

  render() {
    if (this.template !== null) {
      ActiveItemMenu(this.getContent(), this.props)
      return this.compile(this.template, this.children);
    }
  }
}

export function Menu(){
  return new Navbar('div', navitems, '',MenuTPL)
}




