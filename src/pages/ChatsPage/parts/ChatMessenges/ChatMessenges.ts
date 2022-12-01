import {Children} from 'src/type_component';
import {Component} from "src/modules/Component";
import {ChatsCtr} from "src/Controllers/ChatsController";
import {store} from "src/Storage/store";
import {EVENTS} from "src/const/constsStore";
import ChatInputTpl from "src/component/ChatInput/ChatInput.hbs";
import MessageTpl from "src/component/Message/Message.hbs";
import {ChatScroll} from "src/events/ChatsEvents";
import {ChatInput} from "src/component/ChatInput/ChatInput";
import {Message} from "src/component/Message/Message";


const SOCKET_WAS_CLOSED_CODE = 1000;
const SOCKET_CONNECTION_BREAK_CODE = 1006;




export class ChatsMessenges extends Component {
    private _socket = undefined

    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
    ) {
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

    }

    VisualEffects() {
        ChatScroll(this.getContent(), this.props)
    }


    resetDataWhenChatChanged() {
        if (this._socket) {
            this._socket?.close(SOCKET_WAS_CLOSED_CODE, 'Был открыт другой чат');
        }

    }

    componentDidUpdate(oldProps) {

        if (this.props.ActiveChat) {
            if (this.props.ActiveChat !== oldProps.ActiveChat) {
                this.resetDataWhenChatChanged();
                this.openSocket();
            }
        }

        if (this.props.messages && this.props.chats.length !== 0) {
            if (Array.isArray(this.props.messages)) {
                this.children.messageList = this.props.messages.map((mes) => new Message("p", mes, "userText", MessageTpl))
            }
        }

        return true
    }

    render() {

        this.children.ChatInput = new ChatInput("div", {
            events: {
                keydown: this.onSendBtnClick
            }
        }, "userInput", ChatInputTpl)


        let props = {...this.props, ...this.children}
        if (this.template !== null) {
            return this.compile(this.template, props);
        }
    }

    show() {
        if (this.getContent() !== undefined) {
            this.getContent().style.display = '';
        }
    }

    hide() {
        this.isShow = false
        this.getContent().style.display = 'none';
        this.resetDataWhenChatChanged()
        store.set('ActiveChat', null)
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

