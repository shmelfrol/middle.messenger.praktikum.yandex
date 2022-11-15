import { AppComponent } from 'src/modules/AppComponent';

export default function RenderDom(query:string, block:AppComponent) {
  // выбираем селектор
  const root = document.querySelector(query);
  // вставляем полученный контент блока из метода блока гетконтент
  if (block !== null && root !== null) {
    root.appendChild(block.getContent());
    //вызываем dispatch чтобы установить флаг что в элемент в ДОМЕ
    block.dispatchComponentDidMount();
  }
  return root;
}