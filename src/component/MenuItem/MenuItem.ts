import { Children } from 'src/type_component';
import {Component} from "src/modules/Component";

export class MenuItem extends Component {
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
        id: string,
        attribute:{}
    ) {
        super(tag, myprops, classofTag, template, id, attribute);
    }


    VisualEffects() {
        let item = this.getContent()
        let path = this.props.activePath
                let classes = item.classList
                for (let a = 0; a < classes.length; a++) {
                    if (classes[a] == "active") {
                        item.classList.remove("active")
                    }
                    let href = item.getAttribute("href")
                    if (href === path) {
                        item.classList.add("active")
                    }
                }
    }


    render() {
        if (this.template !== null) {
            return this.compile(this.template, this.props);
        }
    }
}


