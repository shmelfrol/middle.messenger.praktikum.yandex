import {UserCtr} from "src/Controllers/UserController";
import {AuthCtr} from "src/Controllers/AuthController";
import {ChatsCtr} from "src/Controllers/ChatsController";
import {store} from "src/Storage/store";
import {router} from "src/modules/MainRouter";

export function ContactsSearch(Component, Contact, e) {
    let el = Contact.getContent()
    let errdiv=Component.getContent().querySelector("#error-search-chat-contact")
    errdiv.textContent=""
    let tag = e.target.tagName
    if (tag === "INPUT") {
        if (e.keyCode === 13) {
            let searchInput = el.querySelector("input")
            UserCtr.search(searchInput.value).then(res => {
                if(Array.isArray(res)){
                    if(res.length!==0){
                        console.log("SEARCHED USERS", res)
                        Component.setProps({contacts: res})
                    }else{
                        errdiv.textContent+="Users not found"
                        Component.setProps({contacts: res})
                    }
                }


            })
            ///searchinput.value='';
        }
    }

}

export function addUsersToChat(Component, Contact, e) {
    let ActiveChat = Component.props.ActiveChat
    let el = Component.getContent()
    let tag = e.target.tagName
    if (tag === "BUTTON") {
        e.preventDefault()
        let userId = e.target.getAttribute("id")
        let userarr = Component.getIdsChatUsers()
        if (userarr.indexOf(Number(userId)) === -1) {
            ChatsCtr.addUsersToChat({users: [userId], chatId: ActiveChat}).then(res => {
                //console.log("ADDD USER", res)
                ChatsCtr.getChatUsers(ActiveChat).then(res => {
                    Component.setProps({chatUsers: res.users})
                })
            })
        }

    }
}


export function delUsersFromChat(Component, Contact, e) {
    let ActiveChat = Component.props.ActiveChat
    let el = Component.getContent()
    let tag = e.target.tagName
    if (tag === "BUTTON") {
        e.preventDefault()
        let userId = e.target.getAttribute("id")
        ChatsCtr.delUsersFromChat({users: [userId], chatId: ActiveChat}).then((res) => {
            if (res === "OK") {
                ChatsCtr.getChatUsers(ActiveChat).then(res => {
                    console.log(res)
                    Component.setProps({chatUsers: res.users})
                })
            }
        })

    }
}

