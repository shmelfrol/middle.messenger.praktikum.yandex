import {Component} from "src/modules/Component";
import {Children} from "src/type_component";




export class MessageList extends Component {
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