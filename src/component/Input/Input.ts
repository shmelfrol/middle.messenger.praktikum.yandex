import { Props } from 'src/type_component';
import { AppComponent } from 'src/modules/AppComponent';
import InputTpl from './Input.hbs';

export default function input(props: Props) {
  return new AppComponent('div', props, 'form-example', InputTpl);
}
