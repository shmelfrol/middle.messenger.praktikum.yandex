import { Props } from 'src/type_component';
import { AppComponent } from '../../modules/AppComponent';
import ButtonTpl from './button.hbs';

export default function button(ButtonLoginProps:Props) {
  return new AppComponent('div', ButtonLoginProps, 'form-example', ButtonTpl);
}
