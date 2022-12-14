import NotFoundPage from './pages/err/404';
import '../public/cssout/mainin.css';
import '../public/cssout/chat.css';
import '../public/cssout/btn.css';
import '../public/cssout/form.css';
import RenderDom from './modules/RenderDom';
import {router} from "src/modules/MainRouter";
import {FormPage} from "src/pages/forms/Forms";
import {getChatsPage} from "src/pages/ChatsPage/ChatsPage";
import {MainMenu} from "src/component/Menu/Menu";
import {store} from "src/Storage/store";

console.log("store!!!", store.getState())
RenderDom('#navbar', MainMenu());



router
    .use("/", FormPage)
    .use("/sign-up", FormPage)
    .use("/settings", FormPage)
    .use("/404", NotFoundPage)
    .use("/messenger",getChatsPage);
router.start();



interface Animal {
    name: string
}

interface Bear extends Animal {
    honey: boolean
}
const getBear=(a:Bear):Bear=>{return a}
const bear = getBear({name:"2", honey:false})
bear.name
bear.honey
