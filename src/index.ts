import NotFoundPage from './pages/err/404';
import '../public/cssout/mainin.css';
import '../public/cssout/chat.css';
import '../public/cssout/btn.css';
import '../public/cssout/form.css';
import Chat from '../for_del/chat/ChatPage';
import RenderDom from './modules/RenderDom';

import {router} from "src/modules/MainRouter";
import {getContactPage} from "src/pages/ContactPage/ContactPage";
import {FormPage} from "src/pages/forms/Forms";
import {SettingsPage} from "src/pages/SettingsPage/SettingsPage";

const path = window.location.pathname;
import {Menu} from "./component/Navbar/Navbar";
import {getChatsPage} from "src/pages/ChatsPage/ChatsPage";
import {ChatsCtr} from "src/Controllers/ChatsController";

console.log("first")
RenderDom('#navbar', Menu());

//console.log("formsdata", formsdata)
//console.log("Fields!!!",FormFields(formsdata))

//RenderDom('#main', FormPage());

router
    .use("/contacts", getContactPage)
    .use("/login", FormPage)
    .use("/reg", FormPage)
    .use("/settings", SettingsPage)
    .use("/404", NotFoundPage)
    .use("/chat",getChatsPage);
router.start();

console.log("localStorage", localStorage)

//authapi.getUser()
//AuthCtr.getUser()
/*const data= JSON.stringify({
  first_name: "Rone",
  second_name: "Rone",
  login: "Rone",
  email: "one@mail.ru",
  password: "Qwerty12345.",
  phone: "245456467576787",
})*/

const data = {
    data: {
        first_name: "shmelevfm1",
        second_name: "shmelevfm1",
        login: "shmelevfm1",
        email: "shmelevfm1@mail.ru",
        password: "Qwerty12345.",
        phone: "89094646245",
    }
}


//setInterval(() => ChatsCtr.getChatiks(), 5000);

// Через секунду контент изменится сам, достаточно дёрнуть переход
/*
setTimeout(() => {
  router.go("/settings");
}, 5000);

// А можно и назад
setTimeout(() => {
  router.back();
}, 3000);

// И снова вперёд

setTimeout(() => {
  router.forward();
}, 5000);
*/


/*switch (path) {
  case '/chat':
    RenderDom('#main', Chat());
    break;
  default:
    //NotFoundPage();
    break;
}*/
