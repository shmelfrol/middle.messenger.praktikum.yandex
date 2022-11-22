import { Children } from 'src/type_component';
import {Component} from "src/modules/Component";


export class NavbarItems extends Component {
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
        MyaddEvents = null,
    ) {
        super(tag, myprops, classofTag, template, MyaddEvents);
    }

    render() {
        if (this.template !== null) {
            return this.compile(this.template, this.props);
        }
    }
}


