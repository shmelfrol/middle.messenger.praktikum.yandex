import {Children, Props} from 'src/type_component';
import InputTpl from './Input.hbs';
import {Component} from "src/modules/Component";
import {MyvalidateFields} from "src/utility/myvalidate";

export function focusout(this: HTMLDivElement, e:Event) {
    let target = e.target as HTMLInputElement
    console.log(this)
    if(target!==null ){
        let tagName = target.tagName
        let errordiv = this.querySelector('#errormessage');
        if(errordiv!==null){
            errordiv.textContent = ""
            if (tagName === "INPUT") {
                let error = MyvalidateFields(target.name, target.value)
                if (error !== null) {
                    errordiv.textContent = error
                }
            }
        }
    }
}


export class InPut extends Component {
    constructor(
        tag: string,
        myprops: Children,
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

    setInputVale(value:string){
        let input = this.getContent().querySelector("input")
        if(input){
            input.value=value
        }

    }

    getInputValue() {
        let input = this.getContent().querySelector("input")
        if (input) {
            if (input?.getAttribute("type") !== "submit") {
                let data:{ [key: string]: any }= {}

                if (input?.type === "file" && input.name) {
                    if(input.files!==null){
                        data[input.name] = input.files[0];
                    }
                } else {
                    if (input?.name) {
                        if (input?.value) {
                            data[input.name] = input.value
                        }
                    }
                }
                return data
            }
        }

    }


}

export default function input(props: Props) {
    return new InPut('div', props, 'form-example', InputTpl);
}
