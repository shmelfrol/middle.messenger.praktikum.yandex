import {Children, Props} from 'src/type_component';
import InputTpl from './Input.hbs';
import {Component} from "src/modules/Component";
import {MyvalidateFields} from "src/utility/myvalidate";

export function focusout(e) {
    let target = e.target.tagName
    let errordiv = this.querySelector('#errormessage');
    errordiv.textContent = ""
    if (target === "INPUT") {
        let error = MyvalidateFields(e.target.name, e.target.value)
        if (error !== null) {
            errordiv.textContent = error
        }
    }
}


export class InPut extends Component {
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

    getInputValue() {
        let input = this.getContent().querySelector("input")
        if (input) {
            if (input?.getAttribute("type") !== "submit") {
                let data = {}

                if (input?.type === "file") {
                    let file = input.files[0];
                    data[input.name] = input.files[0];
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
