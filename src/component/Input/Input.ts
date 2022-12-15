import { Children, Props } from 'src/type_component';
import { Component } from 'src/modules/Component';
import { MyvalidateFields } from 'src/utility/myvalidate';
import InputTpl from './Input.hbs';

export function focusout(this: HTMLDivElement, e: Event) {
  const target = e.target as HTMLInputElement;
  if (target !== null) {
    const tagName = target.tagName;
    const errordiv = this.querySelector('#errormessage');
    if (errordiv !== null) {
      errordiv.textContent = '';
      if (tagName === 'INPUT') {
        const error = MyvalidateFields(target.name, target.value);
        if (error !== null) {
          errordiv.textContent = error;
        }
      }
    }
  }
}

export class InPut extends Component {
  constructor(tag: string, myprops: Children, classofTag: string, template: Function) {
    super(tag, myprops, classofTag, template);
  }

  render() {
    if (this.template !== null) {
      return this.compile(this.template, this.props);
    }
  }

  setInputVale(value: string) {
    const input = this.getContent().querySelector('input');
    if (input) {
      input.value = value;
    }
  }

  getInputValue() {
    const input = this.getContent().querySelector('input');
    if (input) {
      if (input?.getAttribute('type') !== 'submit') {
        const data: { [key: string]: any } = {};

        if (input?.type === 'file' && input.name) {
          if (input.files !== null) {
            data[input.name] = input.files[0];
          }
        } else if (input?.name) {
          if (input?.value) {
            data[input.name] = input.value;
          }
        }
        return data;
      }
    }
  }
}

export default function input(props: Props) {
  return new InPut('div', props, 'form-example', InputTpl);
}
