import RenderDom from "src/modules/RenderDom";
import {store} from "src/Storage/store";
import {Component} from "src/modules/Component";
import {Props} from "src/type_component";
export type TRoutePathname = '/' | '/chats' | '/auth' | '/registration' | '/profile' | '/edit-profile';





function isEqual(lhs:string, rhs:string) {
    return lhs === rhs;
}


class Route {
    private _pathname:string
    private _blockClass:() => Component
    private _block:Component|null
    private _props:Props
    constructor(pathname:string, block:() => Component, props:Props) {
        this._pathname = pathname;
        this._blockClass = block;

        this._block = null;
        this._props = props;
    }

    navigate(pathname:string) {
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

    match(pathname:string) {
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
    //private history: History|null=null;
    private routes: Route[] = [];
    private _currentRoute: Route | undefined |null= null;
    private _rootQuery:string=""
    private static __instance: Router;


    constructor(rootQuery:string) {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = [];
        //this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;
        Router.__instance = this;
    }

    use(pathname:string, block:()=>Component) {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery});
        this.routes.push(route);
        return this
    }

    start() {

        window.onpopstate = () => {
            let pathName = window.location.pathname
            this._onRoute(pathName);
            //store.set("activePath", pathName);
        };
        this._onRoute(window.location.pathname);

    }

    _onRoute(pathname: string) {
        let currentuser = store.getState().currentUser
        if (!currentuser?.id) {
            if (pathname !== "/sign-up" && pathname !== "/") {
                return this.go("/")
            }
        } else {
            if (pathname=== "/sign-up" || pathname=== "/") {
                return this.go("/messenger")
            }
        }
        store.set("activePath", pathname)
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
        if(route){
            route.render();
        }
        
    }

    go(pathname:string) {
        history.pushState({}, '', pathname)
        this._onRoute(pathname)

    }

    back() {
        window.history.back()
    }

    forward() {
        window.history.forward()
    }

    getRoute(pathname:string) {
        return this.routes.find(route => route.match(pathname));
    }
}

export const router = new Router(".app");