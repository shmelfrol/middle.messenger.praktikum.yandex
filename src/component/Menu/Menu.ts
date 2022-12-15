import { getMenuItens } from 'src/Storage/propsNavbar';
import { Component } from 'src/modules/Component';
import { Children, Props } from 'src/type_component';
import MenuItemTpl from 'src/component/MenuItem/MenuItem.hbs';
import { store } from 'src/Storage/store';
import { EVENTS } from 'src/const/constsStore';
import { MenuItem } from 'src/component/MenuItem/MenuItem';
import { router } from 'src/modules/MainRouter';
import { AuthCtr } from 'src/Controllers/AuthController';
import MenuTPL from './Menu.hbs';

export class Menu extends Component {
  constructor(tag: string, myprops: Children, classofTag: string, template: Function) {
    super(tag, myprops, classofTag, template);
    store.on(EVENTS.UPDATEPATH, () => {
      const props = getMenuItens();
      this.setProps({ menuitems: props.menuitems, activePath: store.getState().activePath });
    });

    this.addChildren({
      MenuItems: this.props.menuitems.map(
        (item: Props) =>
          new MenuItem(
            'li',
            {
              ...item,
              events: { click: this.ClickMenuItem },
              activePath: this.props.activePath,
            },
            'menuitem',
            MenuItemTpl,
            '1',
            { href: item.name }
          )
      ),
    });
  }

  ClickMenuItem(this: HTMLElement) {
    const path = window.location.pathname;
    const href = this.getAttribute('href');
    if (href) {
      if (href !== '/logout') {
        if (path !== href) {
          router.go(href);
        }
      } else {
        AuthCtr.logout();
      }
    }
  }

  render() {
    if (this.template !== null) {
      return this.compile(this.template, this.children);
    }
  }

  componentDidUpdate() {
    this.children.MenuItems = this.props.menuitems.map(
      (item: Props) =>
        new MenuItem(
          'li',
          {
            ...item,
            events: { click: this.ClickMenuItem },
            activePath: this.props.activePath,
          },
          'menuitem',
          MenuItemTpl,
          '1',
          { href: item.name }
        )
    );
    return true;
  }
}

export function MainMenu() {
  const myprops = getMenuItens();
  const activePath = store.getState().activePath;
  return new Menu('ul', { menuitems: myprops.menuitems, activePath }, 'mainmenu', MenuTPL);
}
