import Handlebars from "handlebars";
import tpl from './404.hbs';


export default function ():void {
    let context: object = { title: "Внимание ошибка: " };
    let root=document.getElementById('main');
    if(root!==null){
        root.innerHTML = tpl(context)
    }
   // document.getElementById('main').innerHTML = tpl(context)

}