import {Children, Props} from 'src/type_component';
import {Component} from "src/modules/Component";
import {ChatsCtr} from "src/Controllers/ChatsController";
import {store} from "src/Storage/store";
import {EVENTS} from "src/const/constsStore";
import ChatInputTpl from "src/component/ChatInput/ChatInput.hbs";
import MessageTpl from "src/component/Message/Message.hbs";
import {ChatInput} from "src/component/ChatInput/ChatInput";
import {Message} from "src/component/Message/Message";


const SOCKET_WAS_CLOSED_CODE = 1000;
const SOCKET_CONNECTION_BREAK_CODE = 1006;

export type TNewMessageResponse = {
    content: string;
    type: string;
    time: string;
    userId: number;
    id: number;
    isFromMe: boolean;
};


export class ChatsMessenges extends Component {
    //private _socket = undefined
    _socket?: WebSocket;
    private _ChatUsers: []|null =null


    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: Function,
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
            this.setProps({ActiveChat:store.getState().ActiveChat});
        });

    }

    VisualEffects() {
        this.ChatScroll()
    }


  ChatScroll() {
        if (this.props.ActiveChat) {
            let Scroll = this.getContent().querySelector(".chat-bar-bottom")
            if(Scroll){
                Scroll.scrollIntoView(true)
            }

        }
    }

    resetDataWhenChatChanged() {
        if (this._socket) {
            this._socket?.close(SOCKET_WAS_CLOSED_CODE, 'Был открыт другой чат');
        }

    }

    componentDidUpdate(oldProps:Props) {
        if (this.props.ActiveChat) {
            if (this.props.ActiveChat !== oldProps.ActiveChat) {
                this.resetDataWhenChatChanged();
                this.openSocket();
            }
        }
        if (this.props.messages) {
            if (Array.isArray(this.props.messages)) {
                this.children.messageList = this.props.messages.map((mes) => {
                    let classOfTag= mes.isFromMe ? "userText" : "botText"
                    return new Message("p", mes, classOfTag, MessageTpl)})
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


    getChatUserbyId(userId:number) {
        let findUser:Props = {}
        if(this._ChatUsers){
            this._ChatUsers.forEach((user:Props) => {
                if (user.id === userId) {
                    findUser = user
                }
            })
        }

        return findUser


    }


    async CorrectFormatMess(messeges:Props) {
        await ChatsCtr.getChatUsers(this.props.ActiveChat).then((r) => {
            this._ChatUsers = r.users
            return r.users
        })
        for (let i = 0; i < messeges.length; i++) {
            Object.keys(messeges[i]).forEach((key) => {
                if (key === "time") {
                    let slicidate = messeges[i][key].slice(0, 16)
                    const y = new Date(slicidate).toLocaleDateString();
                    let t = new Date(slicidate).toLocaleTimeString();
                    let correctTime = y + " " + t
                    messeges[i][key] = correctTime
                }
                if (key === "userId") {
                    let user = this.getChatUserbyId(messeges[i][key])
                    messeges[i].login = user.login
                }
            })
        }
        return messeges
    }


    onSocketMessage(response:TNewMessageResponse) {
        let newArrMes:Props = []
        if (Array.isArray(response)) {
            newArrMes = response.reverse()
            this.CorrectFormatMess(newArrMes).then((correctMes)=>{
                this.setProps({messages: correctMes})
            })


        } else {
            if(response.type!=="user connected"){
                newArrMes = [response]
            }

            this.CorrectFormatMess(newArrMes).then((correctMes)=>{
                // @ts-ignore
                this.setProps({messages: [...this.props.messages, ...correctMes]})
            })
        }





    }

    onSocketClosed({code}: { code: number }) {
        if (code === SOCKET_CONNECTION_BREAK_CODE) {
            this.openSocket();
        }
    }

    onSendBtnClick=(e:KeyboardEvent)=> {
        console.log("tape")
        let target = e.target as HTMLInputElement;
        let tag=target.tagName
        if (tag == "INPUT") {
            if (e.keyCode === 13) {
                // @ts-ignore
                this._socket.send(JSON.stringify({
                    content: target.value,
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

