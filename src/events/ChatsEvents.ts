import {ChatsCtr} from "src/Controllers/ChatsController";
import {store} from "src/Storage/store";

const SOCKET_WAS_CLOSED_CODE = 1000;
const SOCKET_CONNECTION_BREAK_CODE = 1006;


export function ChatClick(Component, e){
    let target= e.target.tagName

    if(target==="BUTTON"){
        e.preventDefault()
        console.log("BUTTON DEL")
        let idChat=e.target.getAttribute("id")

        ChatsCtr.delete(idChat)
        Component._socket?.close(SOCKET_WAS_CLOSED_CODE, 'Был открыт другой чат');
        Component.setProps({ActiveChat:"", messages:[]})
        ChatsCtr.getChatiks()
    }
    if(target==="DIV"){
        console.log("THISSSSSSSSS",Component)
        console.log(e.target)
        let ChatId=e.target.querySelector("span").getAttribute("id")
        store.set("ActiveChat", ChatId)
    }

}


export function ViewActiveChat(el, props){

    let chats=el.querySelectorAll(".userchat")
    if(chats){
        chats.forEach((chat)=>{
            let ChatId=chat.querySelector("span").getAttribute("id")
            if(ChatId==props.ActiveChat){
                chat.classList.add("userchatactive")
            }else{
                chat.classList.remove("userchatactive")
            }
        })
    }
}


export function ChatScroll(el, props){
    if(props.ActiveChat){

       let Scroll= el.querySelector(".chat-bar-bottom")
        console.log("Scroll", Scroll)
        Scroll.scrollIntoView(true)
    }
}


/*
chat.addEventListener('click', function(e) {
    console.log("chatId", ChatId)
    ChatsCtr.ActiveChat(ChatId)
}*/
