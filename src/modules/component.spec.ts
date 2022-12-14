import {assert} from 'chai';
import {Component} from "src/modules/Component";
import {Props} from "src/type_component";

const TEMPLATE = ()=>{return 'hbs template'};
export class TestComponent extends Component {

    constructor(
        tag: string,
        myprops: Props,
        classofTag: string,
        template: Function,
    ) {
        super(tag, myprops, classofTag, template);
    }

    render() {
        if (this.template !== null) {
            return this.compile(this.template, this.props);
        }
    }

}


const testComponent= new TestComponent("div", {}, "test", TEMPLATE)

const el = document.createElement("div");
el.innerHTML="hbs template"
if (testComponent._id != null) {
    el.setAttribute("data-id", testComponent._id)
}
el.classList.add("test")

it('Component create', () => {
    assert.equal(testComponent.getContent().outerHTML, el.outerHTML);
});


it('Component setProps', () => {
    testComponent.setProps({text:"text"})
    assert.equal(testComponent.props.text, "text");
});