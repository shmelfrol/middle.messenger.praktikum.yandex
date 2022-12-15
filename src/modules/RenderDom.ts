import { Component } from 'src/modules/Component';

export default function RenderDom(query: string, block: Component) {
  // выбираем селектор
  const root = document.querySelector(query);

  // вставляем полученный контент блока из метода блока гетконтент
  if (block !== null && root !== null) {
    root.appendChild(block.getContent());
    // вызываем dispatch чтобы установить флаг что в элемент в ДОМЕ
    block.dispatchComponentDidMount();
  }
  return root;
}
