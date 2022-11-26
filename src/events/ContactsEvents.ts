import {UserCtr} from "src/Controllers/UserController";

export function ContactsSearch(el,e) {
    let searchinput=el.querySelector('#search')
    console.log("enter"+Math.random(), el)

    if (e.keyCode === 13) {

        UserCtr.search(this.value)
        ///searchinput.value='';
    }
}