import {Children, Props} from 'src/type_component';
import {Component} from "src/modules/Component";
import ContactTpl from "src/component/Contact/Contact.hbs";
import ChatPageTPl from "./ContactPageTpl.hbs"
import {store} from "src/Storage/store";
import {EVENTS} from "src/const/constsStore";
import {Contact} from "src/component/Contact/Contact";
import {InPut} from "src/component/Input/Input";
import InputTpl from "src/component/Input/Input.hbs";
import {AddChat, addUsersToChat, ContactsSearch, delUsersFromChat} from "src/events/ContactsEvents";
import {ChatContact} from "src/component/ChatContact/ChatContact";
import ChatContactTpl from "src/component/ChatContact/ChatContact.hbs";
import {ChatsCtr} from "src/Controllers/ChatsController";


export class ChatContacts extends Component {
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
    ) {
       console.log("ChatCotactsProps", myprops)






        // передаю в родительский класс пропсы и тег
        super(tag, myprops, classofTag, template);
        store.on(EVENTS.UPDATE, () => {
            console.log("STOREEEEEEEEEEEEEEEEEEE",store.getState())
            //{contacts:store.getState().contacts, ActiveChat: store.getState().ActiveChat}
            // пдписываемся на обновление компонента, передав данные из хранилища
            this.setProps({contacts:store.getState().contacts, ActiveChat: store.getState().ActiveChat});
        });


    }

    getIdsChatUsers(){
        let idsChatUsers=[]
        if(this.props.chatUsers){

            for(let i=0; i<this.props.chatUsers.length; i++){
                idsChatUsers[i]=this.props.chatUsers[i].id
            }
        }
        return idsChatUsers
    }

    componentDidUpdate(oldProps) {
        console.log("_________________________________________________________________________________", oldProps)
        if(this.props.ActiveChat !== oldProps.ActiveChat){
            ChatsCtr.getChatUsers(this.props.ActiveChat).then(res=>{
                console.log("CHATUSERS", res)
                this.setProps({chatUsers:res.users})
            })
        }


        this.children.newContacts = this.props.contacts.map((contact) => new Contact('div', {
            ...contact,
            events: {click: addUsersToChat.bind(this, this)}
        }, 'userchat', ContactTpl));

        return true
    }


    render() {
        if(this.props.chatUsers){
            this.children.ActiveChatUsers=this.props.chatUsers.map((user) => new ChatContact('div', {
                ...user,
                events: {click: delUsersFromChat.bind(this,this)}
            }, 'userchat', ChatContactTpl))
        }

        this.children.SearchInput = new InPut('div', {
            events: {
                keydown: ContactsSearch.bind(this,this)
            }
        }, 'form-example', InputTpl);



        if (this.template !== null) {
            return this.compile(this.template, this.children);
        }
    }


    show() {
        console.log("SHOWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW")
        if (this.getContent() !== undefined) {
            this.getContent().style.display = '';
        }
    }

    hide() {
        this.isShow = false
        this.getContent().style.display = 'none';
    }


}

