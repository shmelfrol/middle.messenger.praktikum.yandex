import { Children } from 'src/type_component';
import {Component} from "src/modules/Component";
import {UserCtr} from "src/Controllers/UserController";
import {ChatsCtr} from "src/Controllers/ChatsController";


function ContactClick(el) {
       let searchinput=el.querySelector('#search')
        let btn=el.querySelectorAll('button')
     if(searchinput!==null){
         searchinput.addEventListener('keydown', function(e) {
             console.log("enter"+Math.random())
             if (e.keyCode === 13) {
                 UserCtr.search(this.value)
                 ///searchinput.value='';
             }
         });
     }
     if(btn){
         btn.forEach((button)=>{
             button.addEventListener('click', function(e) {
                let login=button.getAttribute("login");
                console.log("login:", login)
                 let id=button.getAttribute("id");
                 ChatsCtr.create(login, id).then((res)=>{
                    console.log("res", res)
                 })
                 //router.go
                 //debugger
             });
         })
     }
}




export class Contacts extends Component {
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
    ) {

        super(tag, myprops, classofTag, template);
    }

    AddEvents() {
        ContactClick(this.getContent(), this.props)
    }


    render() {
        if (this.template !== null) {
            return this.compile(this.template, this.props);
        }
    }
}


