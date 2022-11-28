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
import {ChatClick, ChatScroll, ViewActiveChat} from "src/events/ChatsEvents";
import {ChatInput} from "src/component/ChatInput/ChatInput";
import {Message} from "src/component/Message/Message";
import {AuthCtr} from "src/Controllers/AuthController";



const SOCKET_WAS_CLOSED_CODE = 1000;
const SOCKET_CONNECTION_BREAK_CODE = 1006;


export class ChatsPage extends Component {
    private _socket=undefined
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
    ) {
        if (myprops.chats && myprops.chats.length !== 0) {
            myprops.chatList = myprops.chats.map((chat) => new ChatItem('div', {
                ...chat,
                events: {click: ChatClick}
            }, 'userchat', ChatTpl));
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


    resetDataWhenChatChanged(){
        console.log("close socket")
        this._socket?.close(SOCKET_WAS_CLOSED_CODE, 'Был открыт другой чат');
    }

    componentDidUpdate(oldProps) {
        console.log("oldProps", oldProps)
        if(this.props.ActiveChat){
            if (this.props.ActiveChat !== oldProps.ActiveChat) {

                this.resetDataWhenChatChanged();
                this.openSocket();
            }
        }
        if (this.props.chats && this.props.chats.length !== 0) {
            this.children.chatList = this.props.chats.map((chat) => new ChatItem('div', {
                ...chat,
                events: {click: ChatClick.bind(this)}
            }, 'userchat', ChatTpl));
        }
        if(this.props.messages && this.props.chats.length !== 0){
            if(Array.isArray(this.props.messages)){
                //console.log("MESSAGES______________________________", this.props.messages)
                this.children.messageList=this.props.messages.map((mes)=> new Message("p", mes, "userText", MessageTpl))
            }

        }

        this.children.ChatInput = new ChatInput("div", {
            events: {
                keydown: this.onSendBtnClick
            }
        }, "userInput", ChatInputTpl)
        return true
    }

    render() {
        if (this.template !== null) {
            return this.compile(this.template, this.children);
        }
    }

    show() {
        ChatsCtr.getChatiks()

        if (this.getContent() !== undefined) {
            this.getContent().style.display = '';
        }
    }

    onSocketMessage(response){
        console.log("Active_chat", this.props.ActiveChat)
        console.log("MESSAGES", response)
        if(Array.isArray(response)){
            let newMesages=response.reverse()

            this.setProps({messages:newMesages})
        }else{
            console.log("MESSAGES", response)
            let oneMes=
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
            let newArrMes={messages:[...this.props.messages, oneMes]}
            this.setProps(newArrMes)
        }



        console.log("propsafter_sETpROPS_MESSAGES", this.props)
    }
    onSocketClosed({ code }: { code: number }) {
        if (code === SOCKET_CONNECTION_BREAK_CODE) {
            this.openSocket();
        }
    }
    onSendBtnClick(el, e){
        let target=e.target.tagName;
        if(target=="INPUT"){
            if (e.keyCode === 13) {
                console.log("INPUT____________________________", e.target.value)
                this._socket.send(JSON.stringify({
                    content: e.target.value,
                    type: 'message',
                }));
            }
        }




    }
    onScrollMessage(){}


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
        console.log("open socket")
        ChatsCtr.createSocket(
            { chatId: this.props.ActiveChat },
            {
                onOpen: this.onSocketOpened,
                onMessage: this.onSocketMessage,
                onClose: this.onSocketClosed,
            }
        );
    }





}

export function getChatsPage() {

    return new ChatsPage("div", {}, "testmain", ChatsPageTpl)
}