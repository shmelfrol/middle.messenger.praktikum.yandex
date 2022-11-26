import {Children, Props} from 'src/type_component';
import InputTpl from './Input.hbs';
import {Component} from "src/modules/Component";
import {InputEvents} from "src/events/authEvents";

export class InPut extends Component {
  constructor(
      tag: string,
      myprops: Children,
      classofTag: string,
      template: string,
  ) {
    super(tag, myprops, classofTag, template);
  }

  /*AddEvents() {
    InputEvents(this.getContent(), this.props)
  }*/

  render() {
    if (this.template !== null) {
      return this.compile(this.template, this.props);
    }
  }
}

export default function input(props: Props) {
   return new InPut('div', props, 'form-example', InputTpl);
}
