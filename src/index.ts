import { NotFoundPage } from 'src/pages/err/404';
import '../public/cssout/mainin.css';
import '../public/cssout/chat.css';
import '../public/cssout/btn.css';
import '../public/cssout/form.css';
import { router } from 'src/modules/MainRouter';
import { FormPage } from 'src/pages/forms/Forms';
import { getChatsPage } from 'src/pages/ChatsPage/ChatsPage';
import { MainMenu } from 'src/component/Menu/Menu';
import RenderDom from './modules/RenderDom';

RenderDom('#navbar', MainMenu());

router
  .use('/', FormPage)
  .use('/sign-up', FormPage)
  .use('/settings', FormPage)
  .use('/404', NotFoundPage)
  .use('/messenger', getChatsPage);
router.start();
