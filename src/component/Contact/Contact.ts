import { Children } from 'src/type_component';
import {Component} from "src/modules/Component";







export class Contact extends Component {
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
    ) {

        super(tag, myprops, classofTag, template);
        console.log("this.propsContact", this.props)
    }




    render() {
        if (this.template !== null) {
            return this.compile(this.template, this.props);
        }
    }
}


