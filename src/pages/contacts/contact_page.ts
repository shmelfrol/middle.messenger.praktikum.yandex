import contact from '../../component/contact/contact';
import { ContactsProps } from './contacts_props';
import ContactPageTpl from './contact_page.hbs';
import { AppComponent } from '../../modules/AppComponent';

import ContactBlockTpl from './contact_block.hbs';

export default function ContactPage() {
  const contact1 = contact(ContactsProps.contacts[0]);
  const contact2 = contact(ContactsProps.contacts[1]);
  const block = new AppComponent('div', { contact1, contact2 }, 'itemtest', ContactBlockTpl);
  return new AppComponent('div', { block }, 'testmain', ContactPageTpl);
}
