import { Props } from 'src/type_component';
import { AppComponent } from '../../modules/AppComponent';
import InputTpl from './input.hbs';

export default function input(props:Props, InputEvents:Function) {
  return new AppComponent('div', props, 'form-example', InputTpl, InputEvents);
}
