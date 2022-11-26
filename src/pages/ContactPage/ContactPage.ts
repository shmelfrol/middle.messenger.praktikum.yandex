import {Children, Props} from 'src/type_component';
import {Component} from "src/modules/Component";
import {Contacts} from "src/component/Contacts/Contacts";
import {props_contacts} from "src/Storage/PropsForContacts";
import ContactsTpl from "src/component/Contacts/Contacts.hbs";
import ContactTpl from "src/component/Contact/Contact.hbs";
import ChatPageTPl from "./ContactPageTpl.hbs"
import {store} from "src/Storage/store";
import {EVENTS} from "src/const/constsStore";
import {Contact} from "src/component/Contact/Contact";
import button from "src/component/Button/Button";
import input, {InPut} from "src/component/Input/Input";
import InputTpl from "src/component/Input/Input.hbs";
import {ContactsSearch} from "src/events/ContactsEvents";


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
        myprops.newContacts = myprops.contacts.map((contact) => new Contact('div', {...contact, events:{click:()=>{console.log("CONTACT")}}}, 'userchat', ContactTpl));
        console.log("myprops.newContacts", myprops)


        //myprops.contactlist = new Contacts("div", {contacts:myprops.contacts}, "itemtest", ContactsTpl);
        // console.log("myprops.contactlist", myprops.contactlist)
        /*  myprops.newContacts=[
              new Contact('div', {avatar:null, id:0, login:"cfghfgh", phone:"5675676", firstName:"Firsgtfjhghj"}, 'userchat', ContactTpl),
              new Contact('div', {avatar:null, id:0, login:"cfghfgh", phone:"5675676", firstName:"Firsgtfjhghj"}, 'userchat', ContactTpl),
          ]*/

        // передаю в родительский класс пропсы и тег
        super(tag, myprops, classofTag, template);
        console.log("PROPS!!!!!!!!!!!!!!!!!!!!!!", this.props)
        store.on(EVENTS.UPDATE, () => {
            // пдписываемся на обновление компонента, передав данные из хранилища
            this.setProps({contacts:store.getState().contacts});
        });


    }


    componentDidUpdate() {
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

export function getContactPage() {
    return new ContactsPage("div", props_contacts, "testmain", ChatPageTPl)
}