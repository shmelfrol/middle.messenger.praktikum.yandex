import {UserCtr} from "src/Controllers/UserController";
import {AuthCtr} from "src/Controllers/AuthController";
import {ChatsCtr} from "src/Controllers/ChatsController";
import {store} from "src/Storage/store";
import {router} from "src/modules/MainRouter";

export function ContactsSearch(el, e) {
    let tag = e.target.tagName
    if (tag === "INPUT") {

        if (e.keyCode === 13) {
            let searchInput = el.querySelector("input")
            console.log(searchInput.value)
            UserCtr.search(searchInput.value)
            ///searchinput.value='';
        }
    }

}

export function AddChat(el, e) {
    let tag = e.target.tagName
    if (tag === "BUTTON") {

        e.preventDefault()
        let userId=e.target.getAttribute("id")
        let loginUser=e.target.getAttribute("login")

            ChatsCtr.create(loginUser,  userId).then(res=> {
                store.set("ActiveChat", res)
                router.go("/chat")
            })


        console.log("Button")
    }
}
