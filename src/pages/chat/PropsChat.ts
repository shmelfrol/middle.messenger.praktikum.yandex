import { Props } from 'src/type_component';
import img from '../../../public/image/user.jpg';

function Click(el: HTMLDivElement, props: Props) {
  el.querySelectorAll('a').forEach((item: any) => {
    item.addEventListener('click', props.events.click);
  });
}

export const propsChat: object = {
  chats: [
    {
      id: 0,
      user: 'IVAN',
      lastmessege: '1 какой-то текст',
      img,
      active: false,
      events: Click,
    },
    {
      id: 1,
      user: 'Petr',
      lastmessege: '2 какой-то текст',
      img,
      active: false,
      events: Click,
    },
    {
      id: 2,
      user: 'Sergey',
      lastmessege: '3 какой-то текст',
      img,
      active: false,
      events: Click,
    },
    {
      id: 3,
      user: 'vasya',
      lastmessege: '4 какой-то текст',
      img,
      active: false,
      events: Click,
    },
    {
      id: 4,
      user: 'Alex',
      lastmessege: '5 какой-то текст',
      img,
      active: false,
      events: Click,
    },
  ],
};
