import {router} from "src/modules/MainRouter";
import {logout} from "src/utility/authrequest";
import {AuthCtr} from "src/Controllers/AuthController";

export function Menuevents(el, props){

    let items=el.querySelectorAll('li')
    let path=window.location.pathname
    el.addEventListener("click", ()=>{
        let paths=window.location.pathname
        items.forEach((li)=>{
            let classes=li.classList
           for (let a=0; a<classes.length; a++){
               if(classes[a]=="active"){
                   console.log(classes[a])
                  li.classList.remove("active")
               }
            }
            let href=li.getAttribute("href")
            if(href===paths){
                li.classList.add("active")
            }

        })

    })
    items.forEach((item) => {
        item.addEventListener('click', (event) => {
            console.log("click", item.classList)
            let href=item.getAttribute("href")
           /* if(href===path){
                item.classList.add("active")
            }*/

           if(href!=="/logout"){
                router.go(href)
            }else {
                AuthCtr.logout()
            }
            //history.pushState({}, '', href);

            /*if(window.onpopstate){
               window.onpopstate();
             }*/

        });
    });


}


export function MyaddEvents(el, props: object): void {
    const path: string = window.location.pathname;
    if (path === props.name) {
        el.classList.add('active');
    }
    // console.log('myaddev_el', props.name)
}