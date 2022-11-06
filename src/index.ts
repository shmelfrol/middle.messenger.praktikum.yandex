import NotFoundPage from './pages/err/404'
import ".././public/cssout/mainin.css"
import ".././public/cssout/chat.css"
import ".././public/cssout/btn.css"
import ".././public/cssout/form.css"


import{chatik} from "./pages/chat/chatpage";
import {contact_page1} from "./pages/contacts/contact_page";
import {renderDom} from "./modules/Renderdom";
import {formPage} from "./pages/forms/forms";
import {navbar_items} from "./component/navbar/navbar";

let str:string
let path=window.location.pathname;

renderDom('#navbar' ,navbar_items())

    switch (path) {
    case '/contacts':
        renderDom('#main' ,contact_page1())
        break
    case '/chat':
        renderDom('#main' ,chatik())
        break
        case '/login':
            renderDom('#main' ,formPage(path))
            break
        case '/reg':
            renderDom('#main' ,formPage(path))
            break
        case '/settings':
            renderDom('#main' ,formPage(path))
            break
        case '/test':
            renderDom('#main' ,navbar_items())
            break
    default:
        NotFoundPage()
        break
}
