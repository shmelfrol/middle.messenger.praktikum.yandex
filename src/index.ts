import NotFoundPage from './pages/err/404';
import '../public/cssout/mainin.css';
import '../public/cssout/chat.css';
import '../public/cssout/btn.css';
import '../public/cssout/form.css';
import RenderDom from './modules/RenderDom';
import {router} from "src/modules/MainRouter";
import {FormPage} from "src/pages/forms/Forms";
import {SettingsPage} from "src/pages/SettingsPage/SettingsPage";
import {getChatsPage} from "src/pages/ChatsPage/ChatsPage";
import {MainMenu} from "src/component/Menu/Menu";


RenderDom('#navbar', MainMenu());



router
    .use("/", FormPage)
    .use("/sign-up", FormPage)
    .use("/settings", SettingsPage)
    .use("/404", NotFoundPage)
    .use("/messenger",getChatsPage);
router.start();




