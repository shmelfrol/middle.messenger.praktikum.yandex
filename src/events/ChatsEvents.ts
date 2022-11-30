import {ChatsCtr} from "src/Controllers/ChatsController";
import {store} from "src/Storage/store";

const SOCKET_WAS_CLOSED_CODE = 1000;
const SOCKET_CONNECTION_BREAK_CODE = 1006;


export function ChatClick(Component, e) {
    let target = e.target.tagName

    if (target === "BUTTON") {
        e.preventDefault()
        console.log("BUTTON DEL")
        let idChat = e.target.getAttribute("id")

        ChatsCtr.delete(idChat)
        Component._socket?.close(SOCKET_WAS_CLOSED_CODE, 'Был открыт другой чат');
        Component.setProps({ActiveChat: "", messages: []})
        ChatsCtr.getChatiks()
    } else {
        let ChatId = Component.getContent().getAttribute("id")
        store.set("ActiveChat", ChatId)
    }
    if (target === "DIV") {

    }

}


export function ViewActiveChat(el, props) {

    let chats = el.querySelectorAll(".userchat")
    if (chats) {
        chats.forEach((chat) => {
            let ChatId = chat.getAttribute("id")
            if (ChatId == props.ActiveChat) {
                chat.classList.add("userchatactive")
            } else {
                chat.classList.remove("userchatactive")
            }
        })
    }
}


export function ChatScroll(el, props) {
    if (props.ActiveChat) {
        let Scroll = el.querySelector(".chat-bar-bottom")
        Scroll.scrollIntoView(true)
    }
}


export function ChatikAdd(Component, e) {
    let target = e.target.getAttribute("type")
    let el = Component.getContent()
    let title = el.querySelector('input[name=chatName]').value
    if (target === "submit") {
        e.preventDefault()
        ChatsCtr.createChatik(title).then(res => {
            //store.set("ActiveChat", res)
            ChatsCtr.getChatiks()
        })
    }

}

export function ViewHidenSearchUserDiv(Component, props){
    console.log("CONTACTS", props.contacts)
    if(props.contacts){
        if(props.contacts.length!==0){
            let page = Component.getContent()
            let divForUsers = page.querySelector("#show")
            console.log("page",divForUsers)
            divForUsers.style.display = 'block';
        }
    }
}


/*
chat.addEventListener('click', function(e) {
    console.log("chatId", ChatId)
    ChatsCtr.ActiveChat(ChatId)
}*/
