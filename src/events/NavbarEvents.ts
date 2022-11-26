import {router} from "src/modules/MainRouter";
import {logout} from "src/utility/authrequest";
import {AuthCtr} from "src/Controllers/AuthController";

export function Menuevents(el, props) {
    //debugger
    let items = el.querySelectorAll('li')
    let path = window.location.pathname
    console.log("pathhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", path)
    if(items){
        items.forEach((item) => {
            item.addEventListener('click', (event) => {
                let href = item.getAttribute("href")
                if (href !== "/logout") {
                    console.log("goto" + Math.random())
                    router.go(href)
                } else {
                    AuthCtr.logout()
                }
            });
        });
    }


}



export function ActiveItemMenu(el, props){
    //debugger
    let items = el.querySelectorAll('li')
    let path = window.location.pathname
    console.log("pathhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", path)
    console.log("ITEMS", items)
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


/*
export function MyaddEvents(el, props: object): void {
    const path: string = window.location.pathname;
    if (path === props.name) {
        el.classList.add('active');
    }
    // console.log('myaddev_el', props.name)
}*/
