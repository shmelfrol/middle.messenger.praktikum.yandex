import { validEl } from 'src/utility/valid';
import myimg from '../../public/image/user.jpg';

function ContactClick(el) {
  el.addEventListener('click', () => {
    alert('This is contact');
  });
}

// eslint-disable-next-line import/prefer-default-export
export const ContactsProps = {
  contacts: [
    {
      id: 0,
      user: 'IVAN',
      phone: '+7 909 909 90',
      img: myimg,
      events: ContactClick,
    },
    {
      id: 1,
      user: 'Petr',
      phone: '+7 909 909 90',
      img: myimg,
      events: ContactClick,
    },
    {
      id: 2,
      user: 'Sergey',
      phone: '+7 909 909 90',
      img: myimg,
      events: ContactClick,
    },
    {
      id: 3,
      user: 'vasya',
      phone: '+7 909 909 90',
      img: myimg,
      events: ContactClick,
    },
    {
      id: 4,
      user: 'Alex',
      phone: '+7 909 909 90',
      img: myimg,
      events: ContactClick,
    },
  ],
};
