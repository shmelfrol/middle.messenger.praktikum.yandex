import leftblockchat_tpl from "../../component/leftblockchat/leftblock.hbs"
import rightblockchat_tpl from "../../component/rightblockchat/rightblockchat.hbs"
import chatbox_tpl from "../../component/chatbox/chatbox.hbs"
import chatinput_tpl from "../../component/chatinput/chatinput.hbs"
import chatscroll_tpl from "../../component/chatscroll/chatscrol.hbs"
import {AppComponent} from "../../modules/AppComponent";
import {propschat} from "./propschat";
import chatitemtpl from "../../component/chatitem/chatitem.hbs";
import chatik_tpl from "./chatik.hbs"

function MyaddEvents(el, props){
    console.log("MyaddEvents")
    console.log('myaddev_el', el)
    el.querySelectorAll('a').forEach(item=> {
        console.log(props.events.click)
        item.addEventListener('click', props.events.click)
    })
}


export function chatik(){
    const tag='div'
    const classofTag='itemtest'
//leftblock
    const chatitem1 =new AppComponent(tag, propschat.chats[0], '', chatitemtpl, MyaddEvents)
    const chatitem2 =new AppComponent(tag, propschat.chats[1], '', chatitemtpl, MyaddEvents)

    let leftblockchat_props={chatitem1: chatitem1, chatitem2: chatitem2}
     const leftblockchat =new AppComponent('div',leftblockchat_props, 'itemtest', leftblockchat_tpl)

//rightblock
    let chatbox_props={text:"testing test"}
    const chatbox =new AppComponent('div', chatbox_props, 'testformessage', chatbox_tpl)

    let chatinput_props={text:"Tap 'Enter' to send a message", events:{click: ()=>{alert('click')}}}
    const chatinput =new AppComponent('div', chatinput_props, 'testforbtn', chatinput_tpl)

    let chatscroll_props={text:"chatscroll"}
    const chatscroll =new AppComponent('div', chatscroll_props, 'chat-bar-bottom', chatscroll_tpl)

    let rightblockchat_props={chatbox: chatbox, chatscroll: chatscroll, chatinput:chatinput}
    const rightblockchat =new AppComponent('div',rightblockchat_props, 'itemtest', rightblockchat_tpl)

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
