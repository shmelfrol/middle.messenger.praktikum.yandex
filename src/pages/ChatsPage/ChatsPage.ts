import {Children} from 'src/type_component';
import {Component} from "src/modules/Component";
import ChatsPageTpl from "./ChatsPageTpl.hbs"
import {ChatsCtr} from "src/Controllers/ChatsController";
import {store} from "src/Storage/store";
import {EVENTS} from "src/const/constsStore";
import ChatTpl from "src/component/ChatItem/ChatItem.hbs";
import {ChatItem} from "src/component/ChatItem/ChatItem";
import ChatContactsTpl from "src/pages/ChatsPage/parts/ChatContacts/ChatContactsTpl.hbs"
import ChatMessengesTpl from "src/pages/ChatsPage/parts/ChatMessenges/ChatMessengesTpl.hbs"
import {ChatContacts} from "src/pages/ChatsPage/parts/ChatContacts/ChatContacts";
import {ChatsMessenges} from "src/pages/ChatsPage/parts/ChatMessenges/ChatMessenges";
import {FormPage} from "src/pages/forms/Forms";


export class ChatsPage extends Component {


    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
    ) {


       // myprops.ChatsMessenges = new ChatsMessenges('div', {ActiveChat: myprops.ActiveChat}, "itemtest", ChatMessengesTpl)

        // передаю в родительский класс пропсы и тег
        super(tag, myprops, classofTag, template);


        this.addChildren({
            ChatAddForm: FormPage(),
            ChatContacts: new ChatContacts('div', {
                    chatUsers: this.props.chatUsers,
                    ActiveChat: this.props.ActiveChat
                },
                "itemtest", ChatContactsTpl),
            ChatsMessenges: new ChatsMessenges('div',
                {ActiveChat: myprops.ActiveChat},
                "itemtest", ChatMessengesTpl)
        })


        store.on(EVENTS.UPDATE, () => {
            // пдписываемся на обновление компонента, передав данные из хранилища
            this.setProps({chats: store.getState().chats, ActiveChat: store.getState().ActiveChat});
        });
    }


    componentDidMount() {
        //получаем чатики в момент монтирования
        ChatsCtr.getChatiks()
    }


    componentDidUpdate(oldProps) {

        if (this.props.chats && this.props.chats.length !== 0) {
            this.children.chatList = this.props.chats.map((chat) => new ChatItem('div', {
                ...chat,
                ActiveChat: this.props.ActiveChat
            }, 'userchat', ChatTpl, chat.id));
        }

        if (this.props.ActiveChat) {
            this.children.ChatsMessenges.show()
            this.children.ChatContacts.show()
        } else {
            this.children.ChatsMessenges.hide()
            this.children.ChatContacts.hide()
        }

        return true
    }

    render() {
        let props = {...this.props, ...this.children}
        if (this.template !== null) {
            return this.compile(this.template, props);
        }
    }

    show() {
       // ChatsCtr.getChatiks()
        if (this.getContent() !== undefined) {
            this.getContent().style.display = '';
        }
    }

    hide() {
        this.isShow = false
        this.getContent().style.display = 'none';
        store.set('ActiveChat', null)
    }


}

export function getChatsPage() {

    return new ChatsPage("div", {}, "testmain", ChatsPageTpl)
}