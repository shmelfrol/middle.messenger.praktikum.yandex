import { Children } from 'src/type_component';
import {Component} from "src/modules/Component";


export class MenuItem extends Component {
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
        id: string,
        attribute:{}
    ) {
        super(tag, myprops, classofTag, template, id, attribute);
    }


    render() {
        if (this.template !== null) {
            return this.compile(this.template, this.props);
        }
    }
}


