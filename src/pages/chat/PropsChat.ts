import { Props } from 'src/type_component';
import avatar from '../../../public/image/user.jpg';

function Click(el: HTMLDivElement, props: Props) {
  el.querySelectorAll('a').forEach((item: any) => {
    item.addEventListener('click', props.events.click);
  });
}

export const propsChat: object = {
  chats:{
    chats: [
      {
        id: 0,
        title: 'IVAN',
        unreadCount:1,
        avatar,
        active: false,
      },
      {
        id: 1,
        title: 'Petr',
        unreadCount:1,
        avatar,
        active: false,
      },
      {
        id: 2,
        title: 'Sergey',
        unreadCount:1,
        avatar,
        active: false,
      },
      {
        id: 3,
        title: 'vasya',
        unreadCount:1,
        avatar,
        active: false,
      },
    ],
    ActiveChat: 0
  }

};
