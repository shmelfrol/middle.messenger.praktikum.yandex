import {AppComponent} from "src/modules/AppComponent";

export function renderDom(query:string, block:AppComponent) {
    //выбираем селектор
    const root = document.querySelector(query);
    //console.log("block!", typeof block.getContent())
   // console.log("block", block.getContent())
    //вставляем полученный контент блока из метода блока гетконтент
    if(block!==null && root!==null){
        root.appendChild(block.getContent());
    }
    return root;
}