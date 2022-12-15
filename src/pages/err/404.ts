import { Component } from 'src/modules/Component';
import { Props } from 'src/type_component';
import tpl from './404.hbs';

class Err extends Component {
  constructor(tag: string, myprops: Props, classofTag: string, template: Function) {
    super(tag, myprops, classofTag, template);
  }

  render() {
    if (this.template !== null) {
      return this.compile(this.template, this.props);
    }
  }
}

export function NotFoundPage() {
  const context = { title: 'Внимание ошибка: ' };
  return new Err('div', context, 'testmain', tpl);
}
