import { Children } from 'src/type_component';
import {Component} from "src/modules/Component";
import {ChatsCtr} from "src/Controllers/ChatsController";
import {store} from "src/Storage/store";








export class ChatItem extends Component {
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: Function,
        id:string
    ) {

        super(tag, myprops, classofTag, template, id);
        let events = {click: this.Click}
        this.SetEvents(events)
    }


    VisualEffects() {
        this.ViewActiveChat()
    }

   delChat(ChatId:string){

       ChatsCtr.delete(ChatId)
   }

   SetActiveChat(ChatId:string){
       store.set("ActiveChat", ChatId)
   }


    Click=(e:Event)=>{
        let target = e.target as HTMLElement
        let tagName = target.tagName
        let ChatId = this.getContent().getAttribute("id")
        e.preventDefault()
        if(ChatId){
            if (tagName === "BUTTON") {
                this.delChat(ChatId)
            } else {
                this.SetActiveChat(ChatId)
            }
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


