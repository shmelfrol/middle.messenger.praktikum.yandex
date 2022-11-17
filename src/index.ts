import NotFoundPage from './pages/err/404';
import '../public/cssout/mainin.css';
import '../public/cssout/chat.css';
import '../public/cssout/btn.css';
import '../public/cssout/form.css';

import Chat from './pages/chat/ChatPage';
import RenderDom from './modules/RenderDom';

import {Router} from "src/modules/MainRouter";
import {getContactPage} from "src/pages/ContactPage/ContactPage";
import {FormPage} from "src/pages/forms/Forms";

import NavbarItems_old from "./component/Navbar/Navbar";

const path = window.location.pathname;
import {Menu} from "./component/Navbar/Navbar";

RenderDom('#navbar', Menu());
RenderDom('#navbar', NavbarItems_old());

//console.log("formsdata", formsdata)
//console.log("Fields!!!",FormFields(formsdata))

//RenderDom('#main', FormPage());
export const router = new Router(".app");
router
    .use("/contacts", getContactPage)
    .use("/login", FormPage)
    .use("/reg", FormPage)
    .use("/settings", FormPage)
    .use("/404", NotFoundPage);
    router.start();



// Через секунду контент изменится сам, достаточно дёрнуть переход
/*setTimeout(() => {
  router.go("/settings");
}, 5000);

// А можно и назад
setTimeout(() => {
  router.back();
}, 3000);*/

// И снова вперёд

/*setTimeout(() => {
  router.forward();
}, 5000);*/





switch (path) {
  case '/chat':
    RenderDom('#main', Chat());
    break;
  default:
    //NotFoundPage();
    break;
}
