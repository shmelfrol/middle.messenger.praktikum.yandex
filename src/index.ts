import NotFoundPage from './pages/err/404';
import '../public/cssout/mainin.css';
import '../public/cssout/chat.css';
import '../public/cssout/btn.css';
import '../public/cssout/form.css';
import RenderDom from './modules/RenderDom';

import {router} from "src/modules/MainRouter";
import {getContactPage} from "src/pages/ContactPage/ContactPage";
import {FormPage} from "src/pages/forms/Forms";
import {SettingsPage} from "src/pages/SettingsPage/SettingsPage";
import {Menu} from "./component/Navbar/Navbar";
import {getChatsPage} from "src/pages/ChatsPage/ChatsPage";
import {store} from "src/Storage/store";


console.log("first")
console.log("store", store.getState())


RenderDom('#navbar', Menu());



router
    .use("/contacts", getContactPage)
    .use("/login", FormPage)
    .use("/reg", FormPage)
    .use("/settings", SettingsPage)
    .use("/404", NotFoundPage)
    .use("/chat",getChatsPage);
router.start();




