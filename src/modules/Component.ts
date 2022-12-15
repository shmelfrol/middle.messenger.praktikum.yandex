import {v4 as makeUUID} from 'uuid';
import {Children} from 'src/type_component';
import {EventBus} from './EventBus';
import {isEqual} from "src/utility/isEqual";


interface Meta {
    tagName: string,
    props: Props,
    classofTag: string,
    id: string,
    attribute: {}
}

type Props = Record<string, any>

export class Component {
    eventBus: EventBus;

    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };


    private _element: HTMLElement | null = null;
    readonly props: Props;
    readonly _meta: Meta | null =
        null;

    readonly _id: string | null = null;
    isMounted: boolean = false;
    isShow: boolean = false;
    template: Function | null;
    children: Children;

    /** JSDoc
     * @param {string} tagName
     * @param {Object} myprops
     *@param {string} classofTag
     * @param {string} template
     * @param {string} id
     * @param {Object} attribute
     * @returns {void}
     */
    constructor(
        tagName = 'div',
        myprops: Children = {},
        classofTag = '',
        template: Function | null = null,
        id = "",
        attribute: { string: string } | {} = {}
    ) {
        const {children, props} = this._getChildren(myprops);
        this.children = children;
        this.template = template;
        const eventBus = new EventBus();
        this._meta = {
            tagName,
            props,
            classofTag,
            id,
            attribute
        };
        this._id = makeUUID();
        this.props = this._makePropsProxy({...props, __id: this._id});
        this.eventBus = eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Component.EVENTS.INIT);
    }

    _getChildren(myprops: Children) {
        // console.log('getmyprops',myprops)
        const children: Children = {};
        const props: Props = {};
        Object.entries(myprops).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                if (value[0] instanceof Component) {
                    children[key] = value;
                } else {
                    props[key] = value;
                }

            } else {
                if (value instanceof Component) {
                    children[key] = value;
                } else {
                    props[key] = value;
                }
            }

        });

        return {children, props};
    }

    _makePropsProxy(props: Props) {
        //onst self = this;
        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target, prop: string, value) {
                target[prop] = value;
                //self.eventBus.emit(Component.EVENTS.FLOW_CDU, { ...target }, target);
                return true;
            },
            deleteProperty() {
                throw new Error('Нет доступа');
            },
        });
    }

    _registerEvents(eventBus: EventBus) {
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
        if (this._meta !== null) {
            const {tagName, classofTag, id, attribute} = this._meta;
            // присваиваем _element созданный элемент
            this._element = this._createDocumentElement(tagName);
            this._element.className = classofTag;
            if (id) {
                this._element.setAttribute('id', id);
            }
            if (Object.keys(attribute).length !== 0) {
                //console.log("attribute", attribute)
                Object.entries(attribute).forEach(([key, value]) => {
                    if (this._element !== null) {
                        if (typeof value === "string") {
                            this._element.setAttribute(key, value);
                        }
                    }

                })

            }

            // console.log('create element', this._element)
            this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
        }


    }

    addChildren(newchildren: Children) {
        this.children = {...this.children, ...newchildren}
        this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
    }

    _createDocumentElement(tagName: string) {
        const element = document.createElement(tagName);
        if (this._id != null) {
            element.setAttribute('data-id', this._id);
        }
        return element;
    }

    _componentDidMount() {

        this.componentDidMount();
        Object.values(this.children).forEach(child => {
            if (Array.isArray(child)) {
                for (let i = 0; i < child.length; i++) {
                    child[i].dispatchComponentDidMount();
                }
            } else {
                child.dispatchComponentDidMount();
            }


        });

    }

    // Может переопределять пользователь, необязательно трогать
    componentDidMount() {
    }

    dispatchComponentDidMount() {
        this.isMounted = true;
        this.isShow = true
        this.eventBus.emit(Component.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: Props) {
        const response = this.componentDidUpdate(oldProps);
        if (response) {
            this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
        }
    }

    // Может переопределять пользователь, необязательно трогать
    componentDidUpdate(oldProps: Props) {
        if (oldProps) {
        }
        return true;
    }

    setProps = (nextProps: Props) => {
        if (!nextProps && !this.isShow) {
            return;
        }
        // получаем json представление старых пропсов
        let oldPropsJSON = JSON.stringify(this.props);
        // сохраняем старые пропсы
        let oldProps = JSON.parse(oldPropsJSON);
        Object.assign(this.props, nextProps);
        let iseq = isEqual(this.props, oldProps)
        if (!iseq) {
            this.eventBus.emit(Component.EVENTS.FLOW_CDU, oldProps);
        }
    };

    get element() {
        if (this._element !== null) {
            return this._element;
        }
    }




// Может переопределять пользователь, необязательно трогать
    VisualEffects() {
    }

    // Может переопределять пользователь, необязательно трогать

    // @ts-ignore


    // Может переопределять пользователь, необязательно трогать
    AddEvents() {
        const {events = {}} = this.props;
        Object.keys(events).forEach(eventName => {
            if (this._element) {
                this._element.addEventListener(eventName, events[eventName]);
            }

        });
    }

// если необходимо навесить события после рендеринга
    SetEvents(events: { click: (e: any) => void; }) {
        this.props.events = {...this.props.events, ...events}
        this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
    }

    // чтобы удалить события нужно конкретно знать какие события и какой евент - переопределяет пользователь
    RemoveEvents() {
        const {events = {}} = this.props;
        Object.keys(events).forEach(eventName => {
            if (this._element) {
                this._element.removeEventListener(eventName, events[eventName]);
            }

        });

    }

    getContent(): HTMLElement {
        return this.element as HTMLElement;
    }


    _render(): void {
        if (this._element) {
            const block = this.render() ;
            this.RemoveEvents()
            // удалить все обработчики событий (любого типа), вы можете клонировать элемент и заменить его на клон:
            this._element.innerHTML = ''; // удаляем предыдущее содержимое
                // @ts-ignore
            this._element.appendChild(block);

            this.VisualEffects()
            this.AddEvents();
        }
    }

    render(){
    }

    compile(template: Function, props: Props) {

        // копируем пропсы
        const propsAndStubs = {...props};
        // добавляем в пропсы чилдов со значениями заглушки
        Object.entries(this.children).forEach(([key, child]) => {
            if (Array.isArray(child)) {
                propsAndStubs[key] = []
                for (let i = 0; i < child.length; i++) {
                    propsAndStubs[key][i] = `<div data-id="${child[i]._id}">заглушка1</div>`;
                }
            } else {
                propsAndStubs[key] = `<div data-id="${child._id}">заглушка</div>`;
            }
        });

        const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
        // вставляем в созданный элемент шаблон с заглушками
        fragment.innerHTML = template(propsAndStubs);
        Object.values(this.children).forEach((child) => {
            //console.log('child', child)
            if (Array.isArray(child)) {
                // console.log("thisArray",child)
                for (let a = 0; a < child.length; a++) {

                    let zaglushka = fragment.content.querySelector(`[data-id="${child[a]._id}"]`);
                    // console.log("zaglushka", zaglushka)
                    if (zaglushka) {
                        zaglushka.replaceWith(child[a].getContent());
                    }

                }
            } else {
                const stub = fragment.content.querySelector(`[data-id="${child._id}"]`); // [property="value"]
                if (stub) {
                    stub.replaceWith(child.getContent());
                }

            }


        });
         const block=fragment.content
        return block;

    }

    show() {
        this.isShow = true
        if (this.getContent() !== undefined) {
            this.getContent().style.display = '';
        }
    }

    hide() {
        this.isShow = false
        this.getContent().style.display = 'none';
    }
}
