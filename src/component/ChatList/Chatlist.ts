import { Children } from 'src/type_component';
import {Component} from "src/modules/Component";

import {ChatsCtr} from "src/Controllers/ChatsController";



function ChatClick(el, props) {
    let btns=el.querySelectorAll('button')
    if(btns!==null){
        btns.forEach((button)=>{
            button.addEventListener('click', function(e) {
                let id=button.getAttribute("id");
                console.log("id:", id)
                ChatsCtr.delete(id)

            });
        })


    }

   let chats=el.querySelectorAll(".userchat")
    if(chats){
        chats.forEach((chat)=>{
            console.log("propsACtive!!!!!!!!!!!!!!!!!", props.ActiveChat)


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

        myprops.events=ChatClick
        super(tag, myprops, classofTag, template);



    }

    render() {
        if (this.template !== null) {
            return this.compile(this.template, this.props);
        }
    }
}


