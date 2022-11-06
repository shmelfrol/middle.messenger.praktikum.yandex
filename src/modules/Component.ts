import { v4 as makeUUID } from 'uuid';
import { Props, Children } from 'src/type_component';
import { EventBus } from './event-bus';

export class Component {
  eventBus: Function;

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  readonly props:Props;

  private _element: HTMLElement|null = null;

  readonly _meta: { }|null = null;

  readonly _id:string|null = null;

  template:Function|null;

  MyaddEvents:Function|null;

  private children:Children;

  /** JSDoc
     * @param {string} tagName
     * @param {Object} myprops
     *@param {string} classofTag
     * @param {string} template
     * @param {Function|null} MyaddEvents
     * @returns {void}
     */
  constructor(tagName = 'div', myprops:Children = {}, classofTag = '', template:Function|null = null, MyaddEvents:Function|null = null) {
    // console.log('tagname',tagName)
    console.log('myprops', myprops);
    // console.log("classofTag", classofTag)

    const { children, props } = this._getChildren(myprops);
    console.log('children', children);
    // console.log("props", props)
    this.children = children;
    this.template = template;
    this.MyaddEvents = MyaddEvents;
    // это переменная только для конструктора
    const eventBus = new EventBus();
    // console.log(Component.EVENTS)
    // объект meta
    this._meta = {
      tagName,
      props,
      classofTag,
    };
    // Генерируем уникальный UUID V4
    this._id = makeUUID();
    // оборачиваем в proxy и возвращает другие но теже пропсы
    this.props = this._makePropsProxy({ ...props, __id: this._id });
    // console.log('this.props',this.props)
    // задействуем eventbus - ф-ция которая возвращает eventbus, чтобы использовать за конструктором
    this.eventBus = () => eventBus;
    // регистрируем событияb
    this._registerEvents(eventBus);
    // запускаем события переданные в eventbus
    eventBus.emit(Component.EVENTS.INIT);
  }

  _getChildren(myprops:Children) {
    // console.log('getmyprops',myprops)
    const children:Children = {};
    const props:Props = {};

    Object.entries(myprops).forEach(([key, value]) => {
      if (value instanceof Component) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  _makePropsProxy(props:Props) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;
    // console.log(props)
    return new Proxy(props, {
      get(target, prop:string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop:string, value) {
        target[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Component.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _registerEvents(eventBus:EventBus) {
    // регистрируем событие
    // событие инициализации - создание элемента без пропсов
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));

    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));

    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));

    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  init() {
    this._createResources();
  }

  _createResources() {
    // тоже самое что  tagName=this._meta.tagName
    const { tagName, classofTag } = this._meta;
    // присваиваем _element созданный элемент
    this._element = this._createDocumentElement(tagName);
    console.log('type of element!', typeof this._element);
    console.log('type of element!', this._element);
    this._element.className = classofTag;

    // console.log('create element', this._element)
    this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
  }

  _createDocumentElement(tagName:string) {
    const element = document.createElement(tagName);
    console.log('type Element');
    if (this._id != null) {
      element.setAttribute('data-id', this._id);
    }
    return element;
  }

  _componentDidMount() {
    // console.log("dispatch2")
    this.componentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount() {
    // console.log("dispatch3")
    // this._element.innerHTML=this.props.text

  }

  dispatchComponentDidMount() {
    // console.log("dispatch1")

    this.eventBus().emit(Component.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps:Props, newProps:Props) {
    // ОТВЕТ
    const response = this.componentDidUpdate(oldProps, newProps);
    // console.log('response', response)
    if (response) {
      this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidUpdate(oldProps:Props, newProps:Props) {
    return true;
  }

  setProps = (nextProps: Props) => {
    // console.log('nextProps', nextProps)
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
    // console.log('this.props', this.props)
    this.eventBus().emit(Component.EVENTS.FLOW_CDU);
  };

  get element() {
    if (this._element !== null) {
      return this._element;
    }
  }

  _render():void {
    // console.log('render')
    const block = this.render();
    // console.log('block',typeof block)
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    this._element.innerHTML = ''; // удаляем предыдущее содержимое
    // console.log('elem',typeof this._element)
    this._element.appendChild(block);
    this.AddEvents();
    // this._element.innerHTML = block;
  }

  // Может переопределять пользователь, необязательно трогать
  render() {}

  getContent() {
    return this.element;
  }

  compile(template:Function, props:Props) {
    console.log('template', typeof template);
    // копируем пропсы
    const propsAndStubs = { ...props };
    // добавляем в пропсы чилдов со значениями заглушки
    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}">заглушка</div>`;
    });
    // console.log('propsAndStubs', propsAndStubs)
    // создаем элемент с тегом template
    const fragment = this._createDocumentElement('template');
    // вставляем в созданный элемент шаблон с заглушками
    fragment.innerHTML = template(propsAndStubs);
    // console.log('fragment', fragment)
    // console.log('children', this.children)
    Object.values(this.children).forEach((child) => {
      //  console.log('child.id', child._id)
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`); // [property="value"]
      //  console.log('stub', stub)
      stub.replaceWith(child.getContent());
    });
    // console.log('fragment', typeof fragment)
    return fragment.content;
  }

  show() {
    // console.log('show')
    // eslint-disable-next-line no-underscore-dangle
    // @ts-ignore
    this.getContent().style.display = 'block';
  }

  hide() {
    // console.log('hide')
    // @ts-ignore
    this.getContent().style.display = 'none';
    // this._element.setAttribute("display", "none");
  }
}
