import Handlebars from "handlebars";
import tpl from './404.hbs';


export default function ():void {
    let context: object = { title: "Внимание ошибка: " };
    document.getElementById('main').innerHTML = tpl(context)

}