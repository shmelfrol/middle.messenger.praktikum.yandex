import {Children} from 'src/type_component';
import {Component} from "src/modules/Component";
import {Contacts} from "src/component/Contacts/Contacts";
import {props_contacts} from "src/Storage/PropsForContacts";
import ContactsTpl from "src/component/Contacts/Contacts.hbs";
import ChatPageTPl from "./ContactPageTpl.hbs"
import {store} from "src/Storage/store";
import {EVENTS} from "src/const/constsStore";

export class ContactsPage extends Component {
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
        MyaddEvents = null,
    ) {
        //myprops.contacts = myprops.contacts.map((contact)=>new ContactClass('div', contact, 'form-example', ContactTpl));
        myprops.contactlist = new Contacts("div", myprops, "itemtest", ContactsTpl)

        // передаю в родительский класс пропсы и тег
        super(tag, myprops, classofTag, template, MyaddEvents);

        store.on(EVENTS.UPDATE, () => {
            // пдписываемся на обновление компонента, передав данные из хранилища
            this.setProps(store.getState());
        });


    }



    componentDidUpdate(){
        Object.entries(this.children).forEach(([key, child]) => {
            this.children[key].setProps(this.props)
        });
        return true
    }


    render() {
        if (this.template !== null) {
            return this.compile(this.template, this.children);
        }
    }
}

export function getContactPage(){
    return new ContactsPage("div", props_contacts, "testmain", ChatPageTPl)
}