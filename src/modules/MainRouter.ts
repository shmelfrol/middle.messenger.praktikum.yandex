import RenderDom from "src/modules/RenderDom";

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
            console.log("blockClass!!!",this._blockClass)
            this._block=this._blockClass()
            console.log("block!!!!!",this._block)
            RenderDom(this._props.rootQuery, this._block);
            console.log("this_BLOCK!!!!!",this._block.children.contact1.setProps({
                "id": 0,
                "user": "IVAN!!!!!!!!!!!!!!!",
                "phone": "+7 909 909 90",
                "img": "http://localhost:1234/user.f87d7cd3.jpg?1668527621199",
                "__id": "e8054d37-55da-4185-bde5-68431e61d0b6"
            }))
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
        window.addEventListener("popstate", ()=>{
            let pathname=window.location.pathname
            this._onRoute(pathname)
        })
        let pathname=window.location.pathname
        this._onRoute(pathname)

    }

    _onRoute(pathname) {
        console.log("pathname", pathname)
        //console.log(window.location.pathname)
        const route = this.getRoute(pathname);
        console.log("route",route)
        if (route) {
            if(this._currentRoute!==null){
                //console.log("if__curr", this._currentRoute )

                this._currentRoute.leave();
            }

        }

        this._currentRoute = route;
        route.render(route, pathname);

    }

    go(pathname) {
        history.pushState({}, '', pathname)
        this._onRoute(pathname)
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