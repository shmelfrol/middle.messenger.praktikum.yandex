import {Children} from 'src/type_component';
import {Component} from "src/modules/Component";
import {Contacts} from "src/component/Contacts/Contacts";
import {props_contacts} from "src/Storage/PropsForContacts";
import ContactsTpl from "src/component/Contacts/Contacts.hbs";
import ChatPageTPl from "./ContactPageTpl.hbs"

export class ChatsPage extends Component {
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
        MyaddEvents = null,
    ) {
        //myprops.contacts = myprops.contacts.map((contact)=>new ContactClass('div', contact, 'form-example', ContactTpl));
        myprops.contactlist = new Contacts("div", myprops.Contacts, "itemtest", ContactsTpl)
        // передаю в родительский класс пропсы и тег
        super(tag, myprops, classofTag, template, MyaddEvents);
    }

    render() {
        if (this.template !== null) {
            return this.compile(this.template, this.children);
        }
    }
}

export function getChatsPage(){
    return new ContactsPage("div", props_contacts, "testmain", ChatsPageTPl)
}