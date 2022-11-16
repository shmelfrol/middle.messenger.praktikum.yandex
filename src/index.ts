import NotFoundPage from './pages/err/404';
import '../public/cssout/mainin.css';
import '../public/cssout/chat.css';
import '../public/cssout/btn.css';
import '../public/cssout/form.css';

import Chat from './pages/chat/ChatPage';
import ContactPage from './pages/contacts/ContactPage';
import RenderDom from './modules/RenderDom';
import formPage from './pages/forms/Forms';
import NavbarItems from './component/Navbar/Navbar';
import {Router} from "src/modules/MainRouter";


import {getContactPage} from "src/pages/ContactPage/ContactPage";

const path = window.location.pathname;

RenderDom('#navbar', NavbarItems());

const router = new Router(".app");
router
    .use("/contactList", getContactPage)
    .start()


switch (path) {
  case '/contacts':
    RenderDom('#main', ContactPage());
    break;
  case '/chat':
    RenderDom('#main', Chat());
    break;
  case '/login':
    RenderDom('#main', formPage(path));
    break;
  case '/reg':
    RenderDom('#main', formPage(path));
    break;
  case '/settings':
    RenderDom('#main', formPage(path));
    break;
  default:
    NotFoundPage();
    break;
}
