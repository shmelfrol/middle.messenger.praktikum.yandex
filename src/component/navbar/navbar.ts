import NavbarItem from '../navbar_item/navbar_item';
import NavbarTpl from './navbar.hbs';
import { AppComponent } from '../../modules/AppComponent';

const menuitems: object = {
  chat: {
    id: 0, name: '/chat', path: '/chat', title: 'Чат', active: false,
  },
  contacts: {
    id: 1, name: '/contacts', title: 'Контакты', active: false,
  },
  login: {
    id: 2, name: '/login', title: 'Вход', active: false,
  },
  settings: {
    id: 3, name: '/settings', title: 'Настройки', active: false,
  },
  reg: {
    id: 3, name: '/reg', title: 'Регистрация', active: false,
  },
};

function MyaddEvents(el, props:object): void {
  const path:string = window.location.pathname;
  el.querySelectorAll('.menuitem').forEach((item:any) => {
    if (path === props.name) {
      // props.active=true
      item.classList.add('active');
    }
  });
  // console.log('myaddev_el', props.name)
}

export default function NavbarItems() {
  const chat = NavbarItem(menuitems.chat, MyaddEvents);
  const contacts = NavbarItem(menuitems.contacts, MyaddEvents);
  const settings = NavbarItem(menuitems.settings, MyaddEvents);
  const reg = NavbarItem(menuitems.reg, MyaddEvents);
  const login = NavbarItem(menuitems.login, MyaddEvents);
  const NavbarProps = {
    login, reg, chat, contacts, settings,
  };
  const navbar = new AppComponent('div', NavbarProps, 'mainmenu', NavbarTpl);
  return navbar;
}
