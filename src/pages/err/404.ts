import tpl from './404.hbs';
import {Component} from "src/modules/Component";
import {Props} from "src/type_component";

export class Err extends Component {
  constructor(
      tag: string,
      myprops: Props,
      classofTag: string,
      template: Function,
  ) {
    super(tag, myprops, classofTag, template);
  }


  render() {
    if (this.template !== null) {
      return this.compile(this.template, this.props);
    }
  }
}






export default function () {
  const context = { title: 'Внимание ошибка: ' };
  return new Err("div", context, "testmain", tpl)
}
