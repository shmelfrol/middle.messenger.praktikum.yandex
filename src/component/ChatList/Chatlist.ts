import { Children } from 'src/type_component';
import {Component} from "src/modules/Component";

import {ChatsCtr} from "src/Controllers/ChatsController";
import {InputEvents} from "src/events/authEvents";



function ChatClick(el, props) {
    let btns=el.querySelectorAll('button')
    if(btns!==null){
        btns.forEach((button)=>{
            button.addEventListener('click', function(e) {
                let id=button.getAttribute("id");
                ChatsCtr.delete(id)
            });
        })
    }

   let chats=el.querySelectorAll(".userchat")
    if(chats){
        chats.forEach((chat)=>{
            let ChatId=chat.getAttribute("id")
            if(ChatId===props.ActiveChat){
                chat.classList.add("userchatactive")
            }
            chat.addEventListener('click', function(e) {
                console.log("chatId", ChatId)
                ChatsCtr.ActiveChat(ChatId)
            })
        })
    }



}








export class Chatlist extends Component {
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
    ) {
        super(tag, myprops, classofTag, template);
    }

    AddEvents() {
        ChatClick(this.getContent(), this.props)
    }
    render() {
        if (this.template !== null) {
            return this.compile(this.template, this.props);
        }
    }
}


