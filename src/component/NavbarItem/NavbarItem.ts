import { Props } from 'src/type_component';
import { AppComponent } from 'src/modules/AppComponent';
import NavbarItemTpl from './NavbarItem.hbs';

export default function NavbarItem(props:Props, NavItemEvents:Function) {
  return new AppComponent('div', props, '', NavbarItemTpl, NavItemEvents);
}
