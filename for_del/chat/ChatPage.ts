import { AppComponent } from 'src/modules/AppComponent';
import { Props, Children } from 'src/type_component';
import LeftBlockChatTpl from '../LeftBlockChat/LeftBlockChat.hbs';
import RightBlockChatTpl from '../RightBlockChat/RightBlockChat.hbs';
import ChatBoxTpl from 'src/../ChatBox/chatbox.hbs';
import ChatInputTpl from 'src/../ChatInput/ChatInput.hbs';
import ChatScrollTpl from 'src/../ChatScroll/ChatScroll.hbs';
import { propsChat } from 'src/Storage/PropsChat';
import ChatItemTpl from 'src/component/ChatItem/ChatItem.hbs';
import ChatTpl from './Chat.hbs';

export default function Chat() {
  const tag = 'div';
  // leftblock
  const chatitem1: AppComponent = new AppComponent(
    tag,
    propsChat.chats[0],
    '',
    ChatItemTpl
  );

  const newprops = { ...propsChat.chats[0] };
  newprops.lastmessege = 'Бугага';
  setTimeout(() => {
    chatitem1.setProps(newprops);
  }, 5000);

  const chatitem2: AppComponent = new AppComponent(
    tag,
    propsChat.chats[1],
    '',
    ChatItemTpl
  );

  const LeftBlockChatProps: Children = { chatitem1, chatitem2 };
  const leftblockchat: AppComponent = new AppComponent(
    'div',
    LeftBlockChatProps,
    'itemtest',
    LeftBlockChatTpl
  );

  // rightblock
  const ChatBoxProps: Props = { text: 'testing test' };
  const chatbox: AppComponent = new AppComponent(
    'div',
    ChatBoxProps,
    'testformessage',
    ChatBoxTpl
  );

  const ChatInputProps: Props = {
    text: "Tap 'Enter' to send a message",
    events: () => {
      console.log('send message');
    },
  };
  const chatinput: AppComponent = new AppComponent(
    'div',
    ChatInputProps,
    'testforbtn',
    ChatInputTpl
  );

  const ChatScrollProps: Props = { text: 'chatscroll' };
  const chatscroll: AppComponent = new AppComponent(
    'div',
    ChatScrollProps,
    'chat-bar-bottom',
    ChatScrollTpl
  );

  const RightBlockChatProps: Children = { chatbox, chatscroll, chatinput };
  const rightblockchat: AppComponent = new AppComponent(
    'div',
    RightBlockChatProps,
    'itemtest',
    RightBlockChatTpl
  );

  return new AppComponent(
    'div',
    { leftblockchat, rightblockchat },
    'testmain',
    ChatTpl
  );
}
