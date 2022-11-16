import myimg from '../../public/image/user.jpg';

export function ContactClick(el) {
    el.addEventListener('click', () => {
        alert('This is contact');
    });
}

// eslint-disable-next-line import/prefer-default-export
export const contacts = [
    {id: 0, user: 'IVAN', phone: '+7 909 909 90', img: myimg},
    {id: 0, user: 'Petr', phone: '+7 909 909 77', img: myimg},
];


export const props_contacts = {
    Contacts: {
        contacts: [
            {id: 0, user: 'IVAN', phone: '+7 909 909 90', img: myimg},
            {id: 0, user: 'Petr', phone: '+7 909 909 77', img: myimg},
        ],
        events: ContactClick
    }
};