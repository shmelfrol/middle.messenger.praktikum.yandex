import {Component} from "src/modules/Component";
import {Children} from "src/type_component";
import {ChatsCtr} from "src/Controllers/ChatsController";
import {UserCtr} from "src/Controllers/UserController";

const SOCKET_WAS_CLOSED_CODE = 1000;
 const SOCKET_CONNECTION_BREAK_CODE = 1006;


 function SendMessage(el, props){
     let input=el.querySelector("#textInput")
     console.log("")
     input.addEventListener('keydown', function(e) {

         if (e.keyCode === 13) {
             console.log("enter"+Math.random(), this.value)

             props._socket.send(JSON.stringify({
                 content: this.value,
                 type: 'message',
             }));
         }
     });

 }





export class MessageList extends Component {
    private _socket=undefined

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


    }

    AddEvents() {
        SendMessage(this.getContent(), this.props)
    }


    componentDidUpdate(){
        if(this.props.ActiveChat){
           this.openSocket()
        }
        return true;
}

    onSocketMessage(response){
        console.log("response", response)
        this.setProps({messages:response})
        console.log("propsafter", this.props)
    }
    onSocketClosed({ code }: { code: number }) {
        if (code === SOCKET_CONNECTION_BREAK_CODE) {
            this.openSocket();
        }
    }
    onSendBtnClick(){}
    onScrollMessage(){}
    resetDataWhenChatChanged(){}

    onSocketOpened(socket: WebSocket) {
        this.props._socket = socket;
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
            { chatId: this.props.ActiveChat },
            {
                onOpen: this.onSocketOpened,
                onMessage: this.onSocketMessage,
                onClose: this.onSocketClosed,
            }
        );
    }



    render() {
        if (this.template !== null) {
            return this.compile(this.template, this.props);
        }
    }
}