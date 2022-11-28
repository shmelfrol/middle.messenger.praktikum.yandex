import {Children} from 'src/type_component';
import {Component} from "src/modules/Component";


export class ChatInput extends Component {
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
}


