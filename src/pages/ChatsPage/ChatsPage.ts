import {Children} from 'src/type_component';
import {Component} from "src/modules/Component";
import {Chatlist} from "src/component/ChatList/Chatlist";
import {propsChat} from "src/pages/chat/PropsChat";
import ChatListTpl from "src/component/ChatList/Chatlist.hbs"
import {MessageList} from "src/component/MessageList/MessageList";
import MessageListTPL from "src/component/MessageList/MessageList.hbs"
import ChatsPageTpl from "./ChatsPageTpl.hbs"
import {ChatsCtr} from "src/Controllers/ChatsController";
import {store} from "src/Storage/store";
import {EVENTS} from "src/const/constsStore";


export class ChatsPage extends Component {
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
        MyaddEvents = null,
    ) {

        myprops.chatlist = new Chatlist("div", myprops.chats, "itemtest", ChatListTpl)
        myprops.messagelist = new MessageList("div", myprops.chats, "itemtest", MessageListTPL)
        // передаю в родительский класс пропсы и тег
        super(tag, myprops, classofTag, template, MyaddEvents);

        store.on(EVENTS.UPDATE, () => {
            // пдписываемся на обновление компонента, передав данные из хранилища
            this.setProps(store.getState());
        });
       console.log("dfjh")
        ChatsCtr.getChatiks()


    }
    componentDidUpdate(){
        Object.entries(this.children).forEach(([key, child]) => {
            this.children[key].setProps(this.props)
        });
        return true
    }
    render() {
        if (this.template !== null) {
            return this.compile(this.template, this.children);
        }
    }
}

export function getChatsPage() {

    return new ChatsPage("div", propsChat, "testmain", ChatsPageTpl)
}