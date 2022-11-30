import {router} from "src/modules/MainRouter";
import {logout} from "src/utility/authrequest";
import {AuthCtr} from "src/Controllers/AuthController";




export function ClickMenuItem(Component, e){
    let el=Component.getContent()
    let href = el.getAttribute("href")
    if (href !== "/logout") {
        router.go(href)
    } else {
        AuthCtr.logout()
    }
}


export function ActiveItemMenu(el, props){
    //debugger
    let items = el.querySelectorAll('li')
    let path = window.location.pathname
    if(items) {
        items.forEach((li) => {
            let classes = li.classList
            for (let a = 0; a < classes.length; a++) {
                if (classes[a] == "active") {
                    li.classList.remove("active")
                }
                let href = li.getAttribute("href")
                if (href === path) {
                    li.classList.add("active")
                }
            }
        })
    }
}


