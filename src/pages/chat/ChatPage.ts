import { AppComponent } from 'src/modules/AppComponent';
import { Props, Children } from 'src/type_component';
import LeftBlockChatTpl from '../../component/LeftBlockChat/LeftBlockChat.hbs';
import RightBlockChatTpl from '../../component/RightBlockChat/RightBlockChat.hbs';
import ChatBoxTpl from '../../component/ChatBox/ChatBox.hbs';
import ChatInputTpl from '../../component/ChatInput/ChatInput.hbs';
import ChatScrollTpl from '../../component/ChatScroll/ChatScroll.hbs';
import { propsChat } from './PropsChat';
import ChatItemTpl from '../../component/ChatItem/ChatItem.hbs';
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
