import {Children, Props} from 'src/type_component';
import {Component} from "src/modules/Component";
import {FormFields} from "src/pages/forms/FormFields";
import {ChatikAdd} from "src/events/ChatsEvents";


export class ChatAddForm extends Component {
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
    ) {

        let children = FormFields({
            ...myprops, events: {
                click: ChatikAdd
            }
        })
        myprops={...myprops, ...children }


        super(tag, myprops, classofTag, template);
    }

    /*AddEvents() {
      InputEvents(this.getContent(), this.props)
    }*/

    render() {
        if (this.template !== null) {
            return this.compile(this.template, this.props);
        }
    }
}


