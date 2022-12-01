import {Children} from 'src/type_component';
import {Component} from "src/modules/Component";
import ChatsPageTpl from "./ChatsPageTpl.hbs"
import {ChatsCtr} from "src/Controllers/ChatsController";
import {store} from "src/Storage/store";
import {EVENTS} from "src/const/constsStore";
import ChatInputTpl from "src/component/ChatInput/ChatInput.hbs";
import ChatTpl from "src/component/ChatItem/ChatItem.hbs";
import MessageTpl from "src/component/Message/Message.hbs";
import {ChatItem} from "src/component/ChatItem/ChatItem";
import {ChatClick, ChatScroll, ViewActiveChat, ChatikAdd, ViewHidenSearchUserDiv} from "src/events/ChatsEvents";
import {ChatInput} from "src/component/ChatInput/ChatInput";
import {Message} from "src/component/Message/Message";
import {AuthCtr} from "src/Controllers/AuthController";
import {createChatData} from "src/Storage/propsForms";
import {ChatAddForm} from "src/component/ChatAddForm/ChatAddForm";
import ChatAddFormTpl from "src/component/ChatAddForm/ChatAddForm.hbs"
import BtnAddChatUserTpl from "src/component/Button/Button.hbs"
import ContactTpl from "src/component/Contact/Contact.hbs";
import ChatContactTpl from "src/component/ChatContact/ChatContact.hbs"
import ChatContactsTpl from "src/pages/ChatsPage/parts/ChatContacts/ChatContactsTpl.hbs"
import ChatMessengesTpl from "src/pages/ChatsPage/parts/ChatMessenges/ChatMessengesTpl.hbs"
import {Button} from "src/component/Button/Button";
import {InPut} from "src/component/Input/Input";
import {addUsersToChat, ContactsSearch, delUsersFromChat} from "src/events/ContactsEvents";
import InputTpl from "src/component/Input/Input.hbs";
import {Contact} from "src/component/Contact/Contact";

import {ChatContact} from "src/component/ChatContact/ChatContact";
import {ChatContacts} from "src/pages/ChatsPage/parts/ChatContacts/ChatContacts";
import {ChatsMessenges} from "src/pages/ChatsPage/parts/ChatMessenges/ChatMessenges";

const SOCKET_WAS_CLOSED_CODE = 1000;
const SOCKET_CONNECTION_BREAK_CODE = 1006;


function BtnViewSearchUsers(ChatsPage, Component2, e) {
    e.preventDefault()
    let page = ChatsPage.getContent()
    let divForUsers = page.querySelector("#show")
    if (divForUsers.style.display === "") {
        divForUsers.style.display = 'none';
    } else {
        divForUsers.style.display = '';
    }
}

export class ChatsPage extends Component {
    private _socket = undefined

    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
    ) {
        myprops.ChatAddForm = new ChatAddForm('form', {
            forChildrens: myprops.forChildrens,
            events: {click: ChatikAdd}
        }, "form-example", ChatAddFormTpl)


        if (myprops.chats && myprops.chats.length !== 0) {
            myprops.chatList = myprops.chats.map((chat) => new ChatItem('div', {
                ...chat,
                events: {click: ChatClick}
            }, 'userchat', ChatTpl, chat.id));
        }

        //this is parts of ChatPage
        myprops.ChatsMessenges = new ChatsMessenges('div', {ActiveChat: myprops.ActiveChat}, "itemtest", ChatMessengesTpl)
        myprops.ChatContacts = new ChatContacts('div', {
            chatUsers: myprops.chatUsers,
            ActiveChat: myprops.ActiveChat
        }, "itemtest", ChatContactsTpl)

        // передаю в родительский класс пропсы и тег
        super(tag, myprops, classofTag, template);

        store.on(EVENTS.UPDATE, () => {
            // пдписываемся на обновление компонента, передав данные из хранилища
            this.setProps(store.getState());
        });
    }

    VisualEffects() {
        ViewActiveChat(this.getContent(), this.props)
        ChatScroll(this.getContent(), this.props)


    }

    componentDidMount() {
        ChatsCtr.getChatiks()
    }


    getActiveChat() {
        if (this.props.ActiveChat) {
            return this.props.ActiveChat
        }
    }

    getChatUsers() {
        if (this.props.chatUsers) {
            return this.props.chatUsers
        }
    }

    getIdsChatUsers() {
        let idsChatUsers = []
        if (this.props.chatUsers) {
            for (let i = 0; i < this.props.chatUsers.length; i++) {
                idsChatUsers[i] = this.props.chatUsers[i].id
            }
        }
        return idsChatUsers
    }


    componentDidUpdate(oldProps) {

        if (this.props.chats && this.props.chats.length !== 0) {
            this.children.chatList = this.props.chats.map((chat) => new ChatItem('div', {
                ...chat,
                events: {click: ChatClick.bind(this)}
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
        ChatsCtr.getChatiks()
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

    return new ChatsPage("div", {forChildrens: createChatData}, "testmain", ChatsPageTpl)
}