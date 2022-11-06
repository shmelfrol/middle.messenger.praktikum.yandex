import { Props } from 'src/type_component';
import { AppComponent } from '../../modules/AppComponent';
import NavbarItemTpl from './navbar_item.hbs';

export default function NavbarItem(props:Props, NavItemEvents:Function) {
  return new AppComponent('div', props, '', NavbarItemTpl, NavItemEvents);
}
