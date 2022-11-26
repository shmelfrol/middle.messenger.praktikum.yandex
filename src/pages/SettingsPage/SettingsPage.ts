import {Component} from "src/modules/Component";
import {Children} from "src/type_component";
import {FormFields} from "src/pages/forms/FormFields";
import {EventForButtonSettings, EventForInput, FormSettingsEvents} from "src/events/authEvents";
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
        console.log("setting", store.getState())
        store.on(EVENTS.UPDATE, () => {
            // пдписываемся на обновление компонента, передав данные из хранилища
            this.setProps(store.getState());
        });
        //вызываем getUser который если нет данных в хранилище вызывет emitобновление компонента
        AuthCtr.getUser()
        console.log("props after getuser", this.props)
    }

    /*AddEvents() {
        FormSettingsEvents(this.getContent(), this.props)
    }*/

    componentDidUpdate(){

            Object.entries(this.children).forEach(([key, child]) => {
                this.children[key].setProps({...this.props.forChildrens[key], value:this.props.currentUser[key]})
            });

            //this.children.login.setProps({...this.props.forChildrens.login, value:this.props.currentUser.login})
           // this.children.firstName.setProps({...this.props.forChildrens.firstName, value:this.props.currentUser.firstName})
       return true
    }

    render() {
        if (this.template !== null) {
            return this.compile(this.template, this.children);
        }
    }
}



export function SettingsPage(){
    let props;
    let currentUser=store.getState().currentUser
        if (currentUser?.id) {
      props={...settingsdata, currentUser:currentUser}
    }else {
            props={...settingsdata}
        }
console.log("PropsData", props)

    return new Settings('div', props , 'testmain', FormSettingsTpl)
}