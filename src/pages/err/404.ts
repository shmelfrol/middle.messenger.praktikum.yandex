import tpl from './404.hbs';
import {AppComponent} from "src/modules/AppComponent";

export default function () {
  const context = { title: 'Внимание ошибка: ' };
  return new AppComponent("div", context, "testmain", tpl)
}
