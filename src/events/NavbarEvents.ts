import {router} from "src/modules/MainRouter";
import {logout} from "src/utility/authrequest";
import {AuthCtr} from "src/Controllers/AuthController";

export function Menuevents(el, props){
    let items=el.querySelectorAll('li')
    items.forEach((item) => {
        item.addEventListener('click', (event) => {
            let href=item.getAttribute("href")
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