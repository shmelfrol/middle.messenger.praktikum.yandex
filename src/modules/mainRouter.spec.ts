import {expect} from 'chai';
import {Component} from "src/modules/Component";
import {Props} from "src/type_component";
import {router} from "src/modules/MainRouter";
import {store} from "src/Storage/store";
import {EVENTS} from "src/const/constsStore";

const MenuTPL = ()=>{return 'menu'};
const TEMPLATE1 = ()=>{return 'first'};
const TEMPLATE2 = ()=>{return 'second'};
const NOTFOUND = ()=>{return '404'};
store.getState().currentUser={
    id:1
}


export class TestComponent extends Component {

    constructor(
        tag: string,
        myprops: Props,
        classofTag: string,
        template: Function,
    ) {
        super(tag, myprops, classofTag, template);
        store.on(EVENTS.UPDATEPATH, () => {
            // пдписываемся на обновление компонента, передав данные из хранилища
            this.setProps({activePath: store.getState().activePath});
        });

    }

    render() {
        if (this.template !== null) {
            return this.compile(this.template, this.props);
        }
    }

}

function Menu(){return new TestComponent("div", {}, "test", MenuTPL)}
Menu()
function firstPage(){return new TestComponent("div", {}, "first", TEMPLATE1)}
function secondPage(){return new TestComponent("div", {}, "second", TEMPLATE2)}
function notFoudPage(){return new TestComponent("div", {}, "not", NOTFOUND)}

describe('Test router', () => {
    router.use('/first', firstPage);
    router.use('/second', secondPage);
    router.use("/404", notFoudPage)


    it('getRoute for /first should return FirstPage', () => {
        expect(router.getRoute('/first')).to.eql({
            _pathname: '/first',
            _blockClass: firstPage,
            _block: null,
            _props: { rootQuery: '.app' }
        });
    });
    it('should render firstPage', () => {
        window.history.pushState({}, '', '/first');
        router.start()
        expect(document.querySelector('.first')?.textContent?.trim()).to.eq('first');
    });
    it('should render NotFoundPage', () => {
        window.history.pushState({}, '', '/something');
        router.start();
        expect(document.querySelector('.not')?.textContent?.trim()).to.eq('404');
    });

    it('should render secondPage', () => {
        window.history.pushState({}, '', '/second');
        router.start();
        expect(document.querySelector('.second')?.textContent?.trim()).to.eq('second');
    });


});