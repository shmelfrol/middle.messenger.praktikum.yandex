import { Props, Children } from '../../type_component';
import LeftBlockChatTpl from '../../component/leftblockchat/leftblock.hbs';
import RightBlockChatTpl from '../../component/rightblockchat/rightblockchat.hbs';
import ChatBoxTpl from '../../component/chatbox/chatbox.hbs';
import ChatInputTpl from '../../component/chatinput/chatinput.hbs';
import ChatScrollTpl from '../../component/chatscroll/chatscrol.hbs';
import { AppComponent } from '../../modules/AppComponent';
import { propschat } from './propschat';
import ChatItemTpl from '../../component/chatitem/chatitem.hbs';
import ChatTpl from './chatik.hbs';

function MyaddEvents(el:HTMLDivElement, props:Props) {
  el.querySelectorAll('a').forEach((item:any) => {
    item.addEventListener('click', props.events.click);
  });
}

export default function chatik() {
  const tag = 'div';
  // leftblock
  const chatitem1:AppComponent = new AppComponent(tag, propschat.chats[0], '', ChatItemTpl, MyaddEvents);
  const chatitem2:AppComponent = new AppComponent(tag, propschat.chats[1], '', ChatItemTpl, MyaddEvents);

  const LeftBlockChatProps:Children = { chatitem1, chatitem2 };
  const leftblockchat:AppComponent = new AppComponent('div', LeftBlockChatProps, 'itemtest', LeftBlockChatTpl);

  // rightblock
  const ChatBoxProps:Props = { text: 'testing test' };
  const chatbox:AppComponent = new AppComponent('div', ChatBoxProps, 'testformessage', ChatBoxTpl);

  const ChatInputProps:Props = { text: "Tap 'Enter' to send a message", events: { click: () => { alert('click'); } } };
  const chatinput:AppComponent = new AppComponent('div', ChatInputProps, 'testforbtn', ChatInputTpl);

  const ChatScrollProps:Props = { text: 'chatscroll' };
  const chatscroll:AppComponent = new AppComponent('div', ChatScrollProps, 'chat-bar-bottom', ChatScrollTpl);

  const RightBlockChatProps:Children = { chatbox, chatscroll, chatinput };
  const rightblockchat:AppComponent = new AppComponent('div', RightBlockChatProps, 'itemtest', RightBlockChatTpl);

  return new AppComponent(
    'div',
    { leftblockchat, rightblockchat },
    'testmain',
    ChatTpl,
  );
}

/*
let newprops ={...propschat.chats[0]}
newprops.lastmessege="Бугага"
console.log('newprops', newprops)
setTimeout(() => {
    chatitem1.setProps(newprops);
}, 5000); */
