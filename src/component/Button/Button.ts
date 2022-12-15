import { Children, Props } from 'src/type_component';
import { Component } from 'src/modules/Component';
import ButtonTpl from './Button.hbs';

export class Button extends Component {
  constructor(tag: string, myprops: Children, classofTag: string, template: Function) {
    super(tag, myprops, classofTag, template);
  }

  render() {
    if (this.template !== null) {
      return this.compile(this.template, this.props);
    }
  }
}

export default function button(ButtonLoginProps: Props) {
  return new Button('div', ButtonLoginProps, 'form-example', ButtonTpl);
}
