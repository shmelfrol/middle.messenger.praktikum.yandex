import { AppComponent } from 'src/modules/AppComponent';
import contact from './/Contact';
import { ContactsProps } from './ContactsProps';
import ContactPageTpl from './ContactPage.hbs';


export default function ContactPage() {
  const contact1 = contact(ContactsProps.contacts[0]);
  const contact2 = contact(ContactsProps.contacts[1]);
  return new AppComponent('div', { contact1, contact2 }, 'testmain', ContactPageTpl);
}
