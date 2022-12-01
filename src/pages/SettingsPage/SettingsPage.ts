import {Component} from "src/modules/Component";
import {Children} from "src/type_component";
import {FormFields} from "src/pages/forms/FormFields";
import {EventForButtonSettings, EventForInput} from "src/events/authEvents";
import {settingsdata} from "src/Storage/propsForms";
import FormSettingsTpl from "src/pages/SettingsPage/SettingsPage.hbs";
import {AuthCtr} from "src/Controllers/AuthController";
import {store} from "src/Storage/store";
import {EVENTS} from "src/const/constsStore";

export class Settings extends Component {
    constructor(
        tag: string,
        myprops: Children,
        classofTag: string,
        template: string,
        MyaddEvents = null,
    ) {
        let children = FormFields({
            ...myprops, events: {
                focusout: EventForInput
            }
        })
        myprops={...myprops, ...children }
        myprops.events={click:EventForButtonSettings}
        super(tag, myprops, classofTag, template, MyaddEvents);

         //debugger

        store.on(EVENTS.UPDATE, () => {
            // пдписываемся на обновление компонента, передав данные из хранилища
            //this.setProps(store.getState());
            this.setProps({currentUser:store.getState().currentUser, img:store.getState().currentUser.avatar});
        });
        //вызываем getUser который если нет данных в хранилище вызывет emitобновление компонента
        AuthCtr.getUser()

    }

    /*AddEvents() {
        FormSettingsEvents(this.getContent(), this.props)
    }*/

    componentDidUpdate(){
        console.log("props after getuser", this.props)
            Object.entries(this.children).forEach(([key, child]) => {
                this.children[key].setProps({...this.props.forChildrens[key], value:this.props.currentUser[key]})
            });

       return true
    }

    render() {
        /*if (this.template !== null) {
            return this.compile(this.template, this.children);
        }*/
        let props = {...this.props, ...this.children}
        if (this.template !== null) {
            return this.compile(this.template, props);
        }
    }



    componentDidMount() {
        console.log("settings-didMOUNT")

        // ViewActiveChat(this.getContent(), this.props)
    }

}



export function SettingsPage(){
    let props;
    let currentUser=store.getState().currentUser
        if (currentUser?.id) {
      props={...settingsdata, currentUser:currentUser, img:currentUser.avatar}
    }else {
            props={...settingsdata}
        }

    return new Settings('div', props , 'testmain', FormSettingsTpl)
}