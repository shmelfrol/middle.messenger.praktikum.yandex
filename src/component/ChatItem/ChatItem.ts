import { Children } from 'src/type_component';
import {Component} from "src/modules/Component";
import {ChatsCtr} from "src/Controllers/ChatsController";
import {store} from "src/Storage/store";








export class ChatItem extends Component {
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
        id:string
    ) {

        super(tag, myprops, classofTag, template, id);
        let events = {click: this.Click}
        this.SetEvents(events)
    }


    VisualEffects() {
        this.ViewActiveChat()
    }

   delChat(ChatId){
       ChatsCtr.delete(ChatId)
   }

   SetActiveChat(ChatId){
       store.set("ActiveChat", ChatId)
   }


    Click=(e)=>{
        let target = e.target.tagName
        let ChatId = this.getContent().getAttribute("id")
        e.preventDefault()
        if (target === "BUTTON") {
            this.delChat(ChatId)
        } else {
            this.SetActiveChat(ChatId)
        }
    }


    ViewActiveChat() {
        let ChatId = this.getContent().getAttribute("id")
                if (ChatId == this.props.ActiveChat) {
                    this.getContent().classList.add("userchatactive")
                } else {
                    this.getContent().classList.remove("userchatactive")
                }
    }




    
    render() {
        if (this.template !== null) {
            return this.compile(this.template, this.props);
        }
    }
}


