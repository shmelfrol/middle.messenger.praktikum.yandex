export function renderDom(query, block) {
    //выбираем селектор
    const root = document.querySelector(query);
    //вставляем полученный контент блока из метода блока гетконтент
    root.appendChild(block.getContent());
    return root;
}