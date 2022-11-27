import {ChatsCtr} from "src/Controllers/ChatsController";
import {store} from "src/Storage/store";


export function ChatClick(el, e){
    let target= e.target.tagName

    if(target==="BUTTON"){
        e.preventDefault()
        console.log("BUTTON DEL")
        let idChat=e.target.getAttribute("id")

        ChatsCtr.delete(idChat)
    }
    if(target==="DIV"){
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


/*
chat.addEventListener('click', function(e) {
    console.log("chatId", ChatId)
    ChatsCtr.ActiveChat(ChatId)
}*/
