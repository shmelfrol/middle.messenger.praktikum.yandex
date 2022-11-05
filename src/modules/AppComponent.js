import {Component} from "./Component";


export class AppComponent extends Component {
    constructor(tag, myprops, classofTag, template, MyaddEvents) {

        //передаю в родительский класс пропсы и тег
        super(tag, myprops, classofTag, template, MyaddEvents);
    }
    AddEvents(){
        if(this.MyaddEvents){
            this.MyaddEvents(this._element, this.props)
        }


    }
    render() {
       // console.log('template!!!!', this.template)

        return this.compile(this.template, this.props);
    }
}