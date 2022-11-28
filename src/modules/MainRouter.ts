import RenderDom from "src/modules/RenderDom";
import {store} from "src/Storage/store";
import {AuthCtr} from "src/Controllers/AuthController";

function isEqual(lhs, rhs) {
    return lhs === rhs;
}

function render(query, block) {
    const root = document.querySelector(query);
    root.textContent = block.getContent();
    return root;
}


class Route {
    constructor(pathname, block, props) {
        this._pathname = pathname;
        this._blockClass = block;

        this._block = null;
        this._props = props;
    }

    navigate(pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname) {
        return isEqual(pathname, this._pathname);
    }

    render() {

        if (!this._block) {
            this._block = this._blockClass()
            RenderDom(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}

export class Router {
    constructor(rootQuery) {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        Router.__instance = this;
    }

    use(pathname, block) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);
        return this
    }

    start() {
            window.onpopstate = event => {
             let pathName=window.location.pathname
            this._onRoute(pathName);
             store.set("activePath", pathName);

        };
            console.log("start")
        this._onRoute(window.location.pathname);

    }

    _onRoute(pathname) {
        AuthCtr.getUser()
        let route = this.getRoute(pathname);
        if (route === undefined) {
            route = this.getRoute("/404");
        }


        if (route) {
            if (this._currentRoute) {
                this._currentRoute.leave();
            }

        }
        this._currentRoute = route;
        route.render();
    }

    go(pathname) {
        history.pushState({}, '', pathname)
        this._onRoute(pathname)
        store.set("activePath", pathname)
    }

    back() {
        window.history.back()
    }

    forward() {
        window.history.forward()
    }

    getRoute(pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}

export const router = new Router(".app");