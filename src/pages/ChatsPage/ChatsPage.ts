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

import {Button} from "src/component/Button/Button";
import {InPut} from "src/component/Input/Input";
import {addUsersToChat, ContactsSearch, delUsersFromChat} from "src/events/ContactsEvents";
import InputTpl from "src/component/Input/Input.hbs";
import {Contact} from "src/component/Contact/Contact";

import {ChatContact} from "src/component/ChatContact/ChatContact";
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

        // передаю в родительский класс пропсы и тег
        super(tag, myprops, classofTag, template);
        this.openSocket = this.openSocket.bind(this);
        this.onSocketOpened = this.onSocketOpened.bind(this);
        this.onSocketMessage = this.onSocketMessage.bind(this);
        this.onSocketClosed = this.onSocketClosed.bind(this);
        this.onSendBtnClick = this.onSendBtnClick.bind(this);
        this.onScrollMessage = this.onScrollMessage.bind(this);
        this.resetDataWhenChatChanged = this.resetDataWhenChatChanged.bind(this);

        store.on(EVENTS.UPDATE, () => {
            // пдписываемся на обновление компонента, передав данные из хранилища
            this.setProps(store.getState());
        });
        AuthCtr.getUser()
    }

    VisualEffects() {
        ViewActiveChat(this.getContent(), this.props)
        ChatScroll(this.getContent(), this.props)


    }

    componentDidMount() {
        ChatsCtr.getChatiks()
        // ViewActiveChat(this.getContent(), this.props)
    }


    getActiveChat(){
        if(this.props.ActiveChat){
            return this.props.ActiveChat
        }
    }

    getChatUsers(){
        if(this.props.chatUsers){
            return this.props.chatUsers
        }
    }

    getIdsChatUsers(){
        let idsChatUsers=[]
        if(this.props.chatUsers){

            for(let i=0; i<this.props.chatUsers.length; i++){
                idsChatUsers[i]=this.props.chatUsers[i].id
            }
        }
        return idsChatUsers
    }


    resetDataWhenChatChanged() {
        if (this._socket) {
            this._socket?.close(SOCKET_WAS_CLOSED_CODE, 'Был открыт другой чат');
            //this.props.ActiveChat=""
        }

    }

    componentDidUpdate(oldProps) {
        //ViewHidenSearchUserDiv(this, this.props)



        if (this.props.ActiveChat) {
            if (this.props.ActiveChat !== oldProps.ActiveChat) {

                this.resetDataWhenChatChanged();
                this.openSocket();
            }
        }
        if (this.props.chats && this.props.chats.length !== 0) {
            this.children.chatList = this.props.chats.map((chat) => new ChatItem('div', {
                ...chat,
                events: {click: ChatClick.bind(this)}
            }, 'userchat', ChatTpl, chat.id));
        }
        if (this.props.messages && this.props.chats.length !== 0) {
            if (Array.isArray(this.props.messages)) {
                this.children.messageList = this.props.messages.map((mes) => new Message("p", mes, "userText", MessageTpl))
            }

        }

        this.children.ChatInput = new ChatInput("div", {
            events: {
                keydown: this.onSendBtnClick
            }
        }, "userInput", ChatInputTpl)

        this.children.BtnAddChatUser = new Button("div", {
            btn_name: "...", events: {
                click: BtnViewSearchUsers.bind(this, this)
            }
        }, "", BtnAddChatUserTpl)

        this.children.SearchInput = new InPut('div', {
            events: {
                keydown: ContactsSearch.bind(this, this)
            }
        }, 'form-example', InputTpl);

        this.children.newContacts = this.props.contacts.map((contact) => new Contact('div', {
            ...contact,
            events: {click: addUsersToChat.bind(this, this)}
        }, 'userchat', ContactTpl));

      if(this.props.ActiveChat !== oldProps.ActiveChat){
          ChatsCtr.getChatUsers(this.props.ActiveChat).then(res=>{
              console.log("CHATUSERS", res)
              this.setProps({chatUsers:res.users})
          })
      }


      if(this.props.chatUsers){
          this.children.ActiveChatUsers=this.props.chatUsers.map((user) => new ChatContact('div', {
              ...user,
              events: {click: delUsersFromChat.bind(this, this)}
          }, 'userchat', ChatContactTpl))
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
        this.resetDataWhenChatChanged()
        store.set('ActiveChat',null)
    }


    onSocketMessage(response) {
        if (Array.isArray(response)) {
            let newMesages = response.reverse()

            this.setProps({messages: newMesages})
        } else {
            let oneMes =
                {
                    isRead: true,
                    chatId: 3541,
                    time: response.time,
                    content: response.content,
                    id: response.id,
                    userId: response.userId,
                    type: "message",
                    isFromMe: true
                }
            let newArrMes = {messages: [...this.props.messages, oneMes]}
            this.setProps(newArrMes)
        }
    }

    onSocketClosed({code}: { code: number }) {
        if (code === SOCKET_CONNECTION_BREAK_CODE) {
            this.openSocket();
        }
    }

    onSendBtnClick(el, e) {
        let target = e.target.tagName;
        if (target == "INPUT") {
            if (e.keyCode === 13) {
                this._socket.send(JSON.stringify({
                    content: e.target.value,
                    type: 'message',
                }));
            }
        }


    }

    onScrollMessage() {
    }


    onSocketOpened(socket: WebSocket) {
        this._socket = socket;
        socket.send(
            JSON.stringify({
                content: '0',
                type: 'get old',
            })
        );
    }

    openSocket() {
        if (!this.props.ActiveChat) {
            return;
        }
        console.log("open socket", this.props.ActiveChat)
        ChatsCtr.createSocket(
            {chatId: this.props.ActiveChat},
            {
                onOpen: this.onSocketOpened,
                onMessage: this.onSocketMessage,
                onClose: this.onSocketClosed,
            }
        );
    }


}

export function getChatsPage() {

    return new ChatsPage("div", {forChildrens: createChatData}, "testmain", ChatsPageTpl)
}