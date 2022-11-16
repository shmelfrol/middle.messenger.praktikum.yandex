import NotFoundPage from './pages/err/404';
import '../public/cssout/mainin.css';
import '../public/cssout/chat.css';
import '../public/cssout/btn.css';
import '../public/cssout/form.css';

import Chat from './pages/chat/ChatPage';
import ContactPage from './pages/contacts/ContactPage';
import RenderDom from './modules/RenderDom';

import NavbarItems from './component/Navbar/Navbar';
import {Router} from "src/modules/MainRouter";

import {FormFields} from "src/pages/forms/FormFields";

import {getContactPage} from "src/pages/ContactPage/ContactPage";

import {formsdata} from "src/pages/forms/propsForms";
import {FormPage} from "src/pages/forms/Forms";

const path = window.location.pathname;

RenderDom('#navbar', NavbarItems());

//console.log("formsdata", formsdata)
//console.log("Fields!!!",FormFields(formsdata))

RenderDom('#main', FormPage());
/*const router = new Router(".app");
router
    .use("/contactList", getContactPage)
    .start()*/


switch (path) {
  case '/contacts':
    RenderDom('#main', ContactPage());
    break;
  case '/chat':
    RenderDom('#main', Chat());
    break;
  case '/loginnn':
    RenderDom('#main', formPage(path));
    break;
  case '/regg':
    RenderDom('#main', formPage(path));
    break;
  case '/settingss':
    RenderDom('#main', formPage(path));
    break;
  default:
    //NotFoundPage();
    break;
}
