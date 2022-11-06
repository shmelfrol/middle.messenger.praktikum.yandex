import NotFoundPage from './pages/err/404';
import '../public/cssout/mainin.css';
import '../public/cssout/chat.css';
import '../public/cssout/btn.css';
import '../public/cssout/form.css';

import chatik from './pages/chat/chatpage';
import ContactPage from './pages/contacts/contact_page';
import { renderDom } from './modules/Renderdom';
import formPage from './pages/forms/forms';
import NavbarItems from './component/navbar/navbar';

const path = window.location.pathname;

renderDom('#navbar', NavbarItems());

switch (path) {
  case '/contacts':
    renderDom('#main', ContactPage());
    break;
  case '/chat':
    renderDom('#main', chatik());
    break;
  case '/login':
    renderDom('#main', formPage(path));
    break;
  case '/reg':
    renderDom('#main', formPage(path));
    break;
  case '/settings':
    renderDom('#main', formPage(path));
    break;
  default:
    NotFoundPage();
    break;
}
