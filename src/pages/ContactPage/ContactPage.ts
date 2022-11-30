import {Children, Props} from 'src/type_component';
import {Component} from "src/modules/Component";
import ContactTpl from "src/component/Contact/Contact.hbs";
import ChatPageTPl from "./ContactPageTpl.hbs"
import {store} from "src/Storage/store";
import {EVENTS} from "src/const/constsStore";
import {Contact} from "src/component/Contact/Contact";
import {InPut} from "src/component/Input/Input";
import InputTpl from "src/component/Input/Input.hbs";
import {AddChat, ContactsSearch} from "src/events/ContactsEvents";
import {AuthCtr} from "src/Controllers/AuthController";


export class ContactsPage extends Component {
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
    ) {

        myprops.SearchInput = new InPut('div', {
            events: {
                keydown: ContactsSearch
            }
        }, 'form-example', InputTpl);
        myprops.newContacts = myprops.contacts.map((contact) => new Contact('div', {...contact, events:{click:AddChat}}, 'userchat', ContactTpl));

        // передаю в родительский класс пропсы и тег
        super(tag, myprops, classofTag, template);
        store.on(EVENTS.UPDATE, () => {
            console.log(store.getState())
            // пдписываемся на обновление компонента, передав данные из хранилища
            this.setProps({contacts:store.getState().contacts});
        });
        AuthCtr.getUser()

    }


    componentDidUpdate() {
        this.children.newContacts = this.props.contacts.map((contact) => new Contact('div', {...contact, events:{click:AddChat}}, 'userchat', ContactTpl));

        return true
    }


    render() {
        if (this.template !== null) {
            return this.compile(this.template, this.children);
        }
    }
}

export function getContactPage() {
    return new ContactsPage("div", {contacts:[]}, "testmain", ChatPageTPl)
}