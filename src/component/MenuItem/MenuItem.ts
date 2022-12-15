import { Children } from 'src/type_component';
import { Component } from 'src/modules/Component';

export class MenuItem extends Component {
  constructor(tag: string, myprops: Children, classofTag: string, template: Function, id: string, attribute: {}) {
    super(tag, myprops, classofTag, template, id, attribute);
  }

  VisualEffects() {
    const item = this.getContent();
    const path = this.props.activePath;
    const classes = item.classList;
    for (let a = 0; a < classes.length; a++) {
      if (classes[a] === 'active') {
        item.classList.remove('active');
      }
      const href = item.getAttribute('href');
      if (href === path) {
        item.classList.add('active');
      }
    }
  }

  render() {
    if (this.template !== null) {
      return this.compile(this.template, this.props);
    }
  }
}
