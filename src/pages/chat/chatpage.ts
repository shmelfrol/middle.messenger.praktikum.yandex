import leftblockchat_tpl from "../../component/leftblockchat/leftblock.hbs"
import rightblockchat_tpl from "../../component/rightblockchat/rightblockchat.hbs"
import chatbox_tpl from "../../component/chatbox/chatbox.hbs"
import chatinput_tpl from "../../component/chatinput/chatinput.hbs"
import chatscroll_tpl from "../../component/chatscroll/chatscrol.hbs"
import {AppComponent} from "../../modules/AppComponent";
import {propschat} from "./propschat";
import chatitemtpl from "../../component/chatitem/chatitem.hbs";
import chatik_tpl from "./chatik.hbs"
import {Props} from "src/type_component";
import {Children} from "src/type_component";


function MyaddEvents(el:HTMLDivElement, props:Props){
    console.log("MyaddEvents")
    console.log('myaddev_el', el)
    el.querySelectorAll('a').forEach((item:any)=> {
        console.log("Item", item)
        item.addEventListener('click', props.events.click)
    })
}


export function chatik(){
    const tag:string='div'
//leftblock
    const chatitem1:AppComponent =new AppComponent(tag, propschat.chats[0], '', chatitemtpl, MyaddEvents)
    const chatitem2:AppComponent =new AppComponent(tag, propschat.chats[1], '', chatitemtpl, MyaddEvents)

    let leftblockchat_props:Children={chatitem1: chatitem1, chatitem2: chatitem2}
     const leftblockchat:AppComponent =new AppComponent('div',leftblockchat_props, 'itemtest', leftblockchat_tpl)

//rightblock
    let chatbox_props:Props={text:"testing test"}
    const chatbox:AppComponent =new AppComponent('div', chatbox_props, 'testformessage', chatbox_tpl)

    let chatinput_props:Props={text:"Tap 'Enter' to send a message", events:{click: ()=>{alert('click')}}}
    const chatinput:AppComponent =new AppComponent('div', chatinput_props, 'testforbtn', chatinput_tpl)

    let chatscroll_props:Props={text:"chatscroll"}
    const chatscroll:AppComponent =new AppComponent('div', chatscroll_props, 'chat-bar-bottom', chatscroll_tpl)

    let rightblockchat_props:Children={chatbox: chatbox, chatscroll: chatscroll, chatinput:chatinput}
    const rightblockchat:AppComponent =new AppComponent('div',rightblockchat_props, 'itemtest', rightblockchat_tpl)

    return new AppComponent(
        'div',
        {leftblockchat: leftblockchat, rightblockchat: rightblockchat},
        'testmain', chatik_tpl)
}


/*
let newprops ={...propschat.chats[0]}
newprops.lastmessege="Бугага"
console.log('newprops', newprops)
setTimeout(() => {
    chatitem1.setProps(newprops);
}, 5000);*/
