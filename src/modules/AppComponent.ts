import { Props, Children } from 'src/type_component';
import { Component } from './Component';

export class AppComponent extends Component {
  constructor(tag:string, myprops:Children, classofTag:string, template:Function, MyaddEvents:Function|null = null) {
    // передаю в родительский класс пропсы и тег
    super(tag, myprops, classofTag, template, MyaddEvents);
  }

  AddEvents() {
    if (this.MyaddEvents) {
      this.MyaddEvents(this.getContent(), this.props);
    }
  }

  render() {
    // console.log('template!!!!', this.template)
    if (this.template !== null) {
      return this.compile(this.template, this.props);
    }
  }
}
