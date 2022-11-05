import {contact} from "../../component/contact/contact";
import {contacts_props} from "./contacts_props";
import contact_page from "./contact_page.hbs"
import {AppComponent} from "../../modules/AppComponent"

import contact_block from './contact_block.hbs'

export function contact_page1(){
   const contact1=contact(contacts_props.contacts[0])
   const contact2=contact(contacts_props.contacts[1])
   const block=new AppComponent("div" ,{contact1:contact1, contact2:contact2}, 'itemtest', contact_block)
   return new AppComponent('div', {block:block}, 'testmain', contact_page)
}
