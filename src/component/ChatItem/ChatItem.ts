import { Children } from 'src/type_component';
import {Component} from "src/modules/Component";







export class ChatItem extends Component {
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
        id:string
    ) {

        super(tag, myprops, classofTag, template, id);
    }
    
    render() {
        if (this.template !== null) {
            return this.compile(this.template, this.props);
        }
    }
}


