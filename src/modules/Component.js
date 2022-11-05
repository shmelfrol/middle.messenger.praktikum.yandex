import {EventBus} from "./event-bus";
import {v4 as makeUUID} from 'uuid';

export class Component {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    }

    _element = null;
    _meta = null;
    _id = null;
    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName = "div", myprops = {}, classofTag="", template='', MyaddEvents=null) {
        //console.log('tagname',tagName)
        //console.log("myprops", myprops)
        //console.log("classofTag", classofTag)
        const { children, props } = this._getChildren(myprops);
        //console.log("children", children)
        //console.log("props", props)
        this.children = children;
        this.template=template
        this.MyaddEvents=MyaddEvents
            //это переменная только для конструктора
        const eventBus = new EventBus();
        //console.log(Component.EVENTS)
        //объект meta
        this._meta = {
            tagName,
            props,
            classofTag
        };
        // Генерируем уникальный UUID V4
        this._id = makeUUID();
//оборачиваем в proxy и возвращает другие но теже пропсы
        this.props = this._makePropsProxy({ ...props, __id: this._id });
        //console.log('this.props',this.props)
//задействуем eventbus - функция которая возвращает eventbus, чтобы использовать за конструктором
        this.eventBus = () => eventBus;
// регистрируем событияb
        this._registerEvents(eventBus);
       //запускаем события переданные в eventbus
        eventBus.emit(Component.EVENTS.INIT);
    }

    _getChildren(myprops) {
        //console.log('getmyprops',myprops)
        const children = {};
        const props = {};

        Object.entries(myprops).forEach(([key, value]) => {
            if (value instanceof Component) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { children, props };
    }

    _makePropsProxy(props) {
        // Можно и так передать this
        // Такой способ больше не применяется с приходом ES6+
        const self = this;
        // console.log(props)
        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                target[prop] = value;

                // Запускаем обновление компоненты
                // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
                self.eventBus().emit(Component.EVENTS.FLOW_CDU, {...target}, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        });
    }

    _registerEvents(eventBus) {
        //регистрируем событие
        //событие инициализации - создание элемента без пропсов
        eventBus.on(Component.EVENTS.INIT, this.init.bind(this));

        eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));

        eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));

        eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    }
    init() {
        this._createResources();
    }
    _createResources() {
        //тоже самое что  tagName=this._meta.tagName
        const { tagName, classofTag } = this._meta;
        // присваиваем _element созданный элемент
        this._element = this._createDocumentElement(tagName);
        this._element.className = classofTag;

        //console.log('create element', this._element)
        this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
    }

    _createDocumentElement(tagName) {
        const element = document.createElement(tagName);
        element.setAttribute('data-id', this._id);
        return element;

    }

    _componentDidMount() {
        //console.log("dispatch2")
        this.componentDidMount();
    }

// Может переопределять пользователь, необязательно трогать
    componentDidMount(oldProps) {
        //console.log("dispatch3")
     //this._element.innerHTML=this.props.text

    }

    dispatchComponentDidMount() {
        //console.log("dispatch1")

        this.eventBus().emit(Component.EVENTS.FLOW_CDM);

    }

    _componentDidUpdate(oldProps, newProps) {
        //ОТВЕТ
        const response = this.componentDidUpdate(oldProps, newProps);
        //console.log('response', response)
        if(response){
            this.eventBus().emit(Component.EVENTS.FLOW_RENDER);
        }
    }

// Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps, newProps) {
        return true;
    }

    setProps = nextProps => {
        //console.log('nextProps', nextProps)
        if (!nextProps) {
            return;
        }
        Object.assign(this.props, nextProps);
        //console.log('this.props', this.props)
        this.eventBus().emit(Component.EVENTS.FLOW_CDU);

    };

    get element() {
        return this._element;
    }

    _render() {
        //console.log('render')
        const block = this.render();
        //console.log('block',typeof block)
        // Этот небезопасный метод для упрощения логики
        // Используйте шаблонизатор из npm или напишите свой безопасный
        // Нужно не в строку компилировать (или делать это правильно),
        // либо сразу в DOM-элементы возвращать из compile DOM-ноду
        this._element.innerHTML = ''; // удаляем предыдущее содержимое
        //console.log('elem',typeof this._element)
        this._element.appendChild(block);
        this.AddEvents();
        //this._element.innerHTML = block;
    }

// Может переопределять пользователь, необязательно трогать
    render() {}

    getContent() {
        return this.element;
    }

    compile(template, props) {
        //console.log("template", template())
        //копируем пропсы
        const propsAndStubs = { ...props };
        //добавляем в пропсы чилдов со значениями заглушки
        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}">заглушка</div>`
        });
         //console.log('propsAndStubs', propsAndStubs)
        //создаем элемент с тегом template
        const fragment = this._createDocumentElement('template');
         //вставляем в созданный элемент шаблон с заглушками
        fragment.innerHTML = template(propsAndStubs);
        //console.log('fragment', fragment)
        //console.log('children', this.children)
        Object.values(this.children).forEach(child => {
          //  console.log('child.id', child._id)
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`); //[property="value"]
            //  console.log('stub', stub)
            stub.replaceWith(child.getContent());
        });
        //console.log('fragment', typeof fragment)
        return fragment.content;
    }



    show() {
        // console.log('show')
        this._element.style.display='block';
    }

    hide() {
        //console.log('hide')
        this._element.style.display='none';
        //this._element.setAttribute("display", "none");
    }
}