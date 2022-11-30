import {Children, Props} from 'src/type_component';
import { AppComponent } from 'src/modules/AppComponent';
import ButtonTpl from './Button.hbs';
import {Component} from "src/modules/Component";



export class Button extends Component {

  private  _show=false

  constructor(
      tag: string,
      myprops: Children,
      classofTag: string,
      template: string,
  ) {
    super(tag, myprops, classofTag, template);
  }


  render() {
    if (this.template !== null) {
      return this.compile(this.template, this.props);
    }
  }
  setShow(){
    if(this._show===false){
      this._show=true
    }else{this._show=false}

  }
  getShow(){
    console.log(this._show)
    return this._show
  }


}


export default function button(ButtonLoginProps: Props) {
  return new AppComponent('div', ButtonLoginProps, 'form-example', ButtonTpl);
}
