import { Children } from 'src/type_component';
import { Component } from './Component';

export class ContactsClass extends Component {
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
        MyaddEvents = null,
    ) {

 this.children=


        // передаю в родительский класс пропсы и тег
        super(tag, myprops, classofTag, template, MyaddEvents);
    }

    render() {
        if (this.template !== null) {
            return this.compile(this.template, this.props);
        }
    }
}
